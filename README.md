# FC26 Playbook

คู่มือปุ่ม EA SPORTS FC 26 ภาษาไทย สำหรับ PlayStation และ Xbox ธีม Midnight Arena

ตอนนี้เป็นโครงเริ่มต้นสำหรับพัฒนาต่อ ยังไม่มีคลังคำสั่งจริง ฟีเจอร์ค้นหา หรือรายการโปรด
ไม่มีฐานข้อมูล ระบบสมาชิก และ environment variables ที่ต้องตั้งค่า

## ใช้งานในเครื่อง

ใช้ Node.js 24.x และ npm

```sh
npm ci
npm run dev
```

เปิด [localhost:3000](http://localhost:3000)

```sh
npm run lint
npm run typecheck
npm run build
npm run start
```

หรือใช้ `npm run check` เพื่อรัน lint, typecheck และ build ตามลำดับ
อย่าเปิด dev/build พร้อมกันใน working directory เดียว เพราะใช้ generated files ร่วมกัน

## Structure

```text
src/app/                  routes, layout, global theme
src/components/layout/    shared header / app shell
src/components/ui/        UI primitives เมื่อเริ่มใช้
src/features/moves/       domain types, categories, verified content
src/features/preferences/ controller และ browser-local favorites (แผน V1)
public/                   static assets
docs/                     product และ engineering contracts
```

## เอกสาร

- [PRD](docs/PRD.md) — ขอบเขตและเกณฑ์ตรวจรับ
- [Architecture](docs/ARCHITECTURE.md) — stack, structure และ data flow
- [Design system](docs/DESIGN_SYSTEM.md) — สีและกติกา UI
- [Deployment](docs/DEPLOYMENT.md) — การตั้งค่าและขั้นตอน Vercel

## ขั้นพัฒนาถัดไป

1. เพิ่มข้อมูลที่ตรวจแล้ว พร้อม sources/วันที่ตรวจ ตาม content contract
2. ทำรายการท่า ค้นหา กรองหมวด และสลับจอย
3. ทำหน้ารายละเอียดและ favorites พร้อมตรวจ behavior ตาม PRD
4. เชื่อม Git/Vercel และตรวจ Preview หลังได้รับอนุญาตให้เผยแพร่

สร้าง local Git repository ไว้แล้ว; ยังไม่ตั้ง remote, ไม่สร้าง cloud project และไม่ deploy
