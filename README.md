# FC26 Playbook

คู่มือปุ่ม EA SPORTS FC 26 ภาษาไทย สำหรับ PlayStation และ Xbox ธีม Midnight Arena

หน้าแรกมีตัวกรองหมวด การค้นหา สลับจอย รายการโปรด และคำแนะนำท่าจาก EA Help
ปุ่มยิง ส่ง และท่าดีใจบางรายการอิง FIFPlay (ตรวจเทียบแหล่งข้อมูล 2026-10-28)
ยังไม่ได้ตรวจเทียบในเกม คู่มือนี้ยังไม่มีฐานข้อมูลหรือระบบสมาชิก

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
src/features/moves/       categories, guide content, controller-aware explorer
src/features/preferences/ local favorites (browser storage contract)
public/                   static assets
docs/                     product และ engineering contracts
```

## เอกสาร

- [PRD](docs/PRD.md) — ขอบเขตและเกณฑ์ตรวจรับ
- [Architecture](docs/ARCHITECTURE.md) — stack, structure และ data flow
- [Design system](docs/DESIGN_SYSTEM.md) — สีและกติกา UI
- [Deployment](docs/DEPLOYMENT.md) — การตั้งค่าและขั้นตอน Vercel

## ขั้นพัฒนาถัดไป

1. ตรวจปุ่มที่เพิ่มแล้วใน FC 26 Classic ทั้ง PlayStation/Xbox
2. เพิ่ม mapping สำหรับรายการที่เหลือพร้อมแหล่งข้อมูล/วันที่ตรวจสอบ
3. เพิ่มหน้ารายละเอียดแบบ shareable ตาม content contract
4. เชื่อม Git/Vercel และตรวจ Preview หลังเลือกปลายทางและอนุญาตให้เผยแพร่

สร้าง local Git repository ไว้แล้ว; ยังไม่ตั้ง remote, ไม่สร้าง cloud project และไม่ deploy
