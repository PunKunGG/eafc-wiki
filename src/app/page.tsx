"use client";

import { MoveExplorer } from "@/features/moves/move-explorer";
import { useLanguage } from "@/features/preferences/language-provider";

export default function HomePage() {
  const language = useLanguage();
  return (
    <main className="mx-auto min-h-[calc(100vh-64px)] max-w-[1120px] px-4 py-10 sm:px-6 sm:py-14">
      <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-accent">
        EA SPORTS FC 26 / CONTROL GUIDE
      </p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {language === "th" ? "ทุกท่า อยู่ที่ปลายนิ้ว" : "Every move at your fingertips"}
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
        {language === "th" ? "เลือกหมวด ค้นหาท่า สลับจอย แล้วเปิดดูวิธีทำได้เลย" : "Choose a category, search for a move, switch controllers, and learn how to play."}
      </p>

      <MoveExplorer language={language} />
    </main>
  );
}
