const categories = ["การยิง", "การส่ง", "ท่าดีใจ"];

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
        คู่มือปุ่มกดสำหรับ PlayStation และ Xbox กำลังเตรียมข้อมูลที่ผ่านการตรวจสอบในเกม
      </p>

      <section aria-labelledby="categories-title" className="mt-12">
        <h2 id="categories-title" className="text-lg font-semibold">
          หมวดคู่มือ
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {categories.map((category) => (
            <li
              key={category}
              className="rounded-lg border border-border bg-surface px-5 py-5 text-sm font-medium"
            >
              {category}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-8 rounded-lg border border-border bg-surface px-5 py-4 text-sm text-muted">
        รายการท่าจะแสดงที่นี่หลังตรวจสอบชุดควบคุม Classic ใน FC 26 แล้ว
      </p>
    </main>
  );
}
