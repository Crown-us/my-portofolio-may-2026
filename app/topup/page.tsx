import Link from "next/link";
import { ArrowLeft, Gamepad2 } from "lucide-react";

export default function TopUpPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-mono p-6 md:p-12 flex flex-col items-center justify-center text-center">
      <div className="max-w-md w-full p-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[var(--accent-subtle)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent)]">
          <Gamepad2 size={24} />
        </div>
        <h1 className="text-xl font-bold font-display" style={{ fontFamily: "var(--font-space)" }}>
          Top-Up Game Platform
        </h1>
        <p className="text-xs text-[var(--muted)] leading-relaxed">
          Folder & rute disiapkan. Menunggu referensi & spesifikasi dari kamu untuk dieksekusi!
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90"
          style={{ background: "var(--accent)" }}
        >
          <ArrowLeft size={14} /> Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
