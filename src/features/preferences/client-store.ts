import { moveGuides } from "@/features/moves/catalog";
import type { ControllerPlatform } from "@/features/moves/types";

export type Language = "th" | "en";
type Preferences = { platform: ControllerPlatform; favorites: string[]; language: Language };
const STORAGE_KEY = "fc26-playbook:preferences:v1";
const DEFAULT_PREFERENCES: Preferences = { platform: "playstation", favorites: [], language: "th" };
export function getServerPreferences(): Preferences {
  return DEFAULT_PREFERENCES;
}
const listeners = new Set<() => void>();
let snapshot: Preferences | undefined;
const unsavedFields = new Set<keyof Preferences>();
const unsavedFavorites = new Map<string, boolean>();

function isPlatform(value: unknown): value is ControllerPlatform {
  return value === "playstation" || value === "xbox";
}

function readPreferences(): Preferences {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (value && typeof value === "object") {
      const stored = value as Partial<Preferences>;
      const favorites = Array.isArray(stored.favorites)
        ? stored.favorites.filter(
            (slug): slug is string =>
              typeof slug === "string" && moveGuides.some((guide) => guide.slug === slug),
          )
        : [];
      return {
        platform: isPlatform(stored.platform) ? stored.platform : "playstation",
        language: stored.language === "en" ? "en" : "th",
        favorites: [...new Set(favorites)],
      };
    }
    return DEFAULT_PREFERENCES;
  } catch {
    // Keep the guide usable when browser storage is disabled or corrupted.
  }
  return snapshot ?? DEFAULT_PREFERENCES;
}

export function getPreferences(): Preferences {
  snapshot ??= readPreferences();
  return snapshot;
}

function refreshPreferences(): void {
  const current = getPreferences();
  const stored = readPreferences();
  const next: Preferences = {
    platform: unsavedFields.has("platform") ? current.platform : stored.platform,
    language: unsavedFields.has("language") ? current.language : stored.language,
    favorites: applyFavoriteChanges(stored.favorites, unsavedFavorites),
  };
  if (current.platform !== next.platform || current.language !== next.language ||
      current.favorites.length !== next.favorites.length ||
      current.favorites.some((value, index) => value !== next.favorites[index])) {
    snapshot = next;
  }
}

function applyFavoriteChanges(favorites: string[], changes: Map<string, boolean>): string[] {
  const result = new Set(favorites);
  for (const [slug, added] of changes) {
    if (added) result.add(slug);
    else result.delete(slug);
  }
  return [...result];
}

export function subscribePreferences(listener: () => void): () => void {
  if (listeners.size === 0) {
    window.addEventListener("storage", handleStorageChange);
    refreshPreferences();
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", handleStorageChange);
  };
}

function notify(): void {
  for (const listener of listeners) listener();
}

function handleStorageChange(event: StorageEvent): void {
  if (event.key !== null && event.key !== STORAGE_KEY) return;
  refreshPreferences();
  notify();
}

export function updatePreferences(update: Partial<Preferences>): void {
  const before = getPreferences();
  const favoriteChanges = new Map<string, boolean>();
  if (update.favorites) {
    for (const slug of before.favorites) {
      if (!update.favorites.includes(slug)) favoriteChanges.set(slug, false);
    }
    for (const slug of update.favorites) {
      if (!before.favorites.includes(slug)) favoriteChanges.set(slug, true);
    }
  }
  refreshPreferences();
  const current = getPreferences();
  snapshot = {
    platform: update.platform ?? current.platform,
    language: update.language ?? current.language,
    favorites: applyFavoriteChanges(current.favorites, favoriteChanges),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    unsavedFields.clear();
    unsavedFavorites.clear();
  } catch {
    for (const key of Object.keys(update) as (keyof Preferences)[]) {
      if (key !== "favorites") unsavedFields.add(key);
    }
    for (const [slug, added] of favoriteChanges) unsavedFavorites.set(slug, added);
    // Continue with in-memory preferences for this visit.
  }
  notify();
}
