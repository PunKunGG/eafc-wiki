"use client";

import Link from "next/link";
import { useLanguage } from "@/features/preferences/language-provider";

export default function NotFound() {
  const en = useLanguage() === "en";
  return (
    <main className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold">{en ? "Page not found" : "ไม่พบหน้าที่ต้องการ"}</h1>
      <p className="mt-3 text-sm text-muted">{en ? "This page may not exist in the guide yet." : "ลิงก์นี้อาจยังไม่มีในคู่มือ"}</p>
      <Link className="mt-6 inline-flex min-h-11 items-center text-sm text-accent underline underline-offset-4" href="/">
        {en ? "Back to home" : "กลับหน้าหลัก"}
      </Link>
    </main>
  );
}
