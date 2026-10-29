"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { categories, moveGuides } from "@/features/moves/catalog";
import { ControlSequence } from "@/features/moves/control-sequence";
import { controlSteps } from "@/features/moves/control-data";
import { getPreferences, getServerPreferences, subscribePreferences, updatePreferences } from "@/features/preferences/client-store";
import type { MoveCategory } from "@/features/moves/types";

type CategoryFilter = MoveCategory | "all" | "favorites";

export function MoveExplorer({ language }: { language: "th" | "en" }) {
  const en = language === "en";
  const preferences = useSyncExternalStore(
    subscribePreferences,
    getPreferences,
    getServerPreferences,
  );
  const { platform, favorites } = preferences;
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");

  const filteredGuides = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return moveGuides.filter((guide) => {
      const matchesCategory =
        category === "all" ||
        (category === "favorites"
          ? favorites.includes(guide.slug)
          : guide.category === category);
      const matchesQuery =
        !normalizedQuery ||
        `${guide.title.th} ${guide.title.en} ${guide.summary} ${guide.summaryEn}`
          .toLocaleLowerCase()
          .includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, favorites, query]);

  function toggleFavorite(slug: string) {
    updatePreferences({
      favorites: favorites.includes(slug)
        ? favorites.filter((favorite) => favorite !== slug)
        : [...favorites, slug],
    });
  }

  return (
    <section aria-labelledby="guide-list-title" className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-accent">{en ? "Classic controls" : "ชุดควบคุม Classic"}</p>
          <p className="mt-1 text-sm text-muted">
            {en ? "Controls for" : "แสดงแนวทางสำหรับ"} {platform === "playstation" ? "PlayStation" : "Xbox"}
          </p>
          <p className="mt-1 text-xs text-muted">{en ? "R means the right stick · Flick in the order shown" : "R หมายถึงอนาล็อกขวา · สะบัดแต่ละทิศตามลำดับที่แสดง"}</p>
        </div>
        <div role="group" className="flex rounded-lg border border-border bg-surface p-1" aria-label={en ? "Choose controller" : "เลือกจอย"}>
          {([
            ["playstation", "PlayStation"],
            ["xbox", "Xbox"],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={platform === id}
              onClick={() => updatePreferences({ platform: id })}
              className="min-h-11 rounded-md px-3 text-sm font-semibold text-muted transition-colors hover:text-foreground aria-pressed:bg-accent aria-pressed:text-accent-foreground"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <label className="mt-6 flex min-h-12 items-center rounded-lg border border-border bg-surface px-4 focus-within:border-accent">
        <span aria-hidden="true" className="mr-3 text-muted">⌕</span>
        <input
          aria-label={en ? "Search moves in Thai or English" : "ค้นหาท่าเป็นภาษาไทยหรืออังกฤษ"}
          className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted"
          placeholder={en ? "Search, e.g. Finesse shot" : "ค้นหา เช่น ยิงปั่น หรือ Finesse"}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
      </label>

      <nav aria-label={en ? "Filter guide categories" : "กรองหมวดคู่มือ"} className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={category === "all"}
          onClick={() => setCategory("all")}
          className="min-h-11 rounded-md border border-border px-3 text-sm aria-pressed:border-accent aria-pressed:bg-accent-subtle aria-pressed:text-accent"
        >
          {en ? "All" : "ทั้งหมด"}
        </button>
        {categories.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={category === item.id}
            onClick={() => setCategory(item.id)}
            className="min-h-11 rounded-md border border-border px-3 text-sm aria-pressed:border-accent aria-pressed:bg-accent-subtle aria-pressed:text-accent"
          >
            {en ? item.labelEn : item.label}
          </button>
        ))}
        <button
          type="button"
          aria-pressed={category === "favorites"}
          onClick={() => setCategory("favorites")}
          className="min-h-11 rounded-md border border-border px-3 text-sm aria-pressed:border-accent aria-pressed:bg-accent-subtle aria-pressed:text-accent"
        >
          ★ {en ? "Favorites" : "รายการโปรด"} ({favorites.length})
        </button>
      </nav>

      <div className="mb-3 mt-7 flex flex-wrap items-center justify-between gap-2">
        <h2 id="guide-list-title" className="text-lg font-semibold">
          {category === "all"
            ? (en ? "Move guide" : "คู่มือท่า")
            : category === "favorites"
              ? (en ? "Favorites" : "รายการโปรด")
              : (en ? categories.find((item) => item.id === category)?.labelEn : categories.find((item) => item.id === category)?.label)}
        </h2>
        <p aria-live="polite" className="text-sm text-muted">
          {en ? `${filteredGuides.length} ${filteredGuides.length === 1 ? "move" : "moves"}` : `${filteredGuides.length} รายการ`}
        </p>
      </div>

      {filteredGuides.length ? (
        <ul className="grid gap-3 md:grid-cols-2">
          {filteredGuides.map((guide) => {
            const isFavorite = favorites.includes(guide.slug);
            const title = en ? guide.title.en : guide.title.th;
            return (
              <li key={guide.slug}>
                <article className="h-full rounded-lg border border-border bg-surface p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      {!en && <p className="mt-1 text-xs text-muted">{guide.title.en}</p>}
                    </div>
                    <button
                      type="button"
                      aria-label={en ? `${isFavorite ? "Remove from" : "Add to"} favorites: ${title}` : `${isFavorite ? "นำออกจาก" : "เพิ่มใน"}รายการโปรด: ${title}`}
                      aria-pressed={isFavorite}
                      onClick={() => toggleFavorite(guide.slug)}
                      className="-mr-2 -mt-2 min-h-11 min-w-11 rounded-md text-xl text-accent hover:bg-accent-subtle"
                    >
                      {isFavorite ? "★" : "☆"}
                    </button>
                  </div>
                  <p className="mt-4 text-sm leading-6">{en ? guide.summaryEn : guide.summary}</p>
                  <ControlSequence guide={guide} platform={platform} language={language} />
                  <Link href={`/moves/${guide.slug}`} className="mt-3 inline-flex min-h-11 items-center text-sm text-accent underline underline-offset-4">
                    {en ? `Open ${title} details` : `ดูรายละเอียด ${title}`}
                  </Link>
                  <details className="mt-4 border-t border-border pt-3">
                    <summary className="min-h-11 cursor-pointer py-2 text-sm font-semibold text-accent">
                      {en ? "How to perform and requirements" : "ดูวิธีทำและเงื่อนไข"}
                    </summary>
                    <p className="text-sm leading-6 text-muted">{en ? guide.detailEn : guide.detail}</p>
                    <p className="mt-2 text-xs leading-5 text-muted">
                      {en ? "Find controls:" : "ตำแหน่งดูปุ่ม:"} {en ? guide.buttonPathEn : guide.buttonPath}
                    </p>
                    <a
                      className="mt-3 inline-flex min-h-11 items-center text-sm text-accent underline underline-offset-4"
                      href={guide.source.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {guide.source.label} ↗
                    </a>
                    {controlSteps[guide.slug] && !guide.source.url.includes("fifplay.com") && (
                      <a className="ml-4 inline-flex min-h-11 items-center text-sm text-accent underline underline-offset-4" href={guide.category === "celebration" ? "https://www.fifplay.com/fc-26-celebrations/" : "https://www.fifplay.com/fc-26-controls/"} target="_blank" rel="noreferrer">
                        FIFPlay · {guide.category === "celebration" ? (en ? "Celebrations" : "ท่าดีใจ") : (en ? "Classic controls" : "ปุ่ม Classic")} ↗
                      </a>
                    )}
                  </details>
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="rounded-lg border border-dashed border-border px-5 py-8 text-sm text-muted">
          {category === "favorites" && !favorites.length
            ? (en ? "Select ☆ on a guide to save it here." : "กด ☆ ที่คู่มือเพื่อเก็บไว้ตรงนี้")
            : (en ? "No matching guides. Try a Thai or English search." : "ไม่พบคู่มือที่ตรงกัน ลองค้นหาด้วยชื่อภาษาไทยหรืออังกฤษ")}
        </p>
      )}
    </section>
  );
}
