import localFont from "next/font/local";

// Disimpan di repo supaya build tidak bergantung pada Google Fonts.
export const plusJakartaSans = localFont({
  src: "./plus-jakarta-sans-latin.woff2",
  variable: "--font-space",
  weight: "400 800",
  display: "swap",
});

export const jetbrainsMono = localFont({
  src: "./jetbrains-mono-latin.woff2",
  variable: "--font-mono",
  weight: "400 700",
  display: "swap",
});
