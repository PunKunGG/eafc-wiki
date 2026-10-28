import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ความเป็นส่วนตัว | FC26 Playbook",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-[calc(100vh-128px)] max-w-[800px] px-4 py-10 sm:px-6 sm:py-14">
      <Link href="/" className="text-sm text-accent underline underline-offset-4">← กลับไปหน้าคู่มือ</Link>
      <h1 className="mt-6 text-3xl font-bold">ความเป็นส่วนตัว</h1>
      <p className="mt-3 text-sm text-muted">ฉบับร่างสำหรับการพัฒนา · ปรับปรุงล่าสุด 28 ตุลาคม 2026</p>
      <div className="mt-8 space-y-8 text-sm leading-7 text-muted">
        <section>
          <h2 className="text-lg font-semibold text-foreground">ข้อมูลที่เก็บในเบราว์เซอร์</h2>
          <p className="mt-2">FC26 Playbook ใช้ localStorage เพื่อจำจอยที่เลือกและรายการโปรด ข้อมูลนี้เก็บในเบราว์เซอร์ของคุณเพื่อให้กลับมาใช้งานได้ในเครื่องและเบราว์เซอร์เดิม โดยแยกตามที่อยู่เว็บไซต์ เช่น localhost และ IP จะมีข้อมูลแยกกัน และเว็บไม่ได้กำหนดวันหมดอายุของข้อมูลนี้</p>
          <p className="mt-2">คุณนำรายการโปรดออกได้จากหน้าเว็บ หรือใช้การตั้งค่าของเบราว์เซอร์เพื่อลบข้อมูลเว็บไซต์ การลบข้อมูลเว็บไซต์จะลบค่าจอยและรายการโปรดที่บันทึกไว้ด้วย</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">ข้อมูลการเข้าถึงเว็บไซต์</h2>
          <p className="mt-2">เมื่อเว็บไซต์เปิดให้ใช้งาน ผู้ให้บริการโฮสติ้งอาจประมวลผลข้อมูลการเชื่อมต่อ เช่น IP address และบันทึกคำขอ เพื่อให้บริการและดูแลระบบ รายละเอียดผู้ให้บริการ ระยะเวลาเก็บ และการใช้บริการวิเคราะห์จะระบุให้ชัดเจนก่อนเปิดให้บริการ</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">ลิงก์ไปเว็บไซต์อื่น</h2>
          <p className="mt-2">คู่มือมีลิงก์ไปยังเว็บไซต์ภายนอก เช่น EA Help และ FIFPlay เมื่อเปิดลิงก์เหล่านั้น การใช้ข้อมูลจะอยู่ภายใต้นโยบายของเว็บไซต์ปลายทาง</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground">ผู้ดูแลและช่องทางติดต่อ</h2>
          <p className="mt-2">ข้อมูลผู้ดูแลเว็บไซต์และช่องทางติดต่อจะเพิ่มก่อนเปิดให้บริการสาธารณะ</p>
        </section>
      </div>
    </main>
  );
}
