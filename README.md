# Kevin Dwi Wijaya - Portfolio

Portfolio personal dengan tampilan ringan bergaya app store: navigasi sticky, kartu pastel, proyek, pengalaman, layanan, dan Blog.

**Website:** [kvndwi.com](https://kvndwi.com)  
**Repository:** [Crown-us/my-portofolio-may-2026](https://github.com/Crown-us/my-portofolio-may-2026)

## Mulai lokal

Gunakan Node.js 22.18+ (disarankan Node 24) dan npm.

```sh
npm ci
npm run dev -- --hostname 127.0.0.1 --port 3001
```

Buka [localhost:3001](http://127.0.0.1:3001/). Untuk preview production, hentikan server proyek yang sedang memakai port itu, lalu:

```sh
npm run build
npm start -- --hostname 127.0.0.1 --port 3001
```

Build memakai webpack karena sebelumnya ada masalah cache font pada Turbopack di lingkungan lokal. `next/font` membutuhkan akses Google Fonts saat build.

## Stack

Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS 4, CSS Modules, dan Lucide. Blog memakai gray-matter serta unified/remark/rehype untuk membaca Markdown, sanitasi HTML, dan syntax highlighting di server. Parser tidak dikirim ke browser.

Animasi lama Framer Motion, Lenis, musik latar, dan dependensi utilitas yang tidak dipakai sudah dibuang.

## Halaman

| Route                                     | Isi                                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------------------ |
| `/`                                       | Discover: proyek pilihan, preview layanan, CTA kontak                                |
| `/projects`                               | Katalog proyek dengan filter kategori                                                |
| `/projects/[slug]`                        | Detail proyek, stack, screenshot dan bagian case study yang sudah terisi             |
| `/about`, `/resume`                       | Profil, tiga pengalaman magang, dan skills dari data yang sama                       |
| `/services`                               | Empat layanan, harga mulai, estimasi waktu, alur kerja dan FAQ                       |
| `/contact`                                | Form kontak, WhatsApp dan email langsung                                             |
| `/blog`, `/blog/[slug]`                   | Daftar artikel dan detail Markdown; artikel edukasi pertama sudah tersedia di source          |
| `/store`, `/store/[slug]`                 | Siap untuk produk digital; saat data kosong, route 404 dan navigasinya disembunyikan |
| `/rss.xml`, `/sitemap.xml`, `/robots.txt` | Feed artikel dan metadata mesin pencari                                              |

Link lama `/works/[slug]` redirect permanen ke `/projects/[slug]`. Slug tidak dikenal mengembalikan 404. Global search masih dinonaktifkan; tersedia jika flag diaktifkan dan ada produk untuk pencarian lintas konten. Terjemahan ID/EN belum dibuat.

## Struktur dan edit konten

```text
app/                 Halaman, API, komponen dan CSS
lib/                 Data typed serta helper
content/blog/        File Markdown artikel dan template
public/              Logo, ikon dan aset konten
tests/              Tes unit serta smoke test HTTP
```

| File              | Yang diubah di sini                                           |
| ----------------- | ------------------------------------------------------------- |
| `lib/config.ts`   | Nama, kontak, sosial, availability dan flag search            |
| `lib/projects.ts` | Proyek, featured flag, screenshot, stack, case study dan link |
| `lib/about.ts`    | Bio, pengalaman, foto, sertifikasi dan CV                     |
| `lib/services.ts` | Layanan, harga, estimasi, workflow dan FAQ                    |
| `lib/store.ts`    | Produk asli dan checkout URL                                  |
| `lib/seo.ts`      | Judul, deskripsi, canonical dan metadata sosial               |
| `lib/styles.ts`   | Gabungan class CSS Modules yang dipakai bersama               |

Dokumen pendamping:

- [CONTENT_TODO.md](CONTENT_TODO.md): formulir untuk melengkapi konten.
- [AI_HANDOFF.md](AI_HANDOFF.md): konteks singkat untuk AI/developer yang melanjutkan pekerjaan.

Konten pribadi dan hasil proyek harus berdasarkan data asli. Bagian yang belum terisi disembunyikan. Foto profil, CV PDF, detail BNSP, sebagian case study, produk Store dan tulisan Blog berikutnya masih perlu dilengkapi. Data magang serta harga/estimasi layanan sudah ada; perbarui di file data jika berubah.

## Menambah artikel

Salin `content/blog/post.md.example` menjadi file `.md`, lalu ganti seluruh isi template dengan tulisan asli.

```yaml
---
title: "Judul artikel asli"
slug: "judul-artikel"
date: "2026-10-28"
summary: "Ringkasan singkat artikel"
tags: ["web"]
draft: true
# coverImage: "/images/blog/cover.png"
---
```

Tanggal memakai format YYYY-MM-DD; tanggal YAML tanpa tanda kutip dari CMS juga diterima. Slug harus unik. Cover memakai file lokal di `public/`. Draft hanya terlihat saat development; production, RSS dan sitemap mengecualikannya. Ubah `draft: false` untuk menerbitkan tulisan, lalu rebuild/deploy.

Blog mendukung filter tag, urutan terbaru, waktu baca, daftar isi, heading anchors, syntax highlighting dan navigasi antarartikel. HTML mentah dibuang dan protokol link berbahaya disaring. File `.example` tidak diterbitkan.

## Store

Tambahkan produk yang sudah selesai ke `lib/store.ts`. Checkout hanya berupa link HTTPS ke Gumroad, Trakteer atau Lynk.id; situs ini tidak memproses pembayaran atau mengirim file produk.

Slug dan URL checkout divalidasi. Harga produk `null` ditampilkan sebagai **Free**; harga layanan `null` berarti **Contact for quote**. Gunakan gambar lokal. Deskripsi produk mendukung Markdown dasar yang aman.

## Konfigurasi kontak

Salin `.env.example` ke `.env.local`. Jangan commit kredensial.

| Variabel                    | Kegunaan                                                      |
| --------------------------- | ------------------------------------------------------------- |
| `RESEND_API_KEY`            | API key server-only untuk Resend                              |
| `CONTACT_FROM_EMAIL`        | Sender dari domain terverifikasi di Resend                    |
| `CONTACT_TO_EMAIL`          | Inbox penerima pesan                                          |
| `CONTACT_TRUSTED_IP_HEADER` | Opsional: header IP yang ditimpa oleh proxy hosting tepercaya |

Form memakai `/api/contact` dengan validasi bersama, honeypot, pemeriksaan origin, batas payload 32 KB dan lima percobaan per sepuluh menit. Pesan dikirim sebagai plain text. Respons sukses membutuhkan receipt dari Resend, bukan jaminan pesan masuk inbox. Tanpa konfigurasi, server mengembalikan 503 dan pengguna dapat memakai WhatsApp/email langsung.

Rate limiter berada di memori setiap proses. Jika header IP tidak diatur, limit dibagi bersama. Untuk production multi-instance/serverless, gunakan limiter bersama atau WAF hosting. Jangan mempercayai header IP yang bisa dipalsukan klien.

## SEO dan analytics

Canonical memakai `https://kvndwi.com`. OG default tersedia di `/opengraph-image`; proyek/produk memakai gambar masing-masing. Structured data tersedia pada profil, proyek, produk dan artikel.

Umami opsional memakai `NEXT_PUBLIC_UMAMI_WEBSITE_ID` dan `NEXT_PUBLIC_UMAMI_SCRIPT_URL` (HTTPS), diisi sebelum build. Script hanya dimuat dalam production di `kvndwi.com`/`www.kvndwi.com`, bukan localhost. Tracking dibatasi ke pageview dan klik CTA kontak, beli, serta unduh CV; query/hash dan isian form tidak dilacak.

## Pemeriksaan seperlunya

Tidak perlu menjalankan seluruh pemeriksaan untuk setiap edit konten atau kosmetik. Pilih sesuai risiko perubahan:

```sh
npm test                 # Logika: validator, Markdown, kontak, metadata
npm run typecheck        # Perubahan tipe/struktur kode
npm run lint             # Pemeriksaan kode
npm run format:check     # Format
npm run test:smoke       # Route/API; server localhost harus berjalan
npm run build            # Sebelum rilis atau perubahan integrasi besar
```

Tes email menggunakan mock dan tidak mengirim pesan nyata. `npm run format` merapikan source dan dokumen utama.

## Catatan folder

`.next/`, `node_modules/`, file `.env.local`, log preview, dan cache TypeScript adalah file lokal yang diabaikan Git. Log preview aktif dipertahankan agar proses yang berjalan tidak terganggu. Aset konten asli yang belum dipasang tetap disimpan; screenshot preview lama, gambar duplikat, ikon starter, audio lama dan dokumentasi template yang sudah kedaluwarsa dibuang.

Perubahan cleanup lokal tidak otomatis melakukan push atau deployment.


## Menulis lewat Pages CMS (tanpa ngoding)

Konfigurasi `.pages.yml` menyediakan form artikel dan upload gambar, tanpa database atau dependency tambahan. Mengikuti [dokumentasi Pages CMS](https://pagescms.org/docs/quick-start/).

1. Buka https://app.pagescms.org dan login GitHub.
2. Saat diminta, install GitHub App Pages CMS dan berikan akses ke repository `Crown-us/my-portofolio-may-2026`.
3. Pilih repository tersebut dan branch `main`, lalu buka **Artikel Blog**.
4. Buat artikel: isi judul, alamat artikel (slug unik), tanggal, ringkasan, tag, cover opsional, dan isi. Upload gambar disimpan di `public/images/blog`.
5. Biarkan **Simpan sebagai draft** aktif selama menulis. Draft tidak muncul di situs production, tetapi file tetap tersimpan di repository; jangan isi data rahasia.
6. Untuk menerbitkan, matikan draft lalu simpan. Pages CMS membuat commit; integrasi GitHub–Vercel yang sudah ada akan menjalankan deploy. Tunggu deploy sukses sebelum mengecek situs.

Tanggal hanya metadata, bukan penjadwalan otomatis. Pertahankan slug artikel yang sudah terbit agar link lama tetap berfungsi. Untuk berita AI, tulis tanggal pengecekan dan tautan sumber resmi langsung di isi artikel. Cover landscape WebP sekitar 1400 px sudah cukup; CMS tidak otomatis mengompres gambar.

Setup repository tidak otomatis menghubungkan akun GitHub: login dan pemasangan aplikasi dilakukan pemilik akun. Setelah mengedit melalui CMS, jalankan `git pull --ff-only` sebelum melanjutkan edit lokal. Jika deploy gagal, periksa log Vercel dan koreksi artikel melalui CMS.
