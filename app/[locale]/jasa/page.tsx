import SiteShell from "@/app/components/SiteShell";
import { buildSeo, localizeSeo } from "@/lib/seo";
import { Examples, Faq, Hero, Packages, Process } from "./sections";
import page from "./jasa.module.css";

type Props = { params: Promise<{ locale: string }> };

export default function ServicesPage() {
  return (
    <SiteShell>
      <div className={page.page}>
        <Hero />
        <Packages />
        <Process />
        <Faq />
        <Examples />
      </div>
    </SiteShell>
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return localizeSeo(
    buildSeo(
      "Website development services",
      "/jasa",
      "Website packages for small businesses by a developer in Kediri: landing pages, company profiles, and custom web apps. Chat on WhatsApp to discuss yours.",
    ),
    locale,
  );
}
