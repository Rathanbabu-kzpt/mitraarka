"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { services } from "@/content/services";

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string };
type FieldErrors = Partial<Record<string, string[]>>;

const input =
  "w-full rounded-xl border border-line bg-white px-4 py-3 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: "sending" });
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setErrors(json.fields ?? {});
        setStatus({ state: "error", message: json.error ?? "Something went wrong." });
        return;
      }
      form.reset();
      setStatus({ state: "sent" });
    } catch {
      setStatus({ state: "error", message: "Network error. Please try again." });
    }
  }

  if (status.state === "sent") {
    return (
      <motion.div
        className="rounded-2xl border border-brand/40 bg-brand-soft p-10 text-center"
        role="status"
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
      >
        <svg viewBox="0 0 52 52" className="mx-auto h-16 w-16" aria-hidden>
          <motion.circle
            cx="26" cy="26" r="24" fill="none" stroke="#9a7026" strokeWidth="3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }}
          />
          <motion.path
            d="M15 27l7 7 15-16" fill="none" stroke="#9a7026" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.5 }}
          />
        </svg>
        <h3 className="mt-5 text-2xl font-bold">Thank you!</h3>
        <p className="mt-2 text-muted">We&apos;ve received your message and will reply within one business day.</p>
        <button onClick={() => setStatus({ state: "idle" })} className="mt-6 font-semibold text-brand hover:text-brand-dark">
          Send another message
        </button>
      </motion.div>
    );
  }

  const err = (name: string) =>
    errors[name]?.[0] && <p className="mt-1.5 text-sm text-red-600">{errors[name]![0]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl border border-line bg-surface p-7 sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Name *</span>
          <input name="name" required autoComplete="name" className={input} />
          {err("name")}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Email *</span>
          <input name="email" type="email" required autoComplete="email" className={input} />
          {err("email")}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Phone</span>
          <input name="phone" type="tel" autoComplete="tel" className={input} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Company</span>
          <input name="company" autoComplete="organization" className={input} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold">Service of interest</span>
        <select name="service" className={input} defaultValue="">
          <option value="">Not sure yet</option>
          {services.map((s) => (
            <option key={s.slug}>{s.title}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold">Project details *</span>
        <textarea name="message" required rows={6} className={input} placeholder="What are you building, and by when?" />
        {err("message")}
      </label>
      {/* Honeypot */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {status.state === "error" && <p className="text-sm text-red-600" role="alert">{status.message}</p>}

      <button
        type="submit"
        disabled={status.state === "sending"}
        className="w-full rounded-full bg-ink px-8 py-4 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand hover:shadow-[0_14px_30px_-12px_rgba(154,112,38,0.8)] disabled:opacity-60 sm:w-auto"
      >
        {status.state === "sending" ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> Sending…
          </span>
        ) : (
          "Send message"
        )}
      </button>
    </form>
  );
}
