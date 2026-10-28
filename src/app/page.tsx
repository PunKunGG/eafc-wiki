import { MoveExplorer } from "@/features/moves/move-explorer";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-[calc(100vh-64px)] max-w-[1120px] px-4 py-10 sm:px-6 sm:py-14">
      <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-accent">
        EA SPORTS FC 26 / CONTROL GUIDE
      </p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        ทุกท่า อยู่ที่ปลายนิ้ว
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
        เลือกหมวด ค้นหาท่า สลับจอย แล้วเปิดดูวิธีทำได้เลย
      </p>

      <MoveExplorer />
    </main>
  );
}
