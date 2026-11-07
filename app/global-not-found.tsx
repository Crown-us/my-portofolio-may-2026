import type { Metadata } from "next";
import Link from "next/link";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import s from "@/lib/styles";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan — Kevin Dwi Wijaya",
  robots: { index: false, follow: false },
};

// Unmatched paths never reach app/[locale], so this file supplies its own
// document shell. Copy is Indonesian because that is the default locale.
export default function GlobalNotFound() {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <main className={s.globalNotFound}>
          <p className={s.eyebrow}>404</p>
          <h1>Halaman ini tidak ada.</h1>
          <p>Tautannya mungkin rusak, atau halamannya sudah dipindah.</p>
          <div className={s.noticeActions}>
            <Link className={s.button} href="/id">
              Kembali ke Jelajahi
            </Link>
            <Link className={s.textLink} href="/id/projects">
              Lihat proyek ↗
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
