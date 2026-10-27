"use client";
import { useState } from "react";
import { products } from "@/lib/store";
import { getFeatured } from "@/lib/domain";
import ProductCard from "./ProductCard";
import s from "@/lib/styles";
export default function StoreLibrary() {
  const [category, setCategory] = useState("All");
  const featured = getFeatured(products);
  const visible = products.filter(
    (p) => category === "All" || p.category === category,
  );
  return (
    <>
      {!!featured.length && (
        <section className={s.section}>
          <h2>Featured products</h2>
          <div className={s.projectGrid}>
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      )}
      <section className={s.section}>
        <h2>Browse products</h2>
        <div className={s.filters} aria-label="Product categories">
          {["All", ...new Set(products.map((p) => p.category))].map((value) => (
            <button
              className={s.button}
              aria-pressed={category === value}
              onClick={() => setCategory(value)}
              key={value}
            >
              {value}
            </button>
          ))}
        </div>
        <p role="status">{visible.length} products</p>
        <div className={s.projectGrid}>
          {visible.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
