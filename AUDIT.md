# Audit kvndwi.com

Tanggal: **30 Oktober 2026 (Asia/Jakarta)**. Mode: **audit saja**; tidak ada perbaikan kode atau publikasi.

## Scope dan dasar bukti

- Project: situs pribadi Kevin Dwi Wijaya; Next.js App Router, React, TypeScript. Target: pembaca tech/AI, rekruter, calon kolaborator. Tujuan: pembaca blog mengenal Kevin dan bisa melihat karya/pengalaman atau menghubungi.
- Audit kode dibatasi **15 file kunci**: layout locale, beranda, SiteShell, SEO, robots, sitemap, next.config, vercel.json, route kontak, contact-server, detail artikel, domain, portfolio.module.css, Analytics, config. Pencarian/range terarah; tidak membaca node_modules, .next, dist, vendor, lockfile, atau asset binary.
- Live diperiksa: `/id`, `/en`, `/id/services`, `/id/blog`, `/en/blog/chatgpt-icloud-mail-calendar`, URL 404 contoh, sitemap, robots; form kontak diperiksa lewat DOM tanpa dikirim. Visual beranda diperiksa desktop dan viewport **390 × 844**.
- **Penting:** working tree punya perubahan lokal belum di-commit. Bug import layout di bawah berasal dari perubahan lokal itu; **bukan bukti situs live sedang rusak**. HEAD saat audit: `8b93563`.
- Label: **[FAKTA]** terbukti dari kode/HTTP/DOM; **[ESTIMASI]** dampak atau perkiraan kerja yang belum diukur; **[OPINI]** penilaian desain/editorial. P1 = segera; P2 = berikutnya; P3 = penyempurnaan.

## 1. Desain dan UI/UX

| # | Masalah | Bukti (path:baris / ukuran) | Dampak | Prioritas (P1-P3) | Fix singkat |
|---|---|---|---|---|---|
| 1 | **[FAKTA] Kontras CTA utama rendah.** Warna teks aktual `rgb(32,33,36)`, background `rgb(25,103,210)`, teks 13px; rasio luminans terhitung **3,0:1**. | Live `/id`, link “Jelajahi karya”; aturan pewarisan `app/portfolio.module.css:16`, CTA `app/[locale]/page.tsx:120`. | Teks tombol sulit dibaca; di bawah ambang 4,5:1 untuk teks normal. | **P1** | Pastikan warna putih pada CTA menang terhadap selector `.page a`; cek computed style sesudahnya. |
| 2 | **[FAKTA] Artikel terbaru tampil dua kali di beranda.** Spotlight mengambil item pertama dari array yang kemudian dipakai lagi sebagai daftar artikel. | `app/[locale]/page.tsx:110`, `app/[locale]/page.tsx:111`, `app/[locale]/page.tsx:169`. | **[OPINI]** Pengunjung melihat konten yang sama saat baru mulai menggulir; isi terasa lebih sedikit. | P2 | Kecualikan artikel spotlight dari daftar bawah atau tampilkan dua artikel berikutnya bila tersedia. |
| 3 | **[FAKTA] Sebagian navigasi mobile tersembunyi secara horizontal.** Lebar nav 375px, isi 454px; Kontak/CV di luar tampilan awal. | Live `/id` pada 390px; daftar menu `app/components/SiteShell.tsx:31`. Tinggi tautan terukur 44px. | **[ESTIMASI]** Pengguna yang tidak mencoba menggeser bisa melewatkan kontak/CV. Bukan overflow seluruh halaman. | P2 | Beri petunjuk geser yang jelas atau tombol menu tambahan untuk item yang tidak terlihat. |
| 4 | **[FAKTA] 404 live masih halaman default berbahasa Inggris.** HTTP 404 dan noindex benar, tetapi judul “404: This page could not be found.” | GET `https://kvndwi.com/id/no-such-audit-page`; konfigurasi custom 404 hanya ada dalam perubahan lokal `next.config.ts:4`. | **[OPINI]** Jalan buntu terasa terputus dari identitas dan bahasa situs. | P3 | Tinjau perubahan custom 404 yang masih lokal; berikan tautan Blog/Beranda setelah validasi build. |
| 5 | **[OPINI] Visual rapi tetapi identitas editorial masih generik.** Hero didominasi ilustrasi produk AI, bukan ciri atau aktivitas Kevin. | Visual desktop/mobile live `/id`; slot sampul `app/[locale]/page.tsx:130`. | **[ESTIMASI]** Pengunjung lebih mudah mengingat topik AI daripada penulisnya. | P3 | Pertahankan layout; tambahkan konteks editorial khas Kevin secara konkret, bukan dekorasi tambahan. |

## 2. Sistem dan teknis

| # | Masalah | Bukti (path:baris / ukuran) | Dampak | Prioritas (P1-P3) | Fix singkat |
|---|---|---|---|---|---|
| 1 | **[FAKTA] Layout lokal memanggil `notFound()` tanpa import.** Yang diimpor justru `redirect`, tidak dipakai. Diff menunjukkan HEAD sebelumnya mengimpor `notFound` dengan benar. | `app/[locale]/layout.tsx:1`, `app/[locale]/layout.tsx:50`; `git diff` saat audit. | **[ESTIMASI]** Build/typecheck berikutnya akan gagal atau jalur locale invalid memicu ReferenceError. Build tidak dijalankan. | **P1** | Kembalikan import `notFound`; tinjau perubahan lokal sebelum commit. |
| 2 | **[FAKTA] Rate limit kontak disimpan di Map proses.** Jika `CONTACT_TRUSTED_IP_HEADER` tidak diatur, semua pengguna memakai key `shared`; limit default 5/10 menit. | `lib/contact-server.ts:3`, `lib/contact-server.ts:4`; `app/api/contact/route.ts:16`. | **[ESTIMASI]** Limit tidak konsisten antar-instance/restart; konfigurasi default dapat membatasi lima pengiriman gabungan seluruh pengunjung. ENV production tidak diperiksa. | P2 | Pastikan header IP tepercaya sesuai deployment; gunakan penyimpanan rate limit bersama bila trafik membutuhkannya. |
| 3 | **[FAKTA] Tidak ada Content-Security-Policy pada respons live yang diperiksa.** Header nosniff, DENY, HSTS sudah ada. | HTTP `/id` dan halaman sampel; daftar header `vercel.json:5`. | **[ESTIMASI]** Pertahanan tambahan terhadap injeksi konten/script belum tersedia; ini bukan bukti ada XSS yang dapat dieksploitasi. | P3 | Mulai dari CSP Report-Only yang kompatibel dengan Next dan analytics, lalu evaluasi sebelum enforce. |
| 4 | **[FAKTA] Font monospace disiapkan global; body situs memakai Arial.** Beranda memuat dua preload font. | `app/[locale]/layout.tsx:19`, `app/portfolio.module.css:5`; DOM live `/id`: dua `link[as=font]`. | **[ESTIMASI]** Ada peluang mengurangi resource font pada halaman tanpa kode. Besar transfer dan pengaruh LCP tidak diukur. | P3 | Cek kebutuhan JetBrains Mono per halaman; batasi pemuatan bila memang tidak dipakai. |

Catatan keamanan yang lolos pemeriksaan terbatas: konfigurasi API key memakai ENV, bukan literal di file kontak; input divalidasi; stream body dibatasi 32.000 byte; pengiriman email punya timeout. Bukti: `app/api/contact/route.ts:25`, `app/api/contact/route.ts:35`, `app/api/contact/route.ts:50`, `lib/domain.ts:134`, `lib/contact-server.ts:40`. Pencarian pola key pada empat file konfigurasi/server/analytics tidak menemukan kecocokan; **bukan pemindaian seluruh repository atau riwayat Git**.

## 3. SEO

| # | Masalah | Bukti (path:baris / ukuran) | Dampak | Prioritas (P1-P3) | Fix singkat |
|---|---|---|---|---|---|
| 1 | **[FAKTA] Artikel `/en` masih berisi Bahasa Indonesia tetapi punya canonical sendiri dan hreflang en.** Shell Inggris tidak sama dengan terjemahan artikelnya. | `app/[locale]/blog/[slug]/page.tsx:62`, `app/[locale]/blog/[slug]/page.tsx:103`; `lib/seo.ts:24`, `lib/seo.ts:27`; live `/en/blog/chatgpt-icloud-mail-calendar`. | **[ESTIMASI]** Sinyal bahasa/duplikasi membingungkan; Google bisa memilih URL utama berbeda dari yang diharapkan. Tidak ada bukti penalti. | P2 | Putuskan URL utama untuk artikel Indonesia; gunakan hreflang en hanya untuk konten terjemahan sungguhan, atau terjemahkan artikel. |
| 2 | **[FAKTA] Schema BlogPosting belum menyertakan gambar; OG artikel masih `website`.** Sampul artikel ada di halaman tetapi tidak dalam JSON-LD. | `app/[locale]/blog/[slug]/page.tsx:133`, `lib/seo.ts:64`; respons live artikel: `image` tidak ada pada BlogPosting. | **[ESTIMASI]** Metadata artikel kurang lengkap untuk pemahaman mesin pencari dan pembagian tautan; bukan jaminan perubahan ranking. | P2 | Tambahkan image absolut ke BlogPosting dan OG type article dengan tanggal publikasi/pembaruan yang benar. |
| 3 | **[FAKTA] Metadata beranda masih fokus profesi developer; tidak menyebut isi blog.** Beranda memakai deskripsi fallback. | `app/[locale]/page.tsx:13`, `lib/seo.ts:52`, `lib/domain.ts:2`; live `/id` meta description. | **[OPINI]** Cuplikan pencarian belum mewakili arah situs yang sekarang juga editorial tech/AI. | P2 | Buat title/description beranda yang menyebut Kevin, karya, dan tulisan AI secara spesifik; tidak menumpuk keyword. |
| 4 | **[FAKTA] Sitemap tidak membawa lastmod walau artikel mendukung tanggal pembaruan.** | `app/sitemap.ts:13`; GET `/sitemap.xml`: **26 URL**, tanpa elemen `lastmod`. | **[ESTIMASI]** Pembaruan artikel tidak disampaikan lewat sitemap. Sitemap tetap valid tanpa lastmod. | P3 | Isi lastmod artikel dari tanggal pembaruan aktual atau publikasi; jangan ganti semua tanggal setiap build. |

Dasar SEO yang terkonfirmasi: HTTP 200 halaman sampel, satu H1 per halaman sampel, canonical locale sesuai URL, robots mengizinkan crawl dan mencantumkan sitemap, 404 diberi noindex, draft tidak tercantum dalam sitemap yang diperiksa. OG/Twitter tersedia melalui `lib/seo.ts:60` dan `lib/seo.ts:67`. Cover dengan alt kosong pada link editorial tidak otomatis menjadi masalah karena judul sudah menyediakan nama link; tidak diberi temuan alt palsu.

## 4. Copywriting

| # | Masalah | Bukti (path:baris / ukuran) | Dampak | Prioritas (P1-P3) | Fix singkat |
|---|---|---|---|---|---|
| 1 | **[OPINI] Headline beranda terlalu luas.** “Bikin teknologi lebih dekat dengan keseharian” tidak langsung memberi alasan memilih tulisan/karya Kevin. | `app/[locale]/page.tsx:68`; padanan EN `app/[locale]/page.tsx:26`. | Pengunjung harus membaca paragraf berikutnya untuk memahami kemampuan dan fokus konten. | P2 | Nyatakan dua hal konkret: developer web/mobile dan penjelasan AI untuk pengguna sehari-hari. |
| 2 | **[FAKTA] CTA utama menuju proyek, sedangkan blog baru jadi prioritas pertumbuhan.** Tombol sekunder menuju Tentang. | `app/[locale]/page.tsx:119`, `app/[locale]/page.tsx:124`. | **[OPINI]** Hierarki aksi belum mengikuti fokus blog yang disepakati, walau artikel unggulan dapat diklik. | P2 | Tentukan satu aksi utama sesuai tujuan; bila blog diprioritaskan, uji “Baca artikel” dengan karya sebagai sekunder. |
| 3 | **[OPINI] Banyak ajakan berulang tanpa konteks baru.** Tentang/proyek/CV ditawarkan di hero, kartu kebutuhan, lalu area penutup. | `app/[locale]/page.tsx:119`, `app/[locale]/page.tsx:80`, `app/[locale]/page.tsx:216`. | Halaman terasa seperti beberapa menu masuk yang mirip, bukan alur editorial yang berkembang. | P3 | Pertahankan jalur kebutuhan, ringkas penutup menjadi satu ajakan kontak yang jelas. |
| 4 | **[OPINI] Bukti kemampuan tidak terlihat di layar pertama.** Yang tampil: perkenalan umum + sampul berita AI; pengalaman/karya memerlukan navigasi lain. | Live `/id` desktop; hero `app/[locale]/page.tsx:114`; deskripsi `app/[locale]/page.tsx:69`. | Rekruter belum langsung mendapat bukti pendukung klaim developer. | P2 | Tambahkan satu kalimat pengalaman/tautan karya yang dapat diverifikasi. Jangan mengarang angka pengguna, hasil bisnis, atau testimoni. |

## Pengukuran performa

- **Lighthouse: tidak diukur.** Satu percobaan `npx --no-install lighthouse ... --output=json --quiet --chrome-flags="--headless"` gagal: dependency tidak tersedia lokal dan registry `registry.npmmirror.com` menghasilkan ENOTFOUND. Tidak diulang atau menginstal paket.
- Skor Performance/Accessibility/Best Practices/SEO Lighthouse, **LCP, CLS, TBT: tidak diukur**. Lima audit Lighthouse gagal teratas: **tidak tersedia**. Angka di bawah adalah penilaian auditor, bukan skor Lighthouse.
- Core Web Vitals lapangan/CrUX: tidak diukur. Analytics kode menyetel performance tracking false (`app/components/Analytics.tsx:28`); ini juga bukan bukti tersedia data CWV di tempat lain.
- HTTP beranda `/id`: **42.181 byte HTML decoded** pada respons audit. Bukan ukuran bundle, bukan total transfer halaman, bukan waktu muat.
- DOM beranda mobile: lebar dokumen **375px** dalam viewport **390px** (terdapat gutter scrollbar), tidak ada overflow halaman horizontal; gambar rusak terdeteksi **0** pada observasi tersebut. Tidak menjamin seluruh halaman/perangkat bebas masalah.

## Skor auditor

| Kategori | Skor | Alasan |
|---|---|---|
| Desain & UI/UX | **6,5/10 [OPINI]** | Struktur cukup terbaca, tetapi CTA utama punya masalah kontras nyata dan navigasi mobile menyembunyikan jalur penting. |
| Sistem/teknis | **5,5/10 [OPINI]** | Proteksi dasar kontak ada, tetapi working tree punya bug import yang berisiko menghambat build; performa belum bisa dinilai. Skor mencakup kondisi lokal, bukan penilaian uptime live. |
| SEO | **7/10 [OPINI]** | Fondasi indeks/canonical berjalan; bahasa artikel ganda dan kelengkapan metadata artikel perlu dirapikan. |
| Copywriting | **6,5/10 [OPINI]** | Pembaca bisa memahami isi setelah membaca, tetapi headline, CTA utama, dan ajakan berulang belum memberikan fokus yang tajam. |

## Top 5 quick wins

**[ESTIMASI] Total kerja inti sekitar 45–55 menit**, di luar antrean deployment dan verifikasi menyeluruh:

1. **Kembalikan import `notFound` di layout lokal** — 2–5 menit; P1, cegah regresi build.
2. **Betulkan warna teks CTA utama** — 5–10 menit; P1, konfirmasi computed contrast setelahnya.
3. **Keluarkan spotlight dari daftar artikel bawah** — 5–10 menit; P2, hilangkan pengulangan yang terlihat jelas.
4. **Lengkapi gambar BlogPosting dan OG type article** — 10–15 menit; P2, manfaatkan cover yang sudah tersedia.
5. **Pertajam headline/description dan pilih satu CTA utama sesuai fokus blog** — 10–15 menit; P2, tanpa merombak layout.

## Yang tidak bisa dinilai dari bukti tersedia

- Trafik, konversi, bounce rate, ranking keyword, status indeks semua URL, atau keberhasilan bisnis: tidak membaca dashboard Search Console/analytics dalam audit ini.
- Performa Lighthouse, LCP/CLS/TBT, CWV lapangan, ukuran JS bundle, waterfall jaringan, dan performa perangkat lambat.
- Keberhasilan pengiriman kontak, konfigurasi ENV production, konfigurasi proxy/IP, biaya/ketersediaan email: form sengaja tidak dikirim.
- Audit keamanan penuh, dependency/CVE, secret di riwayat Git atau file yang tidak dibaca, aturan provider dan IAM. Tidak ada klaim situs sepenuhnya aman.
- Semua kombinasi keyboard/screen reader/kontras: focus style tersedia (`app/portfolio.module.css:27`), input/select/textarea form live punya label, tetapi audit aksesibilitas lengkap belum dilakukan.
- Seluruh halaman, perangkat, dan browser: observasi responsif dibatasi beranda pada 390px; tidak menyimpulkan seluruh situs responsif sempurna.
- Kebenaran seluruh isi berita dan hak lisensi aset: tidak melakukan pemeriksaan editorial atau lisensi terpisah.

**Tidak ada temuan yang diperbaiki dalam audit ini. Hanya file laporan AUDIT.md yang dibuat.**
