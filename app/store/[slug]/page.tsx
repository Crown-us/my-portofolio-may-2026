import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/store";
import { buildSeo } from "@/lib/seo";
import { canonicalUrl, formatPrice, jsonLd } from "@/lib/domain";
import SiteShell, { PageIntro } from "../../components/SiteShell";
import Gallery from "../../components/Gallery";
import ProductDescription from "../../components/ProductDescription";
import s from "@/lib/styles";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  return p
    ? buildSeo(p.title, `/store/${slug}`, p.tagline, p.coverImage)
    : { title: "Product not found", robots: { index: false } };
}
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  const platform = {
    gumroad: "Gumroad",
    trakteer: "Trakteer",
    lynk: "Lynk.id",
  }[product.platform];
  return (
    <SiteShell>
      <Link className={s.back} href="/store">
        ← All products
      </Link>
      <PageIntro title={product.title} eyebrow={product.category} />
      <p className={s.lead}>{product.tagline}</p>
      <Image
        className={s.detailImage}
        src={product.coverImage}
        alt={product.title}
        width={1200}
        height={800}
        priority
      />
      <div className={s.detailGrid}>
        <div className={s.prose}>
          <ProductDescription text={product.description} />
          {[
            ["Features", product.features],
            ["What’s included", product.whatsIncluded],
            ["Requirements", product.requirements],
          ].map(
            ([title, items]) =>
              Array.isArray(items) &&
              !!items.length && (
                <section className={s.section} key={String(title)}>
                  <h2>{String(title)}</h2>
                  <ul>
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ),
          )}
          <div className={s.tags}>
            {product.techStack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
        <aside className={s.panel}>
          <h2>{formatPrice(product.price, true)}</h2>
          <p>Checkout through {platform}.</p>
          <a
            className={s.button}
            href={product.checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="buy-click"
          >
            {product.price === null ? "Get" : "Buy"} on {platform} ↗
          </a>
          {product.demoUrl && (
            <p>
              <a
                className={s.textLink}
                href={product.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Preview demo ↗
              </a>
            </p>
          )}
          {product.updatedAt && <p>Updated {product.updatedAt}</p>}
        </aside>
      </div>
      <Gallery images={product.gallery} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.tagline,
            image: canonicalUrl(product.coverImage),
            url: canonicalUrl(`/store/${slug}`),
            offers: {
              "@type": "Offer",
              price: product.price ?? 0,
              priceCurrency: product.currency,
              url: product.checkoutUrl,
            },
          }),
        }}
      />
    </SiteShell>
  );
}
