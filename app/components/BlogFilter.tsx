"use client";

import { useEffect, useRef } from "react";
import { Check, ChevronDown } from "lucide-react";
import f from "./BlogLibrary.module.css";

export default function BlogFilter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  const root = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);

  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !root.current?.contains(event.target) &&
        root.current
      ) {
        root.current.open = false;
      }
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  return (
    <div className={f.filter}>
      <span>{label}</span>
      <details
        ref={root}
        className={f.dropdown}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null))
            event.currentTarget.open = false;
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            if (root.current) root.current.open = false;
            trigger.current?.focus();
          }
          if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
            event.preventDefault();
            if (root.current) root.current.open = true;
            const buttons = Array.from(
              root.current?.querySelectorAll("button") ?? [],
            );
            const index = buttons.indexOf(
              document.activeElement as HTMLButtonElement,
            );
            const next =
              event.key === "Home"
                ? 0
                : event.key === "End"
                  ? buttons.length - 1
                  : event.key === "ArrowDown"
                    ? (index + 1) % buttons.length
                    : (index <= 0 ? buttons.length : index) - 1;
            buttons[next]?.focus();
          }
        }}
      >
        <summary
          ref={trigger}
          className={f.trigger}
          aria-label={`${label}: ${options.find((option) => option.value === value)?.label}`}
        >
          <span>{options.find((option) => option.value === value)?.label}</span>
          <ChevronDown size={15} aria-hidden="true" />
        </summary>
        <div className={f.options} role="group" aria-label={label}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-label={option.label}
              aria-pressed={value === option.value}
              onClick={() => {
                onChange(option.value);
                if (root.current) root.current.open = false;
                trigger.current?.focus();
              }}
            >
              <span>{option.label}</span>
              {value === option.value && <Check size={15} aria-hidden="true" />}
            </button>
          ))}
        </div>
      </details>
    </div>
  );
}
