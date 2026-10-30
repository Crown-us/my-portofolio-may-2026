"use client";
import Link from "next/link";
import type { ComponentProps } from "react";
import { localePath, type Locale } from "@/lib/i18n";
import { useLocale } from "./LocaleProvider";
export default function LocalizedLink({
  href,
  contentLocale,
  ...props
}: ComponentProps<typeof Link> & { contentLocale?: Locale }) {
  const locale = useLocale();
  return (
    <Link
      {...props}
      href={
        typeof href === "string"
          ? localePath(href, contentLocale ?? locale)
          : href
      }
    />
  );
}
