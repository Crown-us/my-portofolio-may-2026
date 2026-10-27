import SiteShell, { PageIntro } from "../components/SiteShell";
import ProjectLibrary from "../components/ProjectLibrary";
import { buildSeo } from "@/lib/seo";
export const metadata = buildSeo(
  "Projects",
  "/projects",
  "Explore Kevin’s web and mobile engineering projects.",
);
export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  return (
    <SiteShell>
      <PageIntro
        title="Explore the things I’ve built."
        eyebrow="THE PROJECT LIBRARY"
      />
      <ProjectLibrary
        initialCategory={typeof category === "string" ? category : undefined}
      />
    </SiteShell>
  );
}
