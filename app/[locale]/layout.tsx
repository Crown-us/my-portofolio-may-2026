import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n";
import { LocaleProvider } from "@/app/components/LocaleProvider";
import type { Metadata } from "next";
import Analytics from "@/app/components/Analytics";
import { buildSeo } from "@/lib/seo";
import { jetbrainsMono, plusJakartaSans } from "@/app/fonts";
import "@/app/globals.css";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  ...buildSeo(siteConfig.seo.title, "/", siteConfig.seo.description),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  metadataBase: new URL(siteConfig.seo.url),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html
      lang={locale === "en" ? "en" : "id"}
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <LocaleProvider locale={locale}>{children}</LocaleProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
