import Image from "next/image";
import Link from "next/link";
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
          <Link href={`/store/${product.slug}`}>{product.title}</Link>
        </h3>
        <p>{product.tagline}</p>
        <div className={s.cardLinks}>
          <span>{product.category}</span>
          <strong>{formatPrice(product.price, true)}</strong>
        </div>
      </div>
    </article>
  );
}
