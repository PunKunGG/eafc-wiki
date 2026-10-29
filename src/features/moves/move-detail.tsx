"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { CONTACT_EMAIL } from "@/components/layout/contact";
import { getPreferences, getServerPreferences, subscribePreferences, updatePreferences } from "@/features/preferences/client-store";
import { useLanguage } from "@/features/preferences/language-provider";
import type { GuideEntry } from "@/features/moves/catalog";
import { ControlSequence } from "@/features/moves/control-sequence";
import { controlSteps } from "@/features/moves/control-data";

export function MoveDetail({ guide }: { guide: GuideEntry }) {
  const language = useLanguage();
  const en = language === "en";
  const { platform } = useSyncExternalStore(subscribePreferences, getPreferences, getServerPreferences);
  const title = guide.title[language];
  const subject = en ? `Correction: ${title} (${guide.slug}) [EN]` : `แจ้งข้อมูลผิด: ${title} (${guide.slug}) [TH]`;
  const controlsSource = guide.category === "celebration"
    ? "https://www.fifplay.com/fc-26-celebrations/"
    : "https://www.fifplay.com/fc-26-controls/";

  return (
    <main className="mx-auto min-h-[calc(100vh-128px)] max-w-[800px] px-4 py-10 sm:px-6 sm:py-14">
      <Link href="/" className="text-sm text-accent underline underline-offset-4">
        {en ? "← Back to the guide" : "← กลับไปหน้าคู่มือ"}
      </Link>
      <p className="mt-8 text-xs font-semibold tracking-wide text-accent">EA SPORTS FC 26 · CLASSIC</p>
      <h1 className="mt-2 text-3xl font-bold">{title}</h1>
      {!en && <p className="mt-2 text-sm text-muted">{guide.title.en}</p>}
      <p className="mt-4 text-sm leading-7 text-muted">{en ? guide.summaryEn : guide.summary}</p>

      <section aria-labelledby="controls-heading" className="mt-8 rounded-lg border border-border bg-surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="controls-heading" className="text-lg font-semibold">{en ? "Controls" : "ปุ่มควบคุม"}</h2>
          <div role="group" aria-label={en ? "Choose controller" : "เลือกจอย"} className="flex rounded-lg border border-border p-1">
            {(["playstation", "xbox"] as const).map((id) => (
              <button key={id} type="button" aria-pressed={platform === id} onClick={() => updatePreferences({ platform: id })} className="min-h-11 rounded-md px-3 text-sm font-semibold aria-pressed:bg-accent aria-pressed:text-accent-foreground">
                {id === "playstation" ? "PlayStation" : "Xbox"}
              </button>
            ))}
          </div>
        </div>
        <ControlSequence guide={guide} platform={platform} language={language} />
      </section>

      <section aria-labelledby="details-heading" className="mt-8">
        <h2 id="details-heading" className="text-lg font-semibold">{en ? "How to perform and requirements" : "วิธีทำและเงื่อนไข"}</h2>
        <p className="mt-3 text-sm leading-7 text-muted">{en ? guide.detailEn : guide.detail}</p>
        <p className="mt-3 text-sm leading-7 text-muted">{en ? "Find controls in game:" : "ตำแหน่งดูปุ่มในเกม:"} {en ? guide.buttonPathEn : guide.buttonPath}</p>
      </section>

      <section aria-labelledby="sources-heading" className="mt-8">
        <h2 id="sources-heading" className="text-lg font-semibold">{en ? "Sources" : "แหล่งอ้างอิง"}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li><a href={guide.source.url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-accent underline underline-offset-4">{guide.source.label} ↗</a></li>
          {controlSteps[guide.slug] && guide.source.url !== controlsSource && <li><a href={controlsSource} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-accent underline underline-offset-4">FIFPlay · {guide.category === "celebration" ? (en ? "Celebrations" : "ท่าดีใจ") : (en ? "Classic controls" : "ปุ่ม Classic")} ↗</a></li>}
        </ul>
        {guide.sourceCheckedAt && <p className="mt-2 text-xs text-muted">{en ? "Source checked:" : "ตรวจแหล่งข้อมูล:"} <time dateTime={guide.sourceCheckedAt}>{guide.sourceCheckedAt}</time></p>}
        <p className="mt-2 text-xs leading-6 text-muted">{en ? "Commands are checked against the cited sources, but have not been verified in game." : "คำสั่งตรวจเทียบกับแหล่งอ้างอิงแล้ว แต่ยังไม่ได้ตรวจในเกม"}</p>
      </section>

      <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`} className="mt-8 inline-flex min-h-11 items-center text-sm text-accent underline underline-offset-4">
        {en ? "Report incorrect information" : "แจ้งข้อมูลผิด"}
      </a>
    </main>
  );
}
