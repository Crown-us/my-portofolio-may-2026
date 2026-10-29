import { notFound } from "next/navigation";
import { products } from "@/lib/store";
import { buildSeo, localizeSeo } from "@/lib/seo";
import SiteShell, { PageIntro } from "@/app/components/SiteShell";
import StoreLibrary from "@/app/components/StoreLibrary";
const pageMetadata = buildSeo("Store", "/store");
export default function StorePage() {
  if (!products.length) notFound();
  return (
    <SiteShell>
      <PageIntro title="Tools for your next project" eyebrow="THE STORE" />
      <StoreLibrary />
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
