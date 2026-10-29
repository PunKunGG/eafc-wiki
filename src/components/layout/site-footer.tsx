"use client";

import Link from "next/link";
import { useLanguage } from "@/features/preferences/language-provider";
import { CONTACT_EMAIL } from "./contact";

export function SiteFooter() {
  const language = useLanguage();
  return (
    <footer className="border-t border-border px-4 py-5 text-sm text-muted">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 sm:px-2">
        <nav aria-label={language === "th" ? "ลิงก์ส่วนท้าย" : "Footer links"} className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/privacy" className="underline underline-offset-4 hover:text-accent">{language === "th" ? "ความเป็นส่วนตัว" : "Privacy"}</Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4 hover:text-accent">{language === "th" ? "ติดต่อ" : "Contact"}</a>
        </nav>
        <p>{language === "th" ? "เว็บไซต์สร้างโดยแฟนเกม ไม่ได้รับการรับรองจากหรือมีส่วนเกี่ยวข้องกับ EA หรือผู้ให้สิทธิของ EA" : "This fan-made website is not endorsed by or affiliated with EA or its licensors."}</p>
      </div>
    </footer>
  );
}
