"use client";

import Link from "next/link";
import { useLanguage } from "@/features/preferences/language-provider";
import { CONTACT_EMAIL } from "./contact";

export function PrivacyContent() {
  const en = useLanguage() === "en";
  return (
    <main className="mx-auto min-h-[calc(100vh-128px)] max-w-[800px] px-4 py-10 sm:px-6 sm:py-14">
      <Link href="/" className="text-sm text-accent underline underline-offset-4">{en ? "← Back to the guide" : "← กลับไปหน้าคู่มือ"}</Link>
      <h1 className="mt-6 text-3xl font-bold">{en ? "Privacy" : "ความเป็นส่วนตัว"}</h1>
      <p className="mt-3 text-sm text-muted">{en ? "Development draft · Updated 29 October 2026" : "ฉบับร่างสำหรับการพัฒนา · ปรับปรุงล่าสุด 29 ตุลาคม 2026"}</p>
      <div className="mt-8 space-y-8 text-sm leading-7 text-muted">
        <section>
          <h2 className="text-lg font-semibold text-foreground">{en ? "Information stored in your browser" : "ข้อมูลที่เก็บในเบราว์เซอร์"}</h2>
          <p className="mt-2">{en ? "FC26 Playbook uses localStorage to remember your controller, language and favorites in the same browser and device. Storage is separate for each website origin, so localhost and an IP address have separate data. The site does not set an expiry date for this data." : "FC26 Playbook ใช้ localStorage เพื่อจำจอย ภาษา และรายการโปรดในเบราว์เซอร์และเครื่องเดิม ข้อมูลแยกตามที่อยู่เว็บไซต์ เช่น localhost และ IP และเว็บไม่ได้กำหนดวันหมดอายุของข้อมูลนี้"}</p>
          <p className="mt-2">{en ? "You can remove favorites in the guide or clear site data in your browser settings. Clearing site data also removes your saved controller and language choices." : "คุณนำรายการโปรดออกได้จากหน้าเว็บ หรือใช้การตั้งค่าของเบราว์เซอร์เพื่อลบข้อมูลเว็บไซต์ การลบข้อมูลเว็บไซต์จะลบค่าจอย ภาษา และรายการโปรดที่บันทึกไว้ด้วย"}</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">{en ? "Website access information" : "ข้อมูลการเข้าถึงเว็บไซต์"}</h2>
          <p className="mt-2">{en ? "When the site is made available, the hosting provider may process connection information such as IP addresses and request logs to operate and maintain the service. Provider details, retention periods and any analytics use will be clarified before public release." : "เมื่อเว็บไซต์เปิดให้ใช้งาน ผู้ให้บริการโฮสติ้งอาจประมวลผลข้อมูลการเชื่อมต่อ เช่น IP address และบันทึกคำขอ เพื่อให้บริการและดูแลระบบ รายละเอียดผู้ให้บริการ ระยะเวลาเก็บ และการใช้บริการวิเคราะห์จะระบุให้ชัดเจนก่อนเปิดให้บริการ"}</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">{en ? "Links to other websites" : "ลิงก์ไปเว็บไซต์อื่น"}</h2>
          <p className="mt-2">{en ? "The guide links to external sites such as EA Help and FIFPlay. Their privacy policies apply when you visit those sites." : "คู่มือมีลิงก์ไปยังเว็บไซต์ภายนอก เช่น EA Help และ FIFPlay เมื่อเปิดลิงก์เหล่านั้น การใช้ข้อมูลจะอยู่ภายใต้นโยบายของเว็บไซต์ปลายทาง"}</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">{en ? "Site operator and contact" : "ผู้ดูแลและช่องทางติดต่อ"}</h2>
          <p className="mt-2">{en ? "For questions about this site or privacy, email " : "หากมีคำถามเกี่ยวกับเว็บไซต์หรือความเป็นส่วนตัว ติดต่อได้ที่ "}<a className="break-all text-accent underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
          <p className="mt-2">{en ? "The site operator will be identified before public release." : "ข้อมูลผู้ดูแลเว็บไซต์จะระบุเพิ่มเติมก่อนเปิดให้บริการสาธารณะ"}</p>
        </section>
      </div>
    </main>
  );
}
