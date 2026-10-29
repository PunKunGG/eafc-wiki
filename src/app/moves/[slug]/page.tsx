import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { moveGuides } from "@/features/moves/catalog";
import { MoveDetail } from "@/features/moves/move-detail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return moveGuides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = moveGuides.find((item) => item.slug === slug);
  return guide ? { title: `${guide.title.en} | FC26 Playbook` } : {};
}

export default async function MovePage({ params }: Props) {
  const { slug } = await params;
  const guide = moveGuides.find((item) => item.slug === slug);
  if (!guide) notFound();
  return <MoveDetail guide={guide} />;
}
