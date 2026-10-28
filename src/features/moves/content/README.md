# Move guide content

guide summaries ใน `../catalog.ts` อิง EA Help และมี link source ต่อรายการ
เพิ่ม typed entries ตาม contract ใน `../types.ts` เมื่อยืนยัน button glyph จากจอยจริง

ทุก entry ต้องมี slug ไม่ซ้ำ, ชื่อไทย/อังกฤษ, preset Classic,
ขั้นตอนของแต่ละจอย, เงื่อนไข, source URL และวันที่ตรวจ (YYYY-MM-DD)

- ให้ glyph ที่ยืนยันจริงครบ PlayStation และ Xbox ก่อนแสดง mapping คู่ใดเป็นคำสั่งจริง
- อย่าคัดลอกคำสั่งจาก UI mockup แล้วทำเครื่องหมาย verified
- ทิศอนาล็อกต้องระบุ reference frame; `simultaneous` หมายถึงกดปุ่มพร้อมกันใน step เดียว
- ก่อนเพิ่มข้อมูลจริงต้องเพิ่ม content validation สำหรับ duplicate slugs, missing mappings,
  sources และวันที่ตรวจตาม PRD
