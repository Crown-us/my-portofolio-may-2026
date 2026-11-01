"use client";
import { useEffect, useRef, useState } from "react";
import { Search, X, ArrowUpRight } from "lucide-react";
import NextLink from "next/link";
import { useLocale } from "./LocaleProvider";
import { searchEntries, type SearchEntry } from "@/lib/search";
import c from "./GlobalSearch.module.css";

export default function GlobalSearch() {
  const locale = useLocale();
  const en = locale === "en";
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [attempt, setAttempt] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const cache = useRef(new Map<string, SearchEntry[]>());

  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);

  useEffect(() => {
    if (!open) {
      dialog.current?.close();
      return;
    }
    if (!dialog.current?.open) dialog.current?.showModal();
    input.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const saved = cache.current.get(locale);
    if (saved) {
      setEntries(saved);
      setStatus("ready");
      return;
    }
    const controller = new AbortController();
    setStatus("loading");
    fetch("/api/search?locale=" + locale, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Search unavailable");
        return response.json();
      })
      .then((data: SearchEntry[]) => {
        if (!Array.isArray(data)) throw new Error("Invalid index");
        cache.current.set(locale, data);
        setEntries(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus("error");
      });
    return () => controller.abort();
  }, [open, locale, attempt]);

  const matches = query.trim()
    ? searchEntries(entries, query)
    : entries.slice(0, 5);
  const labels = en
    ? {
        article: "Article · Indonesian",
        project: "Project",
        product: "Product",
      }
    : { article: "Artikel", project: "Proyek", product: "Produk" };
  const close = () => {
    setOpen(false);
    setQuery("");
  };
  return (
    <>
      <button
        className={c.trigger}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={en ? "Search this site" : "Cari di situs ini"}
        aria-haspopup="dialog"
      >
        <Search size={18} aria-hidden="true" />
        <span>{en ? "Search" : "Cari"}</span>
        <kbd>⌘ / Ctrl K</kbd>
      </button>
      <dialog
        ref={dialog}
        className={c.dialog}
        aria-labelledby="site-search-heading"
        onClose={close}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            close();
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const box = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < box.left ||
              event.clientX > box.right ||
              event.clientY < box.top ||
              event.clientY > box.bottom
            )
              close();
          }
        }}
      >
        <div className={c.top}>
          <h2 id="site-search-heading">{en ? "Search" : "Pencarian"}</h2>
          <button
            type="button"
            onClick={close}
            aria-label={en ? "Close search" : "Tutup pencarian"}
          >
            <X size={20} />
          </button>
        </div>
        <label className={c.field}>
          <Search size={20} aria-hidden="true" />
          <input
            ref={input}
            type="search"
            aria-label={
              en
                ? "Search articles, projects, and products"
                : "Cari artikel, proyek, dan produk"
            }
            placeholder={
              en
                ? "Try Incognito, WeStud, or React…"
                : "Coba Incognito, WeStud, atau React…"
            }
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            maxLength={150}
            autoComplete="off"
          />
        </label>
        <div className={c.results} aria-busy={status === "loading"}>
          {status === "loading" && (
            <p role="status">
              {en ? "Loading search…" : "Menyiapkan pencarian…"}
            </p>
          )}
          {status === "error" && (
            <div role="status">
              <p>
                {en
                  ? "Search could not be loaded."
                  : "Pencarian belum bisa dimuat."}
              </p>
              <button
                className={c.retry}
                type="button"
                onClick={() => setAttempt((value) => value + 1)}
              >
                {en ? "Try again" : "Coba lagi"}
              </button>
            </div>
          )}
          {status === "ready" && (
            <>
              <p className={c.caption} role="status">
                {query.trim()
                  ? en
                    ? matches.length + " results"
                    : matches.length + " hasil"
                  : en
                    ? "Explore articles and work"
                    : "Jelajahi tulisan dan karya"}
              </p>
              {!matches.length && (
                <p className={c.empty}>
                  {en
                    ? "No matches. Try a topic, project name, or technology."
                    : "Belum ada hasil. Coba topik, nama proyek, atau teknologi lain."}
                </p>
              )}
              <ul>
                {matches.map((entry) => (
                  <li key={entry.href}>
                    <NextLink
                      href={entry.href}
                      onClick={close}
                      className={c.result}
                    >
                      <div>
                        <span className={c.kind}>{labels[entry.kind]}</span>
                        <h3 lang={entry.kind === "article" ? "id" : undefined}>
                          {entry.title}
                        </h3>
                        <p lang={entry.kind === "article" ? "id" : undefined}>
                          {entry.summary}
                        </p>
                      </div>
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </NextLink>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className={c.footer}>
          {en
            ? "Esc to close · Tab to move between results"
            : "Esc untuk tutup · Tab untuk memilih hasil"}
        </div>
      </dialog>
    </>
  );
}
