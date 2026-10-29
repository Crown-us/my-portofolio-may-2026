"use client";
import { T } from "@/app/components/LocaleProvider";

import { useEffect, useState } from "react";
import Link from "@/app/components/LocalizedLink";
import { projects } from "@/lib/projects";
import { products } from "@/lib/store";
import s from "@/lib/styles";
export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  useEffect(() => {
    const timer = setTimeout(
      () => setDebounced(query.trim().toLowerCase()),
      250,
    );
    return () => clearTimeout(timer);
  }, [query]);
  const index = [
    ...projects.map((p) => ({
      title: p.title,
      text: `${p.summary} ${p.tech.join(" ")}`,
      href: `/projects/${p.slug}`,
    })),
    ...products.map((p) => ({
      title: p.title,
      text: `${p.tagline} ${p.techStack.join(" ")}`,
      href: `/store/${p.slug}`,
    })),
  ];
  const matches = debounced
    ? index.filter((item) =>
        `${item.title} ${item.text}`.toLowerCase().includes(debounced),
      )
    : [];
  return (
    <div className={s.globalSearch}>
      <label>
        <T>Search portfolio</T>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="search"
        />
      </label>
      {debounced && (
        <div className={s.searchResults}>
          <p role="status">
            <T>{matches.length}</T> <T>results</T>
          </p>
          {matches.map((item) => (
            <Link onClick={() => setQuery("")} key={item.href} href={item.href}>
              <T>{item.title}</T>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
