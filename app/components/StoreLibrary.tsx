"use client";
import { translate } from "@/lib/i18n";

import { T, useLocale } from "@/app/components/LocaleProvider";

import { useState } from "react";
import { products } from "@/lib/store";
import { getFeatured } from "@/lib/domain";
import ProductCard from "./ProductCard";
import s from "@/lib/styles";
export default function StoreLibrary() {
  const locale = useLocale();
  const [category, setCategory] = useState("All");
  const featured = getFeatured(products);
  const visible = products.filter(
    (p) => category === "All" || p.category === category,
  );
  return (
    <>
      {!!featured.length && (
        <section className={s.section}>
          <h2>
            <T>Featured products</T>
          </h2>
          <div className={s.projectGrid}>
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      )}
      <section className={s.section}>
        <h2>
          <T>Browse products</T>
        </h2>
        <div
          className={s.filters}
          aria-label={translate("Product categories", locale)}
        >
          {["All", ...new Set(products.map((p) => p.category))].map((value) => (
            <button
              className={s.button}
              aria-pressed={category === value}
              onClick={() => setCategory(value)}
              key={value}
            >
              <T>{value}</T>
            </button>
          ))}
        </div>
        <p role="status">
          <T>{visible.length}</T> <T>products</T>
        </p>
        <div className={s.projectGrid}>
          {visible.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
