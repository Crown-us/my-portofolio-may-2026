import { notFound, permanentRedirect } from "next/navigation";
import { projects } from "@/lib/projects";
export default async function LegacyProject({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!projects.some((project) => project.slug === slug)) notFound();
  permanentRedirect(`/projects/${slug}`);
}
