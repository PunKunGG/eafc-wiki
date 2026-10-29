import type { MoveCategory } from "./types";

export type GuideEntry = {
  slug: string;
  category: MoveCategory;
  title: { th: string; en: string };
  summary: string;
  summaryEn: string;
  detail: string;
  detailEn: string;
  buttonPath: string;
  buttonPathEn: string;
  source: { label: string; url: string };
  sourceCheckedAt?: string;
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

const fifplayControls = {
  label: "FIFPlay · FC 26 controls",
  url: "https://www.fifplay.com/fc-26-controls/",
} as const;

const inPracticeArena =
  "เมนูหลัก → Learn to Play → Practice Arena → หยุดเกม → Button Help";
const inPracticeArenaEn =
  "Main menu → Learn to Play → Practice Arena → Pause → Button Help";
const celebrationPathEn = "Pause → Settings → Celebrations";

export const categories: { id: MoveCategory; label: string; labelEn: string }[] = [
  { id: "shooting", label: "การยิง", labelEn: "Shooting" },
  { id: "passing", label: "การส่ง", labelEn: "Passing" },
  { id: "celebration", label: "ท่าดีใจ", labelEn: "Celebrations" },
];

/** Classic controls are sourced from FIFPlay; descriptions reference EA Help. */
export const moveGuides: readonly GuideEntry[] = [
  {
    slug: "regular-shot",
    category: "shooting",
    title: { th: "ยิงปกติ", en: "Regular shot" },
    summary: "เล็งไปยังมุมประตูที่ต้องการ แล้วปรับพลังตามระยะยิง",
    summaryEn: "Aim for your chosen corner and adjust the power to the distance.",
    detail: "ใช้เป็นทางเลือกตรงไปตรงมา ปัจจัยอย่างมุมยิงและแรงกดดันจากกองหลังก็มีผล",
    detailEn: "A straightforward option. The shooting angle and defensive pressure also matter.",
    buttonPath: inPracticeArena,
    buttonPathEn: inPracticeArenaEn,
    source: shootingSource,
  },
  {
    slug: "finesse-shot",
    category: "shooting",
    title: { th: "ยิงปั่นโค้ง", en: "Finesse Shot" },
    summary: "ปั่นบอลเข้าหาเป้าหมายเมื่อมีพื้นที่รอบตัว",
    summaryEn: "Curl the ball towards the target when you have space.",
    detail: "ใช้เมื่ออยากปั่นบอลอ้อมกองหลังหรือผู้รักษาประตู เล็งเป้าหมายและปรับพลังตามต้องการ",
    detailEn: "Try curling the ball around defenders or the goalkeeper. Aim and adjust power as needed.",
    buttonPath: inPracticeArena,
    buttonPathEn: inPracticeArenaEn,
    source: shootingSource,
  },
  {
    slug: "chip-shot",
    category: "shooting",
    title: { th: "ชิปลูกบอลข้ามผู้รักษาประตู", en: "Chip Shot" },
    summary: "ยกลูกข้ามผู้รักษาประตูที่วิ่งออกจากเส้นประตู",
    summaryEn: "Lift the ball over a goalkeeper who has come off the line.",
    detail: "เลือกจังหวะเมื่อผู้รักษาประตูออกจากเส้นหรือวิ่งเข้าหาผู้เล่น",
    detailEn: "Use it when the goalkeeper leaves the line or rushes towards your player.",
    buttonPath: inPracticeArena,
    buttonPathEn: inPracticeArenaEn,
    source: shootingSource,
  },
  {
    slug: "power-shot",
    category: "shooting",
    title: { th: "ยิงพลังสูง", en: "Power Shot" },
    summary: "เหมาะเมื่อมีพื้นที่พอตั้งท่ายิง",
    summaryEn: "Best when you have enough space to wind up.",
    detail: "ท่านี้มีช่วงเตรียมยิงนานกว่าการยิงปกติ กองหลังจึงมีเวลาเข้ามากดดันเพิ่ม",
    detailEn: "The wind-up is longer than a regular shot, giving defenders more time to close you down.",
    buttonPath: inPracticeArena,
    buttonPathEn: inPracticeArenaEn,
    source: shootingSource,
  },
  {
    slug: "trivela-shot",
    category: "shooting",
    title: { th: "ยิงด้วยข้างเท้าด้านนอก", en: "Trivela Shot" },
    summary: "ใช้ด้านนอกของเท้า; ต้องมี PlayStyle Game Changer",
    summaryEn: "Strike with the outside of the foot; requires the Game Changer PlayStyle.",
    detail: "ต้องใช้ PlayStyle หรือ PlayStyle+ ของ Game Changer จึงจะได้ท่า Trivela",
    detailEn: "The Game Changer PlayStyle or PlayStyle+ is required for the Trivela animation.",
    buttonPath: inPracticeArena,
    buttonPathEn: inPracticeArenaEn,
    source: shootingSource,
  },
  {
    slug: "low-driven-shot",
    category: "shooting",
    title: { th: "ยิงเรียด", en: "Low Driven Shot" },
    summary: "หลังตั้งพลังยิง ให้กดปุ่มยิงซ้ำเพื่อส่งลูกต่ำ",
    summaryEn: "After setting shot power, press shoot again to keep the ball low.",
    detail: "EA ระบุว่าการกดปุ่มยิงอีกครั้งหลังตั้งพลัง เพิ่มการยิงเรียดให้การยิงส่วนใหญ่ใน FC 26",
    detailEn: "EA says pressing shoot again after setting power adds a low driven finish to most shots in FC 26.",
    buttonPath: inPracticeArena,
    buttonPathEn: inPracticeArenaEn,
    source: shootingSource,
  },
  {
    slug: "ground-pass",
    category: "passing",
    title: { th: "ส่งบอลเรียด", en: "Ground pass" },
    summary: "ส่งตรงให้เพื่อนที่อยู่ใกล้เพื่อรักษาการครองบอล",
    summaryEn: "Pass directly to a nearby teammate to keep possession.",
    detail: "เล็งไปยังเพื่อนร่วมทีมและปรับพลังให้ถึงเป้าหมาย",
    detailEn: "Aim towards your teammate and use enough power to reach them.",
    buttonPath: inPracticeArena,
    buttonPathEn: inPracticeArenaEn,
    source: passingSource,
  },
  {
    slug: "through-pass",
    category: "passing",
    title: { th: "ส่งทะลุช่อง", en: "Through pass" },
    summary: "ส่งเข้าไปในพื้นที่ว่างด้านหน้าผู้เล่นที่กำลังวิ่ง",
    summaryEn: "Play the ball into space ahead of a running teammate.",
    detail: "มองหาช่องส่งที่ไม่มีแนวรับขวางและเล็งไปยังพื้นที่ที่ต้องการให้เพื่อนวิ่งเข้าไป",
    detailEn: "Look for an open passing lane and aim into the space your teammate can run into.",
    buttonPath: inPracticeArena,
    buttonPathEn: inPracticeArenaEn,
    source: passingSource,
  },
  {
    slug: "lob-pass-cross",
    category: "passing",
    title: { th: "ส่งบอลโด่งหรือเปิดจากริมเส้น", en: "Lob pass or cross" },
    summary: "ส่งบอลทางอากาศ; ใช้เปิดบอลจากด้านข้างได้",
    summaryEn: "Play the ball in the air or cross from out wide.",
    detail: "เพิ่มพลังสำหรับการส่งไกลหรือข้ามสนาม และใช้เปิดเข้าหาพื้นที่หน้าประตูจากริมเส้น",
    detailEn: "Use more power for longer or cross-field passes, or cross into the penalty area from the wing.",
    buttonPath: inPracticeArena,
    buttonPathEn: inPracticeArenaEn,
    source: passingSource,
  },
  {
    slug: "lobbed-through-pass",
    category: "passing",
    title: { th: "ส่งทะลุช่องโด่ง", en: "Lobbed through pass" },
    summary: "ยกบอลข้ามแนวรับไปยังพื้นที่ว่างให้เพื่อนที่วิ่งทำทาง",
    summaryEn: "Lift the ball over the defence into space for a teammate making a run.",
    detail: "ลองใช้เมื่อกองหลังปิดช่องส่งเรียด หรือมีพื้นที่ว่างอยู่หลังแนวรับ",
    detailEn: "Try it when defenders block a ground pass or there is space behind the defence.",
    buttonPath: inPracticeArena,
    buttonPathEn: inPracticeArenaEn,
    source: passingSource,
  },
  {
    slug: "driven-ground-pass",
    category: "passing",
    title: { th: "ส่งเรียดแรง", en: "Driven ground pass" },
    summary: "ส่งเรียดเร็วเพื่อย้ายบอลหรือผ่านกลางสนาม",
    summaryEn: "Play a fast ground pass to move the ball or pass through midfield.",
    detail: "ลูกมาถึงตัวรับเร็วขึ้น ควรดูว่ามีพื้นที่สำหรับเพื่อนรับบอลหรือไม่",
    detailEn: "The ball reaches the receiver faster, so check that your teammate has room to control it.",
    buttonPath: inPracticeArena,
    buttonPathEn: inPracticeArenaEn,
    source: passingSource,
  },
  {
    slug: "signature-celebration",
    category: "celebration",
    title: { th: "ท่าดีใจประจำตัว", en: "Signature Celebration" },
    summary: "ท่าดีใจที่ผูกกับผู้เล่นหรือสถานการณ์",
    summaryEn: "A signature celebration associated with a player or situation.",
    detail: "คำสั่งและท่าที่ใช้ได้ขึ้นกับเกมและผู้เล่น ดูรายการของเกมเวอร์ชันนี้ก่อนลอง",
    detailEn: "Available celebrations and commands depend on the game and player. Check the list in this game version.",
    buttonPath: "หยุดเกม → Settings → Celebrations",
    buttonPathEn: celebrationPathEn,
    source: celebrationSource,
  },
  {
    slug: "random-celebration",
    category: "celebration",
    title: { th: "สุ่มท่าดีใจ", en: "Random Celebration" },
    summary: "ให้เกมเลือกท่าดีใจหลังทำประตู",
    summaryEn: "Let the game choose a celebration after scoring.",
    detail: "คำสั่งเปลี่ยนตามแพลตฟอร์มและชุดควบคุม ดูคำสั่งของคุณในเกม",
    detailEn: "Controls depend on the platform and control scheme. Check your configuration in game.",
    buttonPath: "หยุดเกม → Settings → Celebrations",
    buttonPathEn: celebrationPathEn,
    source: celebrationSource,
  },
  {
    slug: "who-me",
    category: "celebration",
    title: { th: "ใคร ฉันเหรอ?", en: "Who, me?" },
    summary: "กดหลังทำประตู โดยค้างปุ่มและอนาล็อกขวาไปทางขวา",
    summaryEn: "After scoring, hold the button and the right stick to the right.",
    detail: "กด L1 หรือ LB ค้างไว้ แล้วดันอนาล็อกขวาไปทางขวาค้างไว้ระหว่างการดีใจ",
    detailEn: "Hold L1 or LB while holding the right stick to the right during the celebration.",
    buttonPath: "หยุดเกม → Settings → Celebrations",
    buttonPathEn: celebrationPathEn,
    source: celebrationSource,
  },
  {
    slug: "band-master",
    category: "celebration",
    title: { th: "วาทยกร", en: "Band Master" },
    summary: "กดหลังทำประตู โดยสะบัดอนาล็อกขวาตามลำดับ",
    summaryEn: "After scoring, flick the right stick in the indicated sequence.",
    detail: "กด L1 หรือ LB ค้างไว้ แล้วสะบัดอนาล็อกขวาไปทางขวา จากนั้นสะบัดขึ้น",
    detailEn: "Hold L1 or LB, then flick the right stick right and then up.",
    buttonPath: "หยุดเกม → Settings → Celebrations",
    buttonPathEn: celebrationPathEn,
    source: celebrationSource,
  },
  {
    slug: "cabaret",
    category: "celebration",
    title: { th: "คาบาเรต์", en: "Cabaret" },
    summary: "กดหลังทำประตู โดยค้างปุ่มและอนาล็อกขวาขึ้น",
    summaryEn: "After scoring, hold the button and the right stick up.",
    detail: "กด L2 หรือ LT ค้างไว้ แล้วดันอนาล็อกขวาขึ้นค้างไว้ระหว่างการดีใจ",
    detailEn: "Hold L2 or LT while holding the right stick up during the celebration.",
    buttonPath: "หยุดเกม → Settings → Celebrations",
    buttonPathEn: celebrationPathEn,
    source: celebrationSource,
  },
  {
    slug: "slides-and-kisses",
    category: "celebration",
    title: { th: "สไลด์และส่งจูบ", en: "Slides And Kisses" },
    summary: "กดหลังทำประตู โดยค้างปุ่มและอนาล็อกขวาลง",
    summaryEn: "After scoring, hold the button and the right stick down.",
    detail: "กด R1 หรือ RB ค้างไว้ แล้วดันอนาล็อกขวาลงค้างไว้ระหว่างการดีใจ",
    detailEn: "Hold R1 or RB while holding the right stick down during the celebration.",
    buttonPath: "หยุดเกม → Settings → Celebrations",
    buttonPathEn: celebrationPathEn,
    source: celebrationSource,
  },
  {
    slug: "show-respect", category: "celebration",
    title: { th: "แสดงความเคารพ", en: "Show Respect" },
    summary: "ท่าดีใจหลังทำประตู", summaryEn: "A celebration after scoring.",
    detail: "กด L1 หรือ LB ค้างไว้ แล้วกดปุ่มยิงสองครั้งติดกันอย่างรวดเร็ว", detailEn: "Hold L1 or LB and double-tap the shoot button.",
    buttonPath: "หยุดเกม → Settings → Celebrations", buttonPathEn: celebrationPathEn,
    source: { label: "FIFPlay · Celebrations", url: "https://www.fifplay.com/fc-26-celebrations/" }, sourceCheckedAt: "2026-10-29",
  },
  {
    slug: "all-ears", category: "celebration",
    title: { th: "เงี่ยหูฟัง", en: "All Ears" },
    summary: "ท่าดีใจหลังทำประตู", summaryEn: "A celebration after scoring.",
    detail: "กด L1 หรือ LB ค้างไว้ แล้วกดปุ่มส่งทะลุช่อง", detailEn: "Hold L1 or LB and press the through-pass button.",
    buttonPath: "หยุดเกม → Settings → Celebrations", buttonPathEn: celebrationPathEn,
    source: { label: "FIFPlay · Celebrations", url: "https://www.fifplay.com/fc-26-celebrations/" }, sourceCheckedAt: "2026-10-29",
  },
  ...([
    {
      slug: "low-driven-finesse-shot", category: "shooting",
      title: { th: "ยิงปั่นเรียด", en: "Low Driven Finesse Shot" },
      summary: "ผสมการยิงปั่นกับการยิงเรียด", summaryEn: "Combine a finesse shot with a low driven finish.",
      detail: "ตั้งพลังด้วยคำสั่งยิงปั่น แล้วกดปุ่มยิงซ้ำหลังตั้งพลัง", detailEn: "Set power with the finesse shot input, then press shoot again after setting power.",
    },
    {
      slug: "low-driven-power-shot", category: "shooting",
      title: { th: "ยิงพลังสูงแบบเรียด", en: "Low Driven Power Shot" },
      summary: "ผสมการยิงพลังสูงกับการยิงเรียด", summaryEn: "Combine a power shot with a low driven finish.",
      detail: "ตั้งพลังด้วยคำสั่งยิงพลังสูง แล้วกดปุ่มยิงซ้ำหลังตั้งพลัง", detailEn: "Set power with the power shot input, then press shoot again after setting power.",
    },
    {
      slug: "driven-through-pass", category: "passing",
      title: { th: "ส่งทะลุช่องแรง", en: "Driven Through Pass" },
      summary: "ส่งทะลุช่องแบบแรง", summaryEn: "Play a driven through pass.",
      detail: "กดปุ่มส่งทะลุช่องร่วมกับปุ่มปรับคำสั่งทั้งสอง", detailEn: "Press the through-pass button with both modifiers.",
    },
    {
      slug: "lofted-ground-pass", category: "passing",
      title: { th: "ส่งสั้นยกบอล", en: "Lofted Ground Pass" },
      summary: "ส่งบอลสั้นแบบยกขึ้น", summaryEn: "Play a lofted ground pass.",
      detail: "กดปุ่มส่งบอลเรียดสองครั้ง", detailEn: "Press the ground-pass button twice.",
    },
    {
      slug: "lofted-through-pass", category: "passing",
      title: { th: "ส่งทะลุช่องยกบอล", en: "Lofted Through Pass" },
      summary: "ส่งทะลุช่องแบบยกบอล", summaryEn: "Play a lofted through pass.",
      detail: "กดปุ่มส่งทะลุช่องสองครั้ง", detailEn: "Press the through-pass button twice.",
    },
    {
      slug: "driven-lob-pass", category: "passing",
      title: { th: "ส่งโด่งแรงหรือเปิดแรง", en: "Driven Lob Pass / Cross" },
      summary: "ส่งโด่งแรงหรือเปิดบอลแรง", summaryEn: "Play a driven lob pass or cross.",
      detail: "กดปุ่มส่งโด่งร่วมกับปุ่มปรับคำสั่งทั้งสอง", detailEn: "Press the lob-pass button with both modifiers.",
    },
    {
      slug: "high-lob", category: "passing",
      title: { th: "ส่งโด่งสูง", en: "High Lob" },
      summary: "ส่งบอลโด่งสูง", summaryEn: "Play a high lob.",
      detail: "กดปุ่มปรับคำสั่งร่วมกับปุ่มส่งโด่ง", detailEn: "Press the modifier with the lob-pass button.",
    },
    {
      slug: "ground-cross", category: "passing",
      title: { th: "เปิดบอลเรียด", en: "Ground Cross" },
      summary: "เปิดบอลเรียดจากริมเส้น", summaryEn: "Play a ground cross from out wide.",
      detail: "กดปุ่มเปิดบอลสองครั้งเมื่ออยู่ในจังหวะเปิดบอล", detailEn: "Press the cross button twice when crossing.",
    },
    {
      slug: "flair-pass", category: "passing",
      title: { th: "ส่งบอลแบบ Flair", en: "Flair Pass" },
      summary: "ใช้คำสั่งส่งบอลแบบ Flair", summaryEn: "Use the flair pass input.",
      detail: "กดปุ่ม Flair ร่วมกับปุ่มส่งบอลเรียด", detailEn: "Press the flair modifier with the ground-pass button.",
    },
    {
      slug: "flair-lob", category: "passing",
      title: { th: "ส่งโด่งแบบ Flair", en: "Flair Lob / Cross" },
      summary: "ใช้คำสั่งส่งโด่งหรือเปิดบอลแบบ Flair", summaryEn: "Use the flair lob or cross input.",
      detail: "กดปุ่ม Flair ร่วมกับปุ่มส่งโด่ง", detailEn: "Press the flair modifier with the lob-pass button.",
    },
    {
      slug: "flair-through-pass", category: "passing",
      title: { th: "ส่งทะลุช่องแบบ Flair", en: "Flair Through Pass" },
      summary: "ใช้คำสั่งส่งทะลุช่องแบบ Flair", summaryEn: "Use the flair through-pass input.",
      detail: "กดปุ่ม Flair ร่วมกับปุ่มส่งทะลุช่อง", detailEn: "Press the flair modifier with the through-pass button.",
    },
    {
      slug: "pass-and-go", category: "passing",
      title: { th: "ส่งแล้ววิ่ง", en: "Pass and Go" },
      summary: "ส่งบอลแล้ววิ่งทำทาง", summaryEn: "Pass and start a run.",
      detail: "กดปุ่มปรับคำสั่งร่วมกับปุ่มส่งบอลเรียด", detailEn: "Press the modifier with the ground-pass button.",
    },
  ] satisfies readonly Pick<GuideEntry, "slug" | "category" | "title" | "summary" | "summaryEn" | "detail" | "detailEn">[]).map((guide) => ({
    ...guide,
    buttonPath: inPracticeArena,
    buttonPathEn: inPracticeArenaEn,
    source: fifplayControls,
    sourceCheckedAt: "2026-10-29",
  })),
];
