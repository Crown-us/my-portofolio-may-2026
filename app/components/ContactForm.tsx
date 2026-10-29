"use client";
import { T } from "@/app/components/LocaleProvider";

import { useState, useRef, useEffect } from "react";
import { services } from "@/lib/services";
import {
  BUDGET_RANGES,
  validateContact,
  type ContactErrors,
} from "@/lib/domain";
import s from "@/lib/styles";
export default function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [service, setService] = useState("");
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // The link may carry a preselected service, e.g. /contact?service=landing-page.
    const applyLinkedService = () => {
      const value = new URLSearchParams(window.location.search).get("service");
      setService(
        value && services.some((item) => item.slug === value) ? value : "",
      );
    };
    applyLinkedService();
  }, []);

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
        <T>{errors[name]}</T>
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
      <label htmlFor="name">
        <T>Name *</T>
      </label>
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
      <label htmlFor="email">
        <T>Email *</T>
      </label>
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
        <T>Service </T>
        <span>
          <T>(optional)</T>
        </span>
      </label>
      <select
        id="service"
        name="service"
        value={service}
        onChange={(event) => setService(event.target.value)}
        aria-invalid={!!errors.service}
        aria-describedby={errors.service ? "service-error" : undefined}
      >
        <option value="">
          <T>Choose a service</T>
        </option>
        {services.map((item) => (
          <option key={item.slug} value={item.slug}>
            <T>{item.title}</T>
          </option>
        ))}
      </select>
      {error("service")}
      <label htmlFor="budget">
        <T>Budget </T>
        <span>
          <T>(optional)</T>
        </span>
      </label>
      <select
        id="budget"
        name="budget"
        aria-invalid={!!errors.budget}
        aria-describedby={errors.budget ? "budget-error" : undefined}
      >
        <option value="">
          <T>Choose a range</T>
        </option>
        {BUDGET_RANGES.map((value) => (
          <option key={value} value={value}>
            <T>{value}</T>
          </option>
        ))}
      </select>
      {error("budget")}
      <label htmlFor="message">
        <T>Message *</T>
      </label>
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
        <label htmlFor="website">
          <T>Leave empty</T>
        </label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p className={s.formNote}>
        <T>Your details are used only to respond to your inquiry.</T>
      </p>
      <button className={s.submitButton} disabled={status === "loading"}>
        <T>{status === "loading" ? "Sending…" : "Send message ↗"}</T>
      </button>
      <p
        role="status"
        aria-live="polite"
        className={status === "error" ? s.fieldError : s.success}
      >
        <T>{message}</T>
      </p>
    </form>
  );
}
