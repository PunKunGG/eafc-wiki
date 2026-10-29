# Deployment to Vercel

สถานะ: เตรียมโครง local และ Git repository แล้ว ยังไม่ได้ตั้ง remote, ผูก Vercel project หรือ deploy

## Local

ใช้ Node.js 24.x และ npm; dependencies ล็อกด้วย `package-lock.json`

```sh
npm ci
npm run check
npm run dev
```

ตรวจ production build ด้วย `npm run build` แล้ว `npm run start`
`npm run check` รวม lint, type generation/typecheck และ build
โครง V1 ไม่ต้องสร้าง `.env.local` และไม่ต้องติดตั้ง Vercel CLI เพื่อพัฒนา

## การตั้งค่า Vercel ที่แนะนำ

| Setting | Value |
| --- | --- |
| Framework Preset | Next.js |
| Root Directory | repository root (`.`) |
| Node.js Version | 24.x (ตรงกับ `engines.node`) |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | framework default — ไม่ override |
| Environment Variables | ไม่จำเป็นสำหรับโครงนี้ |

`src` ไม่ใช่ Root Directory และไม่ตั้ง Output เป็น `out` เนื่องจากไม่ได้ใช้ static export
ยังไม่มีเหตุผลให้สร้าง `vercel.json` หรือ `vercel.ts`

## ขั้นตอนหลังได้รับอนุญาตให้เผยแพร่

1. เลือก Git provider และ repository; ผูกเป็น remote หลังยืนยันปลายทาง
2. ตรวจ diff และ local checks แล้ว commit/push ไปยังปลายทางที่เลือก
3. เลือก Vercel team/project ที่ต้องการ เชื่อม Git repository
4. ตรวจ Production Branch และ auto-deploy ก่อน push/import เพราะอาจเผยแพร่ทันที
5. เมื่อได้รับอนุญาตให้ deploy ใช้ Preview branch เพื่อทดสอบก่อน Production
6. ตรวจ Preview URL จริง: หน้าแรก, 404, assets, browser console และมือถือ
   เมื่อทำ V1 แล้วต้องตรวจ search, controller, detail URL และ favorite persistence เพิ่ม
7. เผยแพร่ Production เมื่อผู้ใช้อนุมัติและ required checks ผ่าน

Vercel Git integration build/deploy ให้เอง จึงยังไม่เพิ่ม deployment workflow หรือ Vercel token
ลง GitHub Actions หากต้องการ CI checks ภายหลัง ให้แยก quality checks ออกจากการเผยแพร่
อย่าเผยแพร่ `.env*`, `.vercel/`, browser state หรือ credentials

## ขอบเขตการยืนยัน

- ก่อนเปิดสาธารณะ ต้องระบุผู้ดูแลและตรวจผู้ให้บริการโฮสติ้ง, logs, ระยะเวลาเก็บ และ analytics ใน Privacy Notice
- สิทธิการใช้ข้อมูล FIFPlay และ EA ยังไม่ได้รับการยืนยัน: ตรวจเงื่อนไขหรือขออนุญาตก่อนเผยแพร่; การใส่ลิงก์อ้างอิงเพียงอย่างเดียวไม่ยืนยันสิทธิ
- `npm audit --omit=dev --audit-level=low` วันที่ 2026-10-29 พบ 0 ช่องโหว่ใน production dependencies; ควรตรวจซ้ำก่อนปล่อย และตรวจสถานะ Next.js advisory GHSA-39w2-rjm5-chcv ซึ่งยังระบุรุ่นที่แก้ไม่ชัดเจน

- local build สำเร็จ = ตรวจความพร้อมของ source ในเครื่อง
- Vercel READY + URL จริง + browser checks = หลักฐานของ deployment
- ยังไม่เรียก local build ว่า deploy สำเร็จ
- ก่อนปล่อยคู่มือจริง ต้องตรวจ command data และ content sources ตาม PRD

## References

- [Vercel build configuration](https://vercel.com/docs/builds/configure-a-build)
- [Vercel Git integration](https://vercel.com/docs/git)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
- [Supported Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)
