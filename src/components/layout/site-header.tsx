"use client";

import { setLanguage, useLanguage } from "@/features/preferences/language-provider";

export function SiteHeader() {
  const language = useLanguage();
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex min-h-16 max-w-[1120px] items-center gap-3 px-4 sm:px-6">
        <span className="rounded bg-accent px-2 py-1 text-sm font-black italic text-accent-foreground">
          FC26
        </span>
        <span className="font-semibold tracking-wide">PLAYBOOK</span>
        <div role="group" aria-label={language === "th" ? "เลือกภาษา" : "Choose language"} className="ml-auto flex rounded-md border border-border p-1">
          {(["th", "en"] as const).map((option) => (
            <button key={option} type="button" lang={option} aria-pressed={language === option} onClick={() => setLanguage(option)} className="min-h-11 min-w-11 rounded px-2 text-sm font-semibold aria-pressed:bg-accent aria-pressed:text-accent-foreground">
              {option.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
