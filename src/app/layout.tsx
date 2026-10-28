import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "FC26 Playbook — คู่มือปุ่มกดภาษาไทย",
  description:
    "คู่มือปุ่ม EA SPORTS FC 26 ภาษาไทย สำหรับ PlayStation และ Xbox",
  applicationName: "FC26 Playbook",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>
        <SiteHeader />
        {children}
        <footer className="border-t border-border px-4 py-5 text-sm text-muted">
          <div className="mx-auto max-w-[1120px] sm:px-2">
            <Link href="/privacy" className="underline underline-offset-4 hover:text-accent">ความเป็นส่วนตัว</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
