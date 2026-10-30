"use client";
import { T, useLocale } from "@/app/components/LocaleProvider";
import { localePath, translate } from "@/lib/i18n";

import Link from "@/app/components/LocalizedLink";
import Image from "@/app/components/LocalizedImage";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { siteConfig } from "@/lib/config";
import { products } from "@/lib/store";
import GlobalSearch from "./GlobalSearch";
import s from "@/lib/styles";
import headerStyles from "./SiteShell.module.css";
export default function SiteShell({ children }: { children: ReactNode }) {
  const rawPathname = usePathname();
  const pathname = rawPathname.replace(/^\/(id|en)(?=\/|$)/, "") || "/";
  const locale = useLocale();
  const isArticle = /^\/blog\/[^/]+\/?$/.test(pathname);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const active = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!nav || !active || nav.scrollWidth <= nav.clientWidth) return;
    const item = active.getBoundingClientRect();
    const container = nav.getBoundingClientRect();
    if (item.left < container.left || item.right > container.right) {
      nav.scrollLeft +=
        item.left - container.left - (nav.clientWidth - item.width) / 2;
    }
  }, [rawPathname]);
  const links = [
    { href: "/", label: locale === "id" ? "Beranda" : "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About me" },
    {
      href: "/services",
      label: locale === "id" ? "Kolaborasi" : "Collaboration",
    },
    ...(products.length ? [{ href: "/store", label: "Store" }] : []),
    { href: "/contact", label: "Contact" },
    { href: "/resume", label: "Resume" },
  ];
  return (
    <div className={s.page}>
      <a className={s.skip} href="#main-content">
        <T>Skip to content</T>
      </a>
      <div className={s.stickyHeader}>
        <header className={`${s.header} ${headerStyles.header}`}>
          <div className={headerStyles.identity}>
            <Link href="/" className={`${s.brand} ${headerStyles.brand}`}>
              <Image
                src="/kevin-mark.svg"
                alt=""
                width={36}
                height={36}
                className={s.brandMark}
                priority
              />
              <span className={headerStyles.wordmark}>{siteConfig.name}</span>
            </Link>
          </div>
          {siteConfig.hasGlobalSearch && products.length > 0 && (
            <GlobalSearch />
          )}
          <div className={headerStyles.actions}>
            <div
              className={`${s.languageSwitch} ${headerStyles.languageSwitch}`}
              aria-label={locale === "id" ? "Bahasa" : "Language"}
            >
              {(["id", "en"] as const).map((language) => (
                <a
                  key={language}
                  href={localePath(
                    isArticle && language === "en" ? "/blog" : pathname,
                    language,
                  )}
                  lang={language}
                  hrefLang={language}
                  aria-label={
                    language === "id" ? "Bahasa Indonesia" : "English"
                  }
                  aria-current={locale === language ? "true" : undefined}
                  onClick={(event) => {
                    event.currentTarget.href =
                      localePath(
                        isArticle && language === "en" ? "/blog" : pathname,
                        language,
                      ) +
                      window.location.search +
                      window.location.hash;
                  }}
                >
                  {language.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </header>
        <nav
          ref={navRef}
          className={`${s.nav} ${headerStyles.nav}`}
          aria-label={translate("Main navigation", locale)}
        >
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
                <T>{link.label}</T>
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
          © <T>{new Date().getFullYear()}</T> <T>{siteConfig.name}</T>
        </span>
        <div>
          <a href={siteConfig.social.github}>
            <T>GitHub ↗</T>
          </a>
          <a href={siteConfig.social.linkedin}>
            <T>LinkedIn ↗</T>
          </a>
          <Link href="/contact">
            <T>Contact</T>
          </Link>
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
        <p className={s.eyebrow}>
          <T>{eyebrow}</T>
        </p>
        <h1>
          <T>{title}</T>
        </h1>
      </div>
      {siteConfig.isAvailable && (
        <span className={s.available}>
          <i /> <T>Open to opportunities</T>
        </span>
      )}
    </div>
  );
}
