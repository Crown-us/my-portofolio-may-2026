import { siteConfig } from "./config.ts";
import { translate, type Locale } from "./i18n.ts";

export function whatsappLink(number: string, message: string) {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function orderLink(locale: Locale, packageTitle?: string) {
  const message = packageTitle
    ? translate(
        "Hi Kevin, I'm interested in the {package} package.",
        locale,
      ).replace("{package}", translate(packageTitle, locale))
    : translate("Hi Kevin, I'd like to order a website.", locale);
  return whatsappLink(siteConfig.whatsapp, message);
}
