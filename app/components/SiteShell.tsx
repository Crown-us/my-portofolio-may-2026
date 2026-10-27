"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/config";
import { products } from "@/lib/store";
import GlobalSearch from "./GlobalSearch";
import s from "@/lib/styles";
export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Discover" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About me" },
    { href: "/services", label: "Services" },
    ...(products.length ? [{ href: "/store", label: "Store" }] : []),
    { href: "/contact", label: "Contact" },
    { href: "/resume", label: "Resume" },
  ];
  return (
    <div className={s.page}>
      <a className={s.skip} href="#main-content">
        Skip to content
      </a>
      <div className={s.stickyHeader}>
        <header className={s.header}>
          <Link href="/" className={s.brand}>
            <Image
              src="/kevin-mark.svg"
              alt=""
              width={44}
              height={44}
              className={s.brandMark}
              priority
            />
            <span>
              kevin<span className={s.brandLight}> / portfolio</span>
            </span>
          </Link>
          {siteConfig.hasGlobalSearch && products.length > 0 ? (
            <GlobalSearch />
          ) : (
            <span className={s.headerCaption}>
              Full-stack & mobile engineer
            </span>
          )}
          <Link className={s.avatar} href="/about" aria-label="About Kevin">
            K
          </Link>
        </header>
        <nav className={s.nav} aria-label="Main navigation">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                href={link.href}
                key={link.href}
                className={isActive ? s.active : undefined}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <main className={s.content} id="main-content" tabIndex={-1}>
        {children}
      </main>
      <footer className={`${s.content} ${s.siteFooter}`}>
        <span>
          © {new Date().getFullYear()} {siteConfig.name}
        </span>
        <div>
          <a href={siteConfig.social.github}>GitHub ↗</a>
          <a href={siteConfig.social.linkedin}>LinkedIn ↗</a>
          <Link href="/contact">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
export function PageIntro({
  title,
  eyebrow,
}: {
  title: string;
  eyebrow: string;
}) {
  return (
    <div className={s.intro}>
      <div>
        <p className={s.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
      </div>
      {siteConfig.isAvailable && (
        <span className={s.available}>
          <i /> Open to opportunities
        </span>
      )}
    </div>
  );
}
