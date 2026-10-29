# Architecture

## แนวทาง

เว็บ Next.js แอปเดียว ใช้ App Router และ TypeScript strict deploy ด้วย Next.js preset บน Vercel
โครงนี้เตรียมตามคำขอวาง structure; ให้ยึดขอบเขตใน PRD ก่อนพัฒนาฟีเจอร์เต็ม

| เครื่องมือ | ใช้ทำอะไร |
| --- | --- |
| Next.js 16.4.3 / React 19.3.1 | routing, prerender และ metadata |
| TypeScript 5.9.3 | ตรวจ data contract และ component props |
| Tailwind CSS 4.3.3 | responsive UI จาก Midnight Arena tokens |
| ESLint 9.39.5 / eslint-config-next | ตรวจโค้ดตาม Next.js / React rules |
| Node.js 24.x / npm | runtime และ lockfile เดียวสำหรับ local/Vercel |

เวอร์ชันตรวจจาก npm registry วันที่ 2026-10-28 ใช้ TypeScript 5.9.3 ที่อยู่ใน peer range
ของ typescript-eslint (`>=4.8.4 <6.1.0`) แทน latest 7.x ซึ่งอยู่นอก range
ใช้ ESLint 9 แทน latest 10 เพราะ peer range ของ React/import/accessibility plugins ใน Next config
ยังไม่รองรับ ESLint 10 ครบทั้งหมด ไม่ใช้ `--force` หรือ `--legacy-peer-deps` ข้ามข้อจำกัด

## โครงสร้าง

```text
src/
  app/                       # routes, root layout, global styles, metadata
    layout.tsx
    page.tsx                 # หน้าแรก scaffold; ยังไม่ใช่คลังท่าเต็ม
    not-found.tsx
    globals.css
  components/
    layout/site-header.tsx   # shared app chrome
    ui/                      # primitives เมื่อมี use case จริง
  features/
    moves/
      types.ts               # domain contract ไม่มี dependency กับ React
      catalog.ts             # หมวดและ verified content ที่ใช้แสดงผล
      content/               # ที่เก็บข้อมูลที่ผ่านการตรวจ (ยังว่าง)
    preferences/             # controller + local favorites เมื่อเริ่มฟีเจอร์
public/                      # static assets ที่โฮสต์เอง
docs/                        # requirements, architecture, design, deployment
```

เส้นทาง `/moves/[slug]` แสดงรายละเอียดท่าจาก catalog; `/favorites` ยังเป็นแผนตาม PRD
เส้นทาง `/privacy` แสดงฉบับร่างสำหรับการพัฒนาและเชื่อมจาก footer; ต้องเติมข้อมูลผู้ดูแลและตรวจบริการก่อนเปิดสาธารณะ
ไม่เพิ่ม backend/API, state library, ORM, CMS หรือ UI kit จนกว่าจะมีเหตุผลที่ขอบเขตต้องใช้

## Data flow ที่กำหนดสำหรับ V1

1. คู่มือและคำแนะนำ practice ที่อิง EA Help อยู่ใน repository เป็น typed entries พร้อม source links
2. catalog และ control-data เก็บข้อความกับขั้นตอนแบบมีโครงสร้าง; หน้าคลังและรายละเอียดใช้ ControlSequence เดียวกัน
3. แสดงปุ่มแยกตาม platform จาก FIFPlay สำหรับท่ายิง ส่ง และท่าดีใจบางรายการ; รายการอื่นให้ดูปุ่มในเกม
4. preferences ภาษา จอย และรายการโปรดใช้ client hook และ localStorage แบบ versioned key `fc26-playbook:preferences:v1`
5. อ่าน localStorage หลัง hydration เท่านั้น ตรวจค่าที่อ่านและจับ storage exceptions
   state ใน memory ต้องยังทำงานได้เมื่อ storage ใช้ไม่ได้

ไม่ import browser APIs ใน server modules และไม่อ่าน filesystem จาก request เพื่อเขียนข้อมูลถาวร
การแก้ content ต้องผ่าน review แล้ว build/deploy ใหม่ ไม่มี cross-device favorites ใน V1

## Content contract

แต่ละท่าระบุ game, preset, slug, ชื่อไทย/อังกฤษ, หมวด, input steps ของแต่ละจอย,
เงื่อนไข, แหล่งข้อมูล และสถานะ/วันที่ตรวจสอบ ปุ่มข้ามจอยเก็บชัดเจน ไม่แปลงด้วย string replace
อนาล็อกต้องระบุทิศอ้างอิงก่อนเผยแพร่ ส่วนกดพร้อมกันและกดตามลำดับเป็นคนละ input step

catalog ระบุท่าที่มีชื่อ/แนวทางจาก EA Help และปุ่ม Classic จาก FIFPlay ตรวจเทียบแหล่งข้อมูลวันที่ 2026-10-28
ปุ่มยังไม่ได้ตรวจเทียบในเกม และไม่ได้นำคำสั่งจาก mockup มาแสดง

## Rendering / deployment

ใช้ Next.js build มาตรฐาน ไม่ตั้ง `output: "export"` หน้าอ่านข้อมูลที่ไม่ใช้ dynamic API
สามารถ prerender ได้ตามปกติ Vercel รับ `.next` ผ่าน framework integration
ไม่ต้องตั้ง Edge runtime, Docker, function region, rewrites หรือ `vercel.json`/`vercel.ts` ใน V1
ไม่มี environment variables หรือ cloud resource ที่ต้อง provision สำหรับโครงนี้

## Verification

`npm ci` → `npm run check` → `npm run start` และตรวจหน้าแรก/404/theme/responsive
เมื่อมีฟีเจอร์ ให้เพิ่ม behavioral tests ที่ครอบคลุม requirements จริง ไม่ใช้เพียง build เป็นหลักฐาน
ดูขั้นตอน cloud deployment ที่ [DEPLOYMENT.md](DEPLOYMENT.md)

## References

- [Next.js installation](https://nextjs.org/docs/app/getting-started/installation)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
- [Node.js versions on Vercel](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)
- [Tailwind CSS with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
