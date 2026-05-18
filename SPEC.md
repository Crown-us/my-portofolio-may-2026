# Technical Specification: Portofolio Pemula

Dokumen ini berisi spesifikasi teknis dan arsitektur proyek untuk referensi pengembang (manusia atau AI).

## 🚀 Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll:** [Lenis](https://lenis.darkroom.engineering/)
- **Theming:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Utilities:** `clsx`, `tailwind-merge`

## 🏗️ Architecture

Proyek ini menggunakan struktur standar Next.js App Router:

- `/app`: Root layout, global styles, dan halaman utama.
- `/app/components`: Komponen UI yang reusable (Navbar, Hero, dll).
- `/app/hooks`: Custom React hooks (misal: `useSound`).
- `/app/works/[slug]`: Halaman dinamis untuk detail proyek.
- `/lib`: Data statis dan fungsi utility.
- `/public`: Aset statis seperti gambar, ikon, dan audio.

## ✨ Fitur Utama

1. **Custom Cursor:** Kursor interaktif yang berubah saat hover element tertentu.
2. **Smooth Scrolling:** Menggunakan Lenis untuk pengalaman scrolling yang premium.
3. **Magnetic Effect:** Efek tarikan magnet pada elemen tombol/navigasi.
4. **Preloader:** Animasi loading awal yang estetik.
5. **Theme Toggle:** Dukungan Dark Mode dan Light Mode yang smooth.
6. **Responsive Design:** Dioptimalkan untuk perangkat mobile dan desktop.
7. **Sound Effects:** Integrasi audio ringan untuk interaksi user.

## 🛠️ Development Guidelines

- **Naming Convention:** PascalCase untuk komponen (`Hero.tsx`), camelCase untuk file fungsi.
- **Styling:** Gunakan utility classes Tailwind 4 sebanyak mungkin. Hindari CSS mentah kecuali sangat diperlukan.
- **Performance:** Gunakan `"use client"` secara spesifik pada komponen yang memerlukan interaktivitas untuk optimasi SSR.
- **Accessibility:** Pastikan elemen interaktif memiliki tag yang tepat dan navigasi keyboard yang memadai.
