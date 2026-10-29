import translations from "./translations.json" with { type: "json" };
export type Locale = "id" | "en";
export const locales: Locale[] = ["id", "en"];
export function isLocale(value: string): value is Locale {
  return value === "id" || value === "en";
}
export function localePath(path: string, locale: Locale) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (/^\/(api|images|rss\.xml|opengraph-image)(\/|$|\?)/.test(path))
    return path;
  const clean = path.replace(/^\/(id|en)(?=\/|$|[?#])/, "");
  return `/${locale}${clean === "/" ? "" : clean}`;
}
const id = translations as Record<string, string>;
const en = Object.fromEntries(Object.entries(id).map(([a, b]) => [b, a]));
export function translate(text: string, locale: Locale): string {
  const trimmed = text.trim().replace(/\s+/g, " ");
  const result = (locale === "id" ? id : en)[trimmed];
  if (!result && trimmed.includes(" — Kevin Dwi Wijaya")) {
    return (
      translate(trimmed.replace(" — Kevin Dwi Wijaya", ""), locale) +
      " — Kevin Dwi Wijaya"
    );
  }
  if (!result && trimmed.includes(" / ")) {
    return trimmed
      .split(" / ")
      .map((part) => translate(part, locale))
      .join(" / ");
  }
  return result ? text.replace(text.trim(), result) : text;
}
