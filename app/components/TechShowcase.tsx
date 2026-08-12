"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";

const tabs = [
  {
    label: "Next.js",
    filename: "app/page.tsx",
    code: [
      { type: "comment",  text: "// Next.js 16 — App Router + Server Components" },
      { type: "keyword",  text: "\nimport" },
      { type: "plain",    text: " { Suspense } " },
      { type: "keyword",  text: "from" },
      { type: "string",   text: ' "react"' },
      { type: "plain",    text: ";\n" },
      { type: "keyword",  text: "import" },
      { type: "plain",    text: " { ProjectGrid } " },
      { type: "keyword",  text: "from" },
      { type: "string",   text: ' "@/components/ProjectGrid"' },
      { type: "plain",    text: ";\n\n" },
      { type: "keyword",  text: "export default function" },
      { type: "fn",       text: " Home" },
      { type: "plain",    text: "() {\n  " },
      { type: "keyword",  text: "return" },
      { type: "plain",    text: " (\n    <" },
      { type: "tag",      text: "main" },
      { type: "plain",    text: " className=" },
      { type: "string",   text: '"container mx-auto"' },
      { type: "plain",    text: ">\n      <" },
      { type: "tag",      text: "Suspense" },
      { type: "plain",    text: " fallback={<" },
      { type: "tag",      text: "LoadingShimmer" },
      { type: "plain",    text: " />}>\n        <" },
      { type: "tag",      text: "ProjectGrid" },
      { type: "plain",    text: " />\n      </" },
      { type: "tag",      text: "Suspense" },
      { type: "plain",    text: ">\n    </" },
      { type: "tag",      text: "main" },
      { type: "plain",    text: ">\n  );\n}" },
    ],
  },
  {
    label: "Flutter",
    filename: "lib/main.dart",
    code: [
      { type: "comment",  text: "// Flutter — Clean Architecture + BLoC" },
      { type: "plain",    text: "\n" },
      { type: "keyword",  text: "class" },
      { type: "fn",       text: " ProjectsPage " },
      { type: "keyword",  text: "extends" },
      { type: "plain",    text: " StatelessWidget {\n  " },
      { type: "keyword",  text: "const" },
      { type: "plain",    text: " ProjectsPage({" },
      { type: "keyword",  text: "super" },
      { type: "plain",    text: ".key});\n\n  @override\n  Widget " },
      { type: "fn",       text: "build" },
      { type: "plain",    text: "(BuildContext context) {\n    " },
      { type: "keyword",  text: "return" },
      { type: "plain",    text: " BlocBuilder<ProjectsCubit, ProjectsState>(\n      builder: (context, state) => " },
      { type: "keyword",  text: "switch" },
      { type: "plain",    text: " (state) {\n        ProjectsLoaded(:final projects) => ProjectGrid(projects: projects),\n        _ => LoadingShimmer(),\n      },\n    );\n  }\n}" },
    ],
  },
  {
    label: "Laravel",
    filename: "routes/api.php",
    code: [
      { type: "comment",  text: "<?php\n// Laravel 11 — Clean REST API with Resource Controllers" },
      { type: "plain",    text: "\n" },
      { type: "keyword",  text: "use" },
      { type: "plain",    text: " App\\Http\\Controllers\\" },
      { type: "tag",      text: "ProjectController" },
      { type: "plain",    text: ";\n" },
      { type: "keyword",  text: "use" },
      { type: "plain",    text: " App\\Http\\Middleware\\" },
      { type: "tag",      text: "ApiAuthenticate" },
      { type: "plain",    text: ";\n\n" },
      { type: "fn",       text: "Route" },
      { type: "plain",    text: "::" },
      { type: "fn",       text: "middleware" },
      { type: "plain",    text: "([" },
      { type: "tag",      text: "ApiAuthenticate" },
      { type: "plain",    text: "::class])\n  ->" },
      { type: "fn",       text: "prefix" },
      { type: "plain",    text: "(" },
      { type: "string",   text: "'v1'" },
      { type: "plain",    text: ")\n  ->" },
      { type: "fn",       text: "group" },
      { type: "plain",    text: "(function () {\n    " },
      { type: "fn",       text: "Route" },
      { type: "plain",    text: "::" },
      { type: "fn",       text: "apiResource" },
      { type: "plain",    text: "(" },
      { type: "string",   text: "'projects'" },
      { type: "plain",    text: ", ProjectController::class);\n  });" },
    ],
  },
  {
    label: "TypeScript",
    filename: "lib/api.ts",
    code: [
      { type: "comment",  text: "// Type-safe API client with Zod" },
      { type: "plain",    text: "\n" },
      { type: "keyword",  text: "import" },
      { type: "plain",    text: " { z } " },
      { type: "keyword",  text: "from" },
      { type: "string",   text: ' "zod"' },
      { type: "plain",    text: ";\n\n" },
      { type: "keyword",  text: "const" },
      { type: "plain",    text: " ProjectSchema = z." },
      { type: "fn",       text: "object" },
      { type: "plain",    text: "({\n  id: z." },
      { type: "fn",       text: "string" },
      { type: "plain",    text: "()." },
      { type: "fn",       text: "uuid" },
      { type: "plain",    text: "(),\n  title: z." },
      { type: "fn",       text: "string" },
      { type: "plain",    text: "()." },
      { type: "fn",       text: "min" },
      { type: "plain",    text: "(1),\n});\n\n" },
      { type: "keyword",  text: "type" },
      { type: "plain",    text: " Project = z." },
      { type: "fn",       text: "infer" },
      { type: "plain",    text: "<" },
      { type: "keyword",  text: "typeof" },
      { type: "plain",    text: " ProjectSchema>;" },
    ],
  },
];

const tokenColors: Record<string, string> = {
  comment: "#6b7280",
  keyword: "#c084fc",
  string:  "#86efac",
  fn:      "#67e8f9",
  tag:     "#fb923c",
  plain:   "#e5e7eb",
};

export default function TechShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const rawCode = tabs[activeTab].code.map(t => t.text).join("");

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full bg-[var(--background)] border-t border-[var(--border)]">
      {/* Master Centered Container */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 border-x border-[var(--border)] py-20 md:py-28 relative">
        
        {/* Corner dots */}
        <div className="grid-dot -top-[3px] -left-[3px]" />
        <div className="grid-dot -top-[3px] -right-[3px]" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <p className="text-[11px] font-mono font-bold uppercase tracking-[0.1em] mb-3" style={{ color: "var(--accent)" }}>
              [ 03 ] HOW I CODE
            </p>
            <h2
              className="font-bold tracking-tight"
              style={{ fontFamily: "var(--font-space)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--foreground)" }}
            >
              Clean code,{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>every stack</em>
            </h2>
          </div>
          <p className="text-xs font-mono leading-relaxed max-w-xs" style={{ color: "var(--muted)" }}>
            Real code snippets from my daily workflow across web, mobile, and backend.
          </p>
        </div>

        {/* Code Window */}
        <div className="rounded-xl overflow-hidden shadow-2xl" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "#0d0d0e" }}>
          {/* Chrome bar */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "#111113" }}
          >
            {/* Traffic lights */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1">
              {tabs.map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className="px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all"
                  style={{
                    background: activeTab === i ? "var(--accent)" : "transparent",
                    color: activeTab === i ? "#fff" : "rgba(255,255,255,0.45)",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Filename & Copy button */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono hidden sm:block" style={{ color: "rgba(255,255,255,0.3)" }}>
                {tabs[activeTab].filename}
              </span>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-md transition-colors"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                title="Copy code"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Code body */}
          <AnimatePresence mode="wait">
            <motion.pre
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
              className="px-6 py-6 text-[13px] leading-[1.75] font-mono overflow-x-auto"
            >
              <code>
                {tabs[activeTab].code.map((token, i) => (
                  <span key={i} style={{ color: tokenColors[token.type] ?? "#e5e7eb", whiteSpace: "pre" }}>
                    {token.text}
                  </span>
                ))}
              </code>
            </motion.pre>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
