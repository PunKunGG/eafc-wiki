# Verified move content

เพิ่ม typed entries ตาม `../types.ts` เมื่อยืนยันคำสั่งใน FC 26 แล้ว
จัดไฟล์แยกตามหมวดเมื่อเริ่มมีข้อมูล โดยไม่ต้องสร้างชุดข้อมูลปลอม

ทุก entry ต้องมี slug ไม่ซ้ำ, ชื่อไทย/อังกฤษ, preset Classic,
ขั้นตอนของแต่ละจอย, เงื่อนไข, source URL และวันที่ตรวจ (YYYY-MM-DD)

- `draft`: ยังตรวจไม่ครบ ไม่ส่งไป public catalog หรือสร้าง detail route
- `verified`: ตรวจครบทั้ง PlayStation และ Xbox พร้อม sources และวันที่ตรวจ
- อย่าคัดลอกคำสั่งจาก UI mockup แล้วทำเครื่องหมาย verified
- ทิศอนาล็อกต้องระบุ reference frame; `simultaneous` หมายถึงกดปุ่มพร้อมกันใน step เดียว
- ก่อนเพิ่มข้อมูลจริงต้องเพิ่ม content validation สำหรับ duplicate slugs, missing mappings,
  sources และวันที่ตรวจตาม PRD
