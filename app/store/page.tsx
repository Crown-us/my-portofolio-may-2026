import { notFound } from "next/navigation";
import { products } from "@/lib/store";
import { buildSeo } from "@/lib/seo";
import SiteShell, { PageIntro } from "../components/SiteShell";
import StoreLibrary from "../components/StoreLibrary";
export const metadata = buildSeo("Store", "/store");
export default function StorePage() {
  if (!products.length) notFound();
  return (
    <SiteShell>
      <PageIntro title="Tools for your next project" eyebrow="THE STORE" />
      <StoreLibrary />
    </SiteShell>
  );
}
