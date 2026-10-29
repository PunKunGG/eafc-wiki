import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LanguageProvider } from "@/features/preferences/language-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "FC26 Playbook — EA SPORTS FC 26 Guide",
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
        <LanguageProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
