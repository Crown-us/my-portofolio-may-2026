# CONTENT_TODO — Isi Konten Portfolio

Lembar pertanyaan untuk mengisi konten yang sekarang kosong. Setiap bagian dipetakan langsung ke field di kode, jadi setelah dijawab tinggal dipindahkan tanpa ada data yang kepotong.

## Cara pakai

1. Jawab langsung di bawah tiap pertanyaan, di baris `>`.
2. **Tulis seadanya.** Bahasa campur, singkat, atau berantakan tidak masalah — nanti dirapikan.
3. Kalau memang belum ada, tulis `belum ada`. **Jangan dikarang** — lebih baik bagian itu tetap tersembunyi.
4. Isi yang bertanda **P1** dulu. P2 dan P3 menyusul.
5. Kalau sudah selesai, bilang ke aku — aku yang masukkan ke `lib/projects.ts`, `lib/about.ts`, dan `lib/services.ts`.

Prioritas: **P1** = wajib, dampak paling besar · **P2** = penting · **P3** = opsional.

---

# 1. PROFIL — P1

Target file: `lib/about.ts`, `lib/config.ts`

**1.1 Foto profil**
Simpan file di `public/images/profile/`, lalu tulis nama filenya.

> _(contoh: kevin.jpg)_

**1.2 CV / Resume PDF**
Simpan di `public/`, lalu tulis nama filenya. Kalau belum ada PDF-nya, tulis `belum ada`.

> _(contoh: cv-kevin-dwi-wijaya.pdf)_

**1.3 Bio singkat (2–4 kalimat)**
Sekarang isinya: _"I'm Kevin, a full-stack and mobile engineer based in Kediri, Indonesia..."_ — mau diubah? Kalau iya, tulis versi baru. Kalau sudah pas, tulis `sudah pas`.

> _(jawab di sini)_

**1.4 Status ketersediaan**
Sekarang `isAvailable: true`. Masih benar? Mau ada teks tambahan seperti "open for freelance" / "open to full-time"?

> _(jawab di sini)_

**1.5 Link sosial**
Cek apakah masih benar:
- GitHub: `https://github.com/Crown-us`
- LinkedIn: `https://www.linkedin.com/in/kevin-dwi-wijaya-95aa812b4`

> _(benar semua / koreksi di sini)_

---

# 2. PENGALAMAN — P1

Target file: `lib/about.ts` → `experience[]`
Sekarang **kosong**, jadi bagian pengalaman di halaman About dan Resume tidak muncul sama sekali.

Untuk **tiap** pengalaman (magang / kerja / organisasi), isi 5 hal:

```
Organisasi :
Posisi     :
Periode    : (contoh: Feb 2025 – Jun 2025)
Ringkasan  : (1–2 kalimat: kamu ngerjain apa)
Highlight  : (2–3 poin pencapaian konkret)
```

### 2.1 Pengalaman pertama

> _(isi di sini)_

### 2.2 Pengalaman kedua

> _(isi di sini)_

### 2.3 Pengalaman ketiga

> _(isi di sini)_

**2.4 Butuh lebih dari 3?** Tulis di sini.

> _(jawab di sini)_

---

# 3. SERTIFIKASI — P2

Target file: `lib/about.ts` → `certifications[]`

**3.1 Sertifikat BNSP**
- Nama sertifikasi (judul lengkap):
- Lembaga penerbit:
- Tahun:
- URL kredensial (kalau ada):

> _(isi di sini)_

**3.2 Sertifikat lain?** (Dicoding, Coursera, dll)

> _(isi di sini, atau "belum ada")_

---

# 4. PROJECT — P1

Target file: `lib/projects.ts` → `caseStudy`
Ini bagian **paling berpengaruh**. Sekarang semua project cuma punya judul, screenshot, dan tech stack. Halaman detailnya kosong di bawah itu.

Kerjakan satu per satu. Kalau ada pertanyaan yang tidak relevan, tulis `-`.

---

## 4.1 WESTUD LMS

`slug: lms-westud` · demo: lms-westud.vercel.app

**a. Masalah & pengguna**
Siapa yang pakai, dan masalah apa yang diselesaikan? Kenapa platform ini perlu ada?

> _(jawab di sini)_

**b. Peran kamu**
Kamu bikin semua sendiri, atau bagian tertentu? Kalau tim, kamu pegang apa?

> _(jawab di sini)_

**c. Timeline**
Berapa lama pengerjaan? Kapan mulai dan selesai?

> _(jawab di sini)_

**d. Ukuran tim**
Jumlah orang. Kalau solo, tulis `1`.

> _(jawab di sini)_

**e. Fitur utama (3–5)**
Format: `Nama fitur — kenapa penting`

> 1.
> 2.
> 3.

**f. Arsitektur**
Data mengalir bagaimana? Auth pakai apa? Kenapa pilih Supabase?

> _(jawab di sini)_

**g. Tantangan teknis (2–3)**
Format: `Masalahnya apa → cara kamu ngatasin`

> 1.
> 2.

**h. Hasil nyata**
Angka konkret **beserta sumbernya**. Kalau belum ada data, tulis `belum ada` — jangan dikarang.
Contoh: `Jumlah pengguna — 120 mahasiswa — data Supabase, Okt 2026`

> _(jawab di sini)_

**i. Stack — konfirmasi**
Sekarang tercatat: React 19, TypeScript, Vite, TanStack Router, Tailwind, Framer Motion, Three.js, Supabase.
Ada yang kurang/salah? Backend dan infra masih kosong — diisi apa?

> _(jawab di sini)_

**j. Link**
Demo: `lms-westud.vercel.app` · Repo: `github.com/Crown-us/lms-westud` — masih aktif?

> _(jawab di sini)_

---

## 4.2 SEGER MARKETPLACE

`slug: seger-marketplace` · demo: magang.kvndwi.my.id

**a. Masalah & pengguna**

> _(jawab di sini)_

**b. Peran kamu**

> _(jawab di sini)_

**c. Timeline**

> _(jawab di sini)_

**d. Ukuran tim**

> _(jawab di sini)_

**e. Fitur utama (3–5)**

> 1.
> 2.
> 3.

**f. Arsitektur**
Alur order → pembayaran Midtrans → status pesanan itu bagaimana?

> _(jawab di sini)_

**g. Tantangan teknis (2–3)**
Integrasi Midtrans biasanya paling banyak masalah — callback, signature, status gagal?

> 1.
> 2.

**h. Hasil nyata**

> _(jawab di sini)_

**i. Stack — konfirmasi**
Laravel 11, React, Inertia.js, TypeScript, Tailwind, Midtrans Snap, MySQL. Infra kosong — hosting di mana?

> _(jawab di sini)_

**j. Repo**
Sekarang kosong (private?). Mau ditampilkan atau tetap disembunyikan?

> _(jawab di sini)_

---

## 4.3 RTRW DIGITAL

`slug: rtrw-community-platform` · demo: personal-host-rt-rw-nu.vercel.app

**a. Masalah & pengguna**
Ini untuk RT/RW mana? Berapa jumlah warga yang dilayani?

> _(jawab di sini)_

**b. Peran kamu**

> _(jawab di sini)_

**c. Timeline**

> _(jawab di sini)_

**d. Ukuran tim**

> _(jawab di sini)_

**e. Fitur utama (3–5)**
Sekarang disebut: iuran otomatis, kas transparan, surat pengantar digital, pusat informasi.

> 1.
> 2.
> 3.

**f. Arsitektur**
Multi-tenant — satu instance untuk banyak RT atau satu per RT? OTP 2FA pakai apa?

> _(jawab di sini)_

**g. Tantangan teknis (2–3)**
Misal: rekonsiliasi pembayaran iuran, hak akses antar role, dsb.

> 1.
> 2.

**h. Hasil nyata**
Sudah dipakai warga beneran atau masih demo? Kalau ada angka, sebutkan sumbernya.

> _(jawab di sini)_

**i. Stack — konfirmasi**
Laravel 11, React, Inertia.js, TypeScript, Tailwind, MySQL, Shadcn UI. Infra kosong — diisi apa?

> _(jawab di sini)_

**j. Catatan kecil**
Field `impact` project ini pakai emoji (🏛️), dua project lain tidak. Mau diseragamkan?

> _(jawab di sini)_

---

## 4.4 Project keempat?

Handoff menyebut dulu ada 3 dummy project yang sudah dihapus. Kalau ada project nyata lain, tulis di sini — tapi **jangan** ditambah kalau isinya bakal lebih tipis dari tiga di atas.

> _(jawab di sini, atau "cukup 3 dulu")_

---

# 5. SERVICES — P2

Target file: `lib/services.ts`
Sekarang harga `null`, durasi kosong, `idealFor` kosong.

**5.1 Full-stack web development**
- Mulai dari harga berapa? (atau `project-based`)
- Estimasi durasi?
- Cocok untuk siapa? (UMKM, startup, instansi?)

> _(jawab di sini)_

**5.2 Cross-platform mobile apps (Flutter)**

> _(jawab di sini)_

**5.3 Backend & API engineering**

> _(jawab di sini)_

**5.4 Layanan lain yang ditawarkan?**
Misal: maintenance, optimasi performa, migrasi, konsultasi.

> _(jawab di sini)_

**5.5 Menerima project sekarang?**
Kalau tidak, lebih baik service section disembunyikan sementara.

> _(jawab di sini)_

---

# 6. BLOG — P2

Target: `content/blog/*.md`
Ini yang paling murah diisi karena **tidak perlu mengarang** — cukup tulis apa yang sudah kamu kerjakan.

**6.1 Tiga ide artikel dari project kamu sendiri**

> 1. _(contoh: "Integrasi Midtrans Snap di Laravel 11: jebakan callback yang bikin order nyangkut")_
> 2.
> 3.

**6.2 Mau mulai dari mana?**
Kalau kamu pilih satu, aku bisa bikinkan kerangka/outline dulu, kamu isi bagian teknisnya.

> _(jawab di sini)_

---

# 7. STORE — P3

Target: `lib/store.ts` (sekarang `[]`, navigasi disembunyikan)
Nyalakan hanya kalau ada produk jadi + link checkout (Gumroad / Trakteer / Lynk).

- Ada produk yang mau dijual? (template, ebook, preset, jasa paket)
- Nama produk + harga + link checkout

> _(jawab di sini, atau "belum ada — biarkan tersembunyi")_

---

# 8. TESTIMONI — P3

Sekarang belum ada field-nya di kode. Kalau nanti ada testimoni nyata (nama, jabatan, perusahaan, kutipan, izin publish), aku bisa tambahkan komponennya.

- Punya testimoni dari klien / mentor / dosen?

> _(jawab di sini, atau "belum ada")_

---

# Ringkasan prioritas

| # | Bagian | Prioritas | Dampak |
| - | ------ | --------- | ------ |
| 4 | Case study 3 project | **P1** | Paling besar — ini yang dibaca calon klien/HRD |
| 2 | Pengalaman magang | **P1** | Halaman Resume sekarang kosong |
| 1 | Foto + CV | **P1** | Kelengkapan profil |
| 3 | Sertifikasi BNSP | P2 | Kredibilitas |
| 5 | Services + harga | P2 | Konversi ke kontak |
| 6 | Blog 2–3 artikel | P2 | Bukti kemampuan berpikir |
| 7 | Store | P3 | Belum ada produk |
| 8 | Testimoni | P3 | Butuh sumber nyata |
