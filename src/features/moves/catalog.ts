import type { MoveCategory } from "./types";

export type GuideEntry = {
  slug: string;
  category: MoveCategory;
  title: { th: string; en: string };
  summary: string;
  detail: string;
  buttonPath: string;
  source: { label: string; url: string };
  controls?: { playstation: string; xbox: string };
};

const shootingSource = {
  label: "EA Help · Shooting guide",
  url: "https://help.ea.com/en/articles/ea-sports-fc/how-to-shoot/",
} as const;

const passingSource = {
  label: "EA Help · Passing guide",
  url: "https://help.ea.com/en/articles/ea-sports-fc/how-to-pass/",
} as const;

const celebrationSource = {
  label: "EA Help · Celebrations",
  url: "https://help.ea.com/en/articles/ea-sports-fc/how-to-celebrate/",
} as const;

const inPracticeArena =
  "เมนูหลัก → Learn to Play → Practice Arena → หยุดเกม → Button Help";

export const categories: { id: MoveCategory; label: string }[] = [
  { id: "shooting", label: "การยิง" },
  { id: "passing", label: "การส่ง" },
  { id: "celebration", label: "ท่าดีใจ" },
];

/** Classic controls are sourced from FIFPlay; descriptions reference EA Help. */
export const moveGuides: readonly GuideEntry[] = [
  {
    slug: "regular-shot",
    controls: { playstation: "○", xbox: "B" },
    category: "shooting",
    title: { th: "ยิงปกติ", en: "Regular shot" },
    summary: "เล็งไปยังมุมประตูที่ต้องการ แล้วปรับพลังตามระยะยิง",
    detail: "ใช้เป็นทางเลือกตรงไปตรงมา ปัจจัยอย่างมุมยิงและแรงกดดันจากกองหลังก็มีผล",
    buttonPath: inPracticeArena,
    source: shootingSource,
  },
  {
    slug: "finesse-shot",
    controls: { playstation: "R1 + ○", xbox: "RB + B" },
    category: "shooting",
    title: { th: "ยิงปั่นโค้ง", en: "Finesse Shot" },
    summary: "ปั่นบอลเข้าหาเป้าหมายเมื่อมีพื้นที่รอบตัว",
    detail: "ใช้เมื่ออยากปั่นบอลอ้อมกองหลังหรือผู้รักษาประตู เล็งเป้าหมายและปรับพลังตามต้องการ",
    buttonPath: inPracticeArena,
    source: shootingSource,
  },
  {
    slug: "chip-shot",
    controls: { playstation: "L1 + ○", xbox: "LB + B" },
    category: "shooting",
    title: { th: "ชิปลูกบอลข้ามผู้รักษาประตู", en: "Chip Shot" },
    summary: "ยกลูกข้ามผู้รักษาประตูที่วิ่งออกจากเส้นประตู",
    detail: "เลือกจังหวะเมื่อผู้รักษาประตูออกจากเส้นหรือวิ่งเข้าหาผู้เล่น",
    buttonPath: inPracticeArena,
    source: shootingSource,
  },
  {
    slug: "power-shot",
    controls: { playstation: "L1 + R1 + ○", xbox: "LB + RB + B" },
    category: "shooting",
    title: { th: "ยิงพลังสูง", en: "Power Shot" },
    summary: "เหมาะเมื่อมีพื้นที่พอตั้งท่ายิง",
    detail: "ท่านี้มีช่วงเตรียมยิงนานกว่าการยิงปกติ กองหลังจึงมีเวลาเข้ามากดดันเพิ่ม",
    buttonPath: inPracticeArena,
    source: shootingSource,
  },
  {
    slug: "trivela-shot",
    category: "shooting",
    title: { th: "ยิงด้วยข้างเท้าด้านนอก", en: "Trivela Shot" },
    summary: "ใช้ด้านนอกของเท้า; ต้องมี PlayStyle Game Changer",
    detail: "ต้องใช้ PlayStyle หรือ PlayStyle+ ของ Game Changer จึงจะได้ท่า Trivela",
    buttonPath: inPracticeArena,
    source: shootingSource,
  },
  {
    slug: "low-driven-shot",
    controls: { playstation: "○ ตั้งพลัง → ○ กดซ้ำ", xbox: "B ตั้งพลัง → B กดซ้ำ" },
    category: "shooting",
    title: { th: "ยิงเรียด", en: "Low Driven Shot" },
    summary: "หลังตั้งพลังยิง ให้กดปุ่มยิงซ้ำเพื่อส่งลูกต่ำ",
    detail: "EA ระบุว่าการกดปุ่มยิงอีกครั้งหลังตั้งพลัง เพิ่มการยิงเรียดให้การยิงส่วนใหญ่ใน FC 26",
    buttonPath: inPracticeArena,
    source: shootingSource,
  },
  {
    slug: "ground-pass",
    controls: { playstation: "✕", xbox: "A" },
    category: "passing",
    title: { th: "ส่งบอลเรียด", en: "Ground pass" },
    summary: "ส่งตรงให้เพื่อนที่อยู่ใกล้เพื่อรักษาการครองบอล",
    detail: "เล็งไปยังเพื่อนร่วมทีมและปรับพลังให้ถึงเป้าหมาย",
    buttonPath: inPracticeArena,
    source: passingSource,
  },
  {
    slug: "through-pass",
    controls: { playstation: "△", xbox: "Y" },
    category: "passing",
    title: { th: "ส่งทะลุช่อง", en: "Through pass" },
    summary: "ส่งเข้าไปในพื้นที่ว่างด้านหน้าผู้เล่นที่กำลังวิ่ง",
    detail: "มองหาช่องส่งที่ไม่มีแนวรับขวางและเล็งไปยังพื้นที่ที่ต้องการให้เพื่อนวิ่งเข้าไป",
    buttonPath: inPracticeArena,
    source: passingSource,
  },
  {
    slug: "lob-pass-cross",
    controls: { playstation: "□", xbox: "X" },
    category: "passing",
    title: { th: "ส่งบอลโด่งหรือเปิดจากริมเส้น", en: "Lob pass or cross" },
    summary: "ส่งบอลทางอากาศ; ใช้เปิดบอลจากด้านข้างได้",
    detail: "เพิ่มพลังสำหรับการส่งไกลหรือข้ามสนาม และใช้เปิดเข้าหาพื้นที่หน้าประตูจากริมเส้น",
    buttonPath: inPracticeArena,
    source: passingSource,
  },
  {
    slug: "lobbed-through-pass",
    controls: { playstation: "L1 + △", xbox: "LB + Y" },
    category: "passing",
    title: { th: "ส่งทะลุช่องโด่ง", en: "Lobbed through pass" },
    summary: "ยกบอลข้ามแนวรับไปยังพื้นที่ว่างให้เพื่อนที่วิ่งทำทาง",
    detail: "ลองใช้เมื่อกองหลังปิดช่องส่งเรียด หรือมีพื้นที่ว่างอยู่หลังแนวรับ",
    buttonPath: inPracticeArena,
    source: passingSource,
  },
  {
    slug: "driven-ground-pass",
    controls: { playstation: "R1 + ✕", xbox: "RB + A" },
    category: "passing",
    title: { th: "ส่งเรียดแรง", en: "Driven ground pass" },
    summary: "ส่งเรียดเร็วเพื่อย้ายบอลหรือผ่านกลางสนาม",
    detail: "ลูกมาถึงตัวรับเร็วขึ้น ควรดูว่ามีพื้นที่สำหรับเพื่อนรับบอลหรือไม่",
    buttonPath: inPracticeArena,
    source: passingSource,
  },
  {
    slug: "signature-celebration",
    controls: { playstation: "✕", xbox: "A" },
    category: "celebration",
    title: { th: "ท่าดีใจประจำตัว", en: "Signature Celebration" },
    summary: "ท่าดีใจที่ผูกกับผู้เล่นหรือสถานการณ์",
    detail: "คำสั่งและท่าที่ใช้ได้ขึ้นกับเกมและผู้เล่น ดูรายการของเกมเวอร์ชันนี้ก่อนลอง",
    buttonPath: "หยุดเกม → Settings → Celebrations",
    source: celebrationSource,
  },
  {
    slug: "random-celebration",
    controls: { playstation: "○", xbox: "B" },
    category: "celebration",
    title: { th: "สุ่มท่าดีใจ", en: "Random Celebration" },
    summary: "ให้เกมเลือกท่าดีใจหลังทำประตู",
    detail: "คำสั่งเปลี่ยนตามแพลตฟอร์มและชุดควบคุม ดูคำสั่งของคุณในเกม",
    buttonPath: "หยุดเกม → Settings → Celebrations",
    source: celebrationSource,
  },
  {
    slug: "who-me",
    category: "celebration",
    title: { th: "ใคร ฉันเหรอ?", en: "Who, me?" },
    summary: "กดหลังทำประตู โดยค้างปุ่มและอนาล็อกขวาไปทางขวา",
    detail: "กด L1 หรือ LB ค้างไว้ แล้วดันอนาล็อกขวาไปทางขวาค้างไว้ระหว่างการดีใจ",
    controls: { playstation: "ค้าง L1 + ค้าง R →", xbox: "ค้าง LB + ค้าง R →" },
    buttonPath: "หยุดเกม → Settings → Celebrations",
    source: celebrationSource,
  },
  {
    slug: "band-master",
    category: "celebration",
    title: { th: "วาทยกร", en: "Band Master" },
    summary: "กดหลังทำประตู โดยสะบัดอนาล็อกขวาตามลำดับ",
    detail: "กด L1 หรือ LB ค้างไว้ แล้วสะบัดอนาล็อกขวาไปทางขวา จากนั้นสะบัดขึ้น",
    controls: { playstation: "ค้าง L1 + สะบัด R → แล้ว ↑", xbox: "ค้าง LB + สะบัด R → แล้ว ↑" },
    buttonPath: "หยุดเกม → Settings → Celebrations",
    source: celebrationSource,
  },
  {
    slug: "cabaret",
    category: "celebration",
    title: { th: "คาบาเรต์", en: "Cabaret" },
    summary: "กดหลังทำประตู โดยค้างปุ่มและอนาล็อกขวาขึ้น",
    detail: "กด L2 หรือ LT ค้างไว้ แล้วดันอนาล็อกขวาขึ้นค้างไว้ระหว่างการดีใจ",
    controls: { playstation: "ค้าง L2 + ค้าง R ↑", xbox: "ค้าง LT + ค้าง R ↑" },
    buttonPath: "หยุดเกม → Settings → Celebrations",
    source: celebrationSource,
  },
  {
    slug: "slides-and-kisses",
    category: "celebration",
    title: { th: "สไลด์และส่งจูบ", en: "Slides And Kisses" },
    summary: "กดหลังทำประตู โดยค้างปุ่มและอนาล็อกขวาลง",
    detail: "กด R1 หรือ RB ค้างไว้ แล้วดันอนาล็อกขวาลงค้างไว้ระหว่างการดีใจ",
    controls: { playstation: "ค้าง R1 + ค้าง R ↓", xbox: "ค้าง RB + ค้าง R ↓" },
    buttonPath: "หยุดเกม → Settings → Celebrations",
    source: celebrationSource,
  },
];
