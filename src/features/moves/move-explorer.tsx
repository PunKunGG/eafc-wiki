"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { categories, moveGuides } from "@/features/moves/catalog";
import { getPreferences, getServerPreferences, subscribePreferences, updatePreferences } from "@/features/preferences/client-store";
import type { MoveCategory } from "@/features/moves/types";

type CategoryFilter = MoveCategory | "all" | "favorites";

export function MoveExplorer() {
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
        `${guide.title.th} ${guide.title.en} ${guide.summary}`
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
          <p className="text-xs font-semibold text-accent">ชุดควบคุม Classic</p>
          <p className="mt-1 text-sm text-muted">
            แสดงแนวทางสำหรับ {platform === "playstation" ? "PlayStation" : "Xbox"}
          </p>
          <p className="mt-1 text-xs text-muted">R หมายถึงอนาล็อกขวา · สะบัดแต่ละทิศตามลำดับที่แสดง</p>
        </div>
        <div role="group" className="flex rounded-lg border border-border bg-surface p-1" aria-label="เลือกจอย">
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
          aria-label="ค้นหาท่าเป็นภาษาไทยหรืออังกฤษ"
          className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted"
          placeholder="ค้นหา เช่น ยิงปั่น หรือ Finesse"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
      </label>

      <nav aria-label="กรองหมวดคู่มือ" className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={category === "all"}
          onClick={() => setCategory("all")}
          className="min-h-11 rounded-md border border-border px-3 text-sm aria-pressed:border-accent aria-pressed:bg-accent-subtle aria-pressed:text-accent"
        >
          ทั้งหมด
        </button>
        {categories.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={category === item.id}
            onClick={() => setCategory(item.id)}
            className="min-h-11 rounded-md border border-border px-3 text-sm aria-pressed:border-accent aria-pressed:bg-accent-subtle aria-pressed:text-accent"
          >
            {item.label}
          </button>
        ))}
        <button
          type="button"
          aria-pressed={category === "favorites"}
          onClick={() => setCategory("favorites")}
          className="min-h-11 rounded-md border border-border px-3 text-sm aria-pressed:border-accent aria-pressed:bg-accent-subtle aria-pressed:text-accent"
        >
          ★ รายการโปรด ({favorites.length})
        </button>
      </nav>

      <div className="mb-3 mt-7 flex flex-wrap items-center justify-between gap-2">
        <h2 id="guide-list-title" className="text-lg font-semibold">
          {category === "all"
            ? "คู่มือท่า"
            : category === "favorites"
              ? "รายการโปรด"
              : categories.find((item) => item.id === category)?.label}
        </h2>
        <p aria-live="polite" className="text-sm text-muted">
          {filteredGuides.length} รายการ
        </p>
      </div>

      {filteredGuides.length ? (
        <ul className="grid gap-3 md:grid-cols-2">
          {filteredGuides.map((guide) => {
            const isFavorite = favorites.includes(guide.slug);
            return (
              <li key={guide.slug}>
                <article className="h-full rounded-lg border border-border bg-surface p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{guide.title.th}</h3>
                      <p className="mt-1 text-xs text-muted">{guide.title.en}</p>
                    </div>
                    <button
                      type="button"
                      aria-label={`${isFavorite ? "นำออกจาก" : "เพิ่มใน"}รายการโปรด: ${guide.title.th}`}
                      aria-pressed={isFavorite}
                      onClick={() => toggleFavorite(guide.slug)}
                      className="-mr-2 -mt-2 min-h-11 min-w-11 rounded-md text-xl text-accent hover:bg-accent-subtle"
                    >
                      {isFavorite ? "★" : "☆"}
                    </button>
                  </div>
                  <p className="mt-4 text-sm leading-6">{guide.summary}</p>
                  {guide.controls ? (
                    <p aria-label={`ปุ่ม ${platform === "playstation" ? "PlayStation" : "Xbox"}: ${guide.controls[platform]}`} className="mt-4 inline-block rounded-md border border-accent/60 bg-background px-3 py-2 text-sm font-medium">
                      {guide.controls[platform]}
                    </p>
                  ) : (
                    <p className="mt-4 rounded-md bg-background px-3 py-2 text-xs leading-5 text-muted">
                      ดูปุ่มตามจอยที่เลือกในเมนูช่วยเหลือในเกม
                    </p>
                  )}
                  <details className="mt-4 border-t border-border pt-3">
                    <summary className="min-h-11 cursor-pointer py-2 text-sm font-semibold text-accent">
                      ดูวิธีทำและเงื่อนไข
                    </summary>
                    <p className="text-sm leading-6 text-muted">{guide.detail}</p>
                    <p className="mt-2 text-xs leading-5 text-muted">
                      ตำแหน่งดูปุ่ม: {guide.buttonPath}
                    </p>
                    <a
                      className="mt-3 inline-flex min-h-11 items-center text-sm text-accent underline underline-offset-4"
                      href={guide.source.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {guide.source.label} ↗
                    </a>
                    {guide.controls && (
                      <a className="ml-4 inline-flex min-h-11 items-center text-sm text-accent underline underline-offset-4" href={guide.category === "celebration" ? "https://www.fifplay.com/fc-26-celebrations/" : "https://www.fifplay.com/fc-26-controls/"} target="_blank" rel="noreferrer">
                        FIFPlay · {guide.category === "celebration" ? "ท่าดีใจ" : "ปุ่ม Classic"} ↗
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
            ? "กด ☆ ที่คู่มือเพื่อเก็บไว้ตรงนี้"
            : "ไม่พบคู่มือที่ตรงกัน ลองค้นหาด้วยชื่อภาษาไทยหรืออังกฤษ"}
        </p>
      )}
    </section>
  );
}
