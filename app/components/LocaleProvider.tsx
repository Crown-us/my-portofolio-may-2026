"use client";
import { createContext, useContext, type ReactNode } from "react";
import { translate, type Locale } from "@/lib/i18n";
const LocaleContext = createContext<Locale>("id");
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}
export function useLocale() {
  return useContext(LocaleContext);
}
export function PostDate({ value }: { value: string }) {
  const locale = useLocale();
  return (
    <>
      {new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(`${value}T00:00:00Z`))}
    </>
  );
}
export function T({ children }: { children: ReactNode }) {
  const locale = useLocale();
  return (
    <>{typeof children === "string" ? translate(children, locale) : children}</>
  );
}
