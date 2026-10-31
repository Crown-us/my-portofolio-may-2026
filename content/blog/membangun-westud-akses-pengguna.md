---
title: "Membangun WeStud: Memisahkan Login, Peran, dan Akses Kursus"
slug: membangun-westud-akses-pengguna
date: 2026-11-01
summary: Catatan dari kode WeStud tentang akses siswa dan mentor, pemeriksaan pendaftaran kursus, serta bagian otorisasi yang masih perlu dirapikan.
type: guide
tags:
  - Pengembangan Web
  - Studi Kasus
coverImage: /images/projects/westud-lms.png
draft: false
sources:
  - name: "WeStud — kode dashboard"
    url: https://github.com/Crown-us/lms-westud/blob/8963fb5e869a484ddd9c63d168cdb2a95da4f540/src/routes/dashboard.tsx
  - name: "WeStud — pemeriksaan akses ruang belajar"
    url: https://github.com/Crown-us/lms-westud/blob/8963fb5e869a484ddd9c63d168cdb2a95da4f540/src/routes/dashboard/courses.$courseId.learn.tsx
  - name: "WeStud — skema database"
    url: https://github.com/Crown-us/lms-westud/blob/8963fb5e869a484ddd9c63d168cdb2a95da4f540/supabase_schema.sql
  - name: "Supabase — Row Level Security"
    url: https://supabase.com/docs/guides/database/postgres/row-level-security
---

Di WeStud, masuk ke akun belum berarti seseorang boleh membuka semua halaman. Siswa perlu mengakses kursus yang diikuti. Mentor perlu mengelola kursus. Keduanya sama-sama sudah login, tetapi kebutuhannya berbeda.

Tulisan ini membahas implementasi yang ada di repositori WeStud saat saya menyiapkan catatan ini, bukan rancangan sistem yang semuanya sudah selesai. Fokusnya tiga pertanyaan: siapa yang masuk, apa perannya, dan kursus mana yang boleh dibuka.

## Login menjawab siapa penggunanya

WeStud memakai React dan TanStack Router di sisi antarmuka, dengan Supabase untuk autentikasi dan database.

Komponen `AuthProvider` mendengarkan perubahan sesi lewat `onAuthStateChange`. Ketika ada pengguna, aplikasi mengambil baris profil dengan ID yang sama. Dari sini, antarmuka bisa mengetahui akun yang sedang aktif dan profilnya.

Sesi dan profil punya fungsi berbeda. Sesi menunjukkan bahwa pengguna sudah masuk. Profil menyimpan informasi aplikasi, termasuk perannya.

## Peran menentukan kebutuhan halaman

Di skema, kolom `profiles.role` menerima tiga nilai: `siswa`, `guru`, dan `admin`. Nilai awalnya `siswa`. Istilah mentor pada antarmuka menggunakan nilai `guru` di kode.

Dashboard membaca peran dari profil. Menu “Daftar Murid”, misalnya, hanya ditampilkan untuk `guru`.

Ada pemeriksaan tambahan di `beforeLoad` route dashboard. Jalur membuat kursus, mengelola materi, mengedit kursus, dan melihat siswa diperiksa sebelum halaman dibuka. Jika pengguna bukan `guru`, aplikasi mengarahkannya kembali ke dashboard.

**Menyembunyikan menu dan memeriksa route mengatur pengalaman navigasi. Keduanya belum cukup untuk membuktikan bahwa akses database sudah dibatasi dengan benar.**

Perlu dicatat juga: `admin` sudah menjadi nilai yang valid di skema, tetapi pemeriksaan route yang dibahas di sini hanya mengizinkan `guru` untuk jalur tersebut. Saya belum menyebut WeStud memiliki dashboard admin lengkap.

## Siswa tetap perlu terdaftar di kursus

Peran siswa saja belum menjawab apakah akun itu boleh membuka kursus tertentu.

Route ruang belajar melakukan dua pemeriksaan:

1. Jika belum login, pengguna diarahkan ke halaman login dengan alamat tujuan untuk kembali.
2. Jika sudah login, aplikasi mencari data `enrollments` yang cocok dengan ID kursus dan ID pengguna. Jika tidak ada, pengguna diarahkan ke halaman kursus.

Dengan begitu, membuka URL ruang belajar secara langsung tetap melewati pemeriksaan pendaftaran di sisi aplikasi.

Contohnya, akun siswa yang mengikuti kursus A tidak otomatis lolos pemeriksaan ruang belajar kursus B.

## Aturan data perlu lapisan sendiri

Skema WeStud mengaktifkan Row Level Security atau RLS pada tabel seperti `profiles`, `courses`, dan `enrollments`.

Salah satu kebijakannya membatasi pembacaan pendaftaran berdasarkan kecocokan `auth.uid()` dengan `student_id`. Ada juga kebijakan pembacaan kursus dengan status `published`.

Menurut [dokumentasi Supabase](https://supabase.com/docs/guides/database/postgres/row-level-security), hak akses tabel menentukan operasi yang boleh dijalankan, sedangkan kebijakan RLS menentukan baris yang boleh diakses. Jadi pemeriksaan di router tidak menggantikan aturan di database.

Namun, keberadaan SQL di repositori bukan bukti bahwa konfigurasi database live sudah identik atau seluruh skenario akses sudah diuji.

## Bagian yang masih perlu saya rapikan

Dari pembacaan kode ini, ada beberapa pekerjaan lanjutan:

- Memetakan izin baca, tambah, ubah, dan hapus per tabel, termasuk kepemilikan kursus oleh mentor.
- Meninjau cara penetapan dan perubahan peran agar tidak bergantung pada data yang dapat diubah pengguna.
- Menyelaraskan akses materi di database dengan aturan pendaftaran kursus di aplikasi.
- Menentukan kebutuhan admin sebelum membuat halaman dan izinnya.
- Menguji skenario yang harus ditolak, bukan hanya alur yang berhasil.

Ini daftar pekerjaan lanjutan, bukan klaim bahwa pengujian tersebut sudah dilakukan atau bahwa seluruh kontrol akses WeStud sudah aman.

## Yang saya ambil dari implementasi ini

Memisahkan sesi, peran, dan pendaftaran kursus membuat aturan akses lebih mudah dibaca. Ketika sebuah halaman gagal dibuka, pertanyaannya menjadi lebih spesifik: akunnya belum masuk, perannya tidak sesuai, atau belum terdaftar di kursus?

Bagian berikutnya adalah memastikan aturan itu konsisten sampai ke database. Itulah yang perlu dibuktikan lewat pemeriksaan kebijakan dan pengujian akses.

Kalau ingin melihat konteks aplikasinya, buka [studi kasus WeStud](/id/projects/lms-westud) atau [repositori proyek](https://github.com/Crown-us/lms-westud).

*Catatan sumber: kode ditinjau pada 1 November 2026 dari commit `8963fb5`. Artikel ini tidak memuat hasil audit database live, pengujian penetrasi, atau angka dampak yang belum diukur.*

