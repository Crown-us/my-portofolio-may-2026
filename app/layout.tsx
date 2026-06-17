import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kevin Dwi Wijaya | Creative Developer & UI/UX",
  description: "Flutter · Next.js · Laravel developer membangun pengalaman digital yang premium, interaktif, dan bertenaga tinggi.",
};

import { ThemeProvider } from "./components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="antialiased selection:bg-foreground selection:text-background" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="grain" aria-hidden="true" />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
