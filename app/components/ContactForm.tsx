"use client";
import { useState, useRef } from "react";
import { services } from "@/lib/services";
import {
  BUDGET_RANGES,
  validateContact,
  type ContactErrors,
} from "@/lib/domain";
import s from "@/lib/styles";
export default function ContactForm({
  initialService,
}: {
  initialService: string;
}) {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const form = useRef<HTMLFormElement>(null);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const check = validateContact(
      values,
      services.map((item) => item.slug),
    );
    setErrors(check.errors);
    if (!check.isValid) {
      setStatus("error");
      setMessage("Please check the highlighted fields.");
      const field = Object.keys(check.errors)[0];
      (form.current?.elements.namedItem(field) as HTMLElement | null)?.focus();
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(check.data),
      });
      const result = await response.json();
      setMessage(result.message || "Unable to send.");
      setErrors(result.errors || {});
      setStatus(response.ok ? "success" : "error");
      if (response.ok) form.current?.reset();
    } catch {
      setStatus("error");
      setMessage("Connection failed. Please try again or use WhatsApp.");
    }
  }
  const error = (name: keyof ContactErrors) =>
    errors[name] && (
      <span id={`${name}-error`} className={s.fieldError}>
        {errors[name]}
      </span>
    );
  return (
    <form
      ref={form}
      onSubmit={submit}
      noValidate
      className={s.contactForm}
      aria-busy={status === "loading"}
    >
      <label htmlFor="name">Name *</label>
      <input
        id="name"
        name="name"
        autoComplete="name"
        required
        maxLength={100}
        aria-invalid={!!errors.name}
        aria-describedby={errors.name ? "name-error" : undefined}
      />
      {error("name")}
      <label htmlFor="email">Email *</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        maxLength={254}
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? "email-error" : undefined}
      />
      {error("email")}
      <label htmlFor="service">
        Service <span>(optional)</span>
      </label>
      <select
        id="service"
        name="service"
        defaultValue={initialService}
        aria-invalid={!!errors.service}
        aria-describedby={errors.service ? "service-error" : undefined}
      >
        <option value="">Choose a service</option>
        {services.map((item) => (
          <option key={item.slug} value={item.slug}>
            {item.title}
          </option>
        ))}
      </select>
      {error("service")}
      <label htmlFor="budget">
        Budget <span>(optional)</span>
      </label>
      <select
        id="budget"
        name="budget"
        aria-invalid={!!errors.budget}
        aria-describedby={errors.budget ? "budget-error" : undefined}
      >
        <option value="">Choose a range</option>
        {BUDGET_RANGES.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </select>
      {error("budget")}
      <label htmlFor="message">Message *</label>
      <textarea
        id="message"
        name="message"
        rows={6}
        minLength={10}
        maxLength={5000}
        required
        aria-invalid={!!errors.message}
        aria-describedby={errors.message ? "message-error" : undefined}
      />
      {error("message")}
      <div className={s.honeypot} aria-hidden="true">
        <label htmlFor="website">Leave empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p className={s.formNote}>
        Your details are used only to respond to your inquiry.
      </p>
      <button className={s.submitButton} disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send message ↗"}
      </button>
      <p
        role="status"
        aria-live="polite"
        className={status === "error" ? s.fieldError : s.success}
      >
        {message}
      </p>
    </form>
  );
}
