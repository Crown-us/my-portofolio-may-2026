"use client";
import Image from "next/image";
import type { ComponentProps } from "react";
import { translate } from "@/lib/i18n";
import { useLocale } from "./LocaleProvider";
export default function LocalizedImage({
  alt,
  ...props
}: ComponentProps<typeof Image>) {
  return <Image {...props} alt={translate(alt, useLocale())} />;
}
