import { moveGuides } from "@/features/moves/catalog";
import type { ControllerPlatform } from "@/features/moves/types";

type Preferences = { platform: ControllerPlatform; favorites: string[] };
const STORAGE_KEY = "fc26-playbook:preferences:v1";
const DEFAULT_PREFERENCES: Preferences = { platform: "playstation", favorites: [] };
export function getServerPreferences(): Preferences {
  return DEFAULT_PREFERENCES;
}
const listeners = new Set<() => void>();
let snapshot: Preferences | undefined;

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
        favorites: [...new Set(favorites)],
      };
    }
  } catch {
    // Keep the guide usable when browser storage is disabled or corrupted.
  }
  return DEFAULT_PREFERENCES;
}

export function getPreferences(): Preferences {
  snapshot ??= readPreferences();
  return snapshot;
}

export function subscribePreferences(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("storage", handleStorageChange);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorageChange);
  };
}

function notify(): void {
  for (const listener of listeners) listener();
}

function handleStorageChange(event: StorageEvent): void {
  if (event.key !== null && event.key !== STORAGE_KEY) return;
  snapshot = readPreferences();
  notify();
}

export function updatePreferences(update: Partial<Preferences>): void {
  const current = getPreferences();
  snapshot = {
    platform: update.platform ?? current.platform,
    favorites: update.favorites ?? current.favorites,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Continue with in-memory preferences for this visit.
  }
  notify();
}
