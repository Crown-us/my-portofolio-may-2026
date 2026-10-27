import Portfolio from "../components/Portfolio";
export const metadata = { title: "Projects — Kevin Dwi Wijaya" };
export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
 const params = await searchParams;
 const query = typeof params.q === "string" ? params.q : "";
 const category = typeof params.category === "string" ? params.category : "All projects";
 return <Portfolio key={`${query}:${category}`} view="projects" initialQuery={query} initialCategory={category}/>;
}
