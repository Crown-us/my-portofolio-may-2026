import { T } from "@/app/components/LocaleProvider";
import Image from "@/app/components/LocalizedImage";
import Link from "@/app/components/LocalizedLink";
import { notFound } from "next/navigation";
import { products } from "@/lib/store";
import { buildSeo, localizeSeo } from "@/lib/seo";
import { canonicalUrl, formatPrice, jsonLd } from "@/lib/domain";
import SiteShell, { PageIntro } from "@/app/components/SiteShell";
import Gallery from "@/app/components/Gallery";
import ProductDescription from "@/app/components/ProductDescription";
import s from "@/lib/styles";
type Props = { params: Promise<{ slug: string; locale: string }> };
export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const p = products.find((p) => p.slug === slug);
  return p
    ? localizeSeo(
        buildSeo(p.title, `/store/${slug}`, p.tagline, p.coverImage),
        locale,
      )
    : { title: "Product not found", robots: { index: false } };
}
export default async function ProductPage({ params }: Props) {
  const { slug, locale } = await params;
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
        <T>← All products</T>
      </Link>
      <PageIntro title={product.title} eyebrow={product.category} />
      <p className={s.lead}>
        <T>{product.tagline}</T>
      </p>
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
                  <h2>
                    <T>{String(title)}</T>
                  </h2>
                  <ul>
                    {items.map((item) => (
                      <li key={item}>
                        <T>{item}</T>
                      </li>
                    ))}
                  </ul>
                </section>
              ),
          )}
          <div className={s.tags}>
            {product.techStack.map((tech) => (
              <span key={tech}>
                <T>{tech}</T>
              </span>
            ))}
          </div>
        </div>
        <aside className={s.panel}>
          <h2>
            <T>{formatPrice(product.price, true)}</T>
          </h2>
          <p>
            <T>Checkout through </T>
            <T>{platform}</T>.
          </p>
          <a
            className={s.button}
            href={product.checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="buy-click"
          >
            <T>{product.price === null ? "Get" : "Buy"}</T> <T>on </T>
            <T>{platform}</T> ↗
          </a>
          {product.demoUrl && (
            <p>
              <a
                className={s.textLink}
                href={product.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <T>Preview demo ↗</T>
              </a>
            </p>
          )}
          {product.updatedAt && (
            <p>
              <T>Updated </T>
              <T>{product.updatedAt}</T>
            </p>
          )}
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
            url: canonicalUrl(`/${locale}/store/${slug}`),
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
