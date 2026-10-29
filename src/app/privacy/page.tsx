import type { Metadata } from "next";
import { PrivacyContent } from "@/components/layout/privacy-content";

export const metadata: Metadata = { title: "Privacy | FC26 Playbook" };
export default function PrivacyPage() { return <PrivacyContent />; }
