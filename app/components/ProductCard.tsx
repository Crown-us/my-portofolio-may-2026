import { T } from "@/app/components/LocaleProvider";
import Image from "@/app/components/LocalizedImage";
import Link from "@/app/components/LocalizedLink";
import type { Product } from "@/lib/store";
import { formatPrice } from "@/lib/domain";
import s from "@/lib/styles";
export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className={s.card}>
      <Link href={`/store/${product.slug}`} className={s.cardImage}>
        <Image
          src={product.coverImage}
          alt={product.title}
          width={600}
          height={400}
        />
      </Link>
      <div className={s.cardBody}>
        <h3>
          <Link href={`/store/${product.slug}`}>
            <T>{product.title}</T>
          </Link>
        </h3>
        <p>
          <T>{product.tagline}</T>
        </p>
        <div className={s.cardLinks}>
          <span>
            <T>{product.category}</T>
          </span>
          <strong>
            <T>{formatPrice(product.price, true)}</T>
          </strong>
        </div>
      </div>
    </article>
  );
}
