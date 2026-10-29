import SiteShell, { PageIntro } from "@/app/components/SiteShell";
import ProjectLibrary from "@/app/components/ProjectLibrary";
import { buildSeo, localizeSeo } from "@/lib/seo";
const pageMetadata = buildSeo(
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return localizeSeo(pageMetadata, (await params).locale);
}
