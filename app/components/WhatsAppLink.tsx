"use client";
import type { ReactNode } from "react";
import { orderLink } from "@/lib/whatsapp";
import { useLocale } from "./LocaleProvider";

export default function WhatsAppLink({
  children,
  className,
  packageSlug,
  packageTitle,
}: {
  children: ReactNode;
  className?: string;
  packageSlug?: string;
  packageTitle?: string;
}) {
  const locale = useLocale();
  return (
    <a
      className={className}
      href={orderLink(locale, packageTitle)}
      target="_blank"
      rel="noopener noreferrer"
      data-umami-event="contact-whatsapp"
      data-umami-event-package={packageSlug}
    >
      {children}
    </a>
  );
}
