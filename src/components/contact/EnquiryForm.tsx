"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const OCCASIONS = [
  "Birthday",
  "Wedding",
  "Haldi",
  "Room Decoration",
  "Car Decoration",
  "Other",
] as const;

interface FormState {
  name: string;
  phone: string;
  occasion: (typeof OCCASIONS)[number] | "";
  eventDate: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  phone: "",
  occasion: "",
  eventDate: "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export function EnquiryForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string>("");

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) next.name = "Naam daalein.";
    if (!/^[6-9]\d{9}$/.test(form.phone.trim()))
      next.phone = "Sahi 10-digit phone number daalein.";
    if (!form.occasion) next.occasion = "Occasion chunein.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setFeedback(data.message ?? "Kuch galat ho gaya. Dobara try karein.");
        return;
      }

      setStatus("success");
      setFeedback(data.message);
      setForm(initialState);
    } catch {
      setStatus("error");
      setFeedback("Network error — kripya dobara try karein ya WhatsApp karein.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-3 rounded-card border border-success/30 bg-success/10 p-8 text-center"
        role="status"
      >
        <CheckCircle2 size={40} strokeWidth={1.5} className="text-success" />
        <h3 className="font-heading text-xl font-semibold text-charcoal">Enquiry Bhej Di Gayi!</h3>
        <p className="font-body text-sm text-muted max-w-sm">{feedback}</p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")} className="mt-2">
          Ek Aur Enquiry Bhejein
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Field label="Naam" htmlFor="name" error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className={inputClass(!!errors.name)}
          placeholder="Aapka naam"
        />
      </Field>

      <Field label="Phone Number" htmlFor="phone" error={errors.phone}>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          value={form.phone}
          onChange={(e) =>
            setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))
          }
          className={inputClass(!!errors.phone)}
          placeholder="98765 43210"
        />
      </Field>

      <Field label="Occasion" htmlFor="occasion" error={errors.occasion}>
        <select
          id="occasion"
          name="occasion"
          value={form.occasion}
          onChange={(e) =>
            setForm((f) => ({ ...f, occasion: e.target.value as FormState["occasion"] }))
          }
          className={inputClass(!!errors.occasion)}
        >
          <option value="" disabled>
            Occasion chunein
          </option>
          {OCCASIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Event Date (optional)" htmlFor="eventDate">
        <input
          id="eventDate"
          name="eventDate"
          type="date"
          value={form.eventDate}
          onChange={(e) => setForm((f) => ({ ...f, eventDate: e.target.value }))}
          className={inputClass(false)}
        />
      </Field>

      <Field label="Message (optional)" htmlFor="message">
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={cn(inputClass(false), "resize-none")}
          placeholder="Apni zaroorat batayein..."
        />
      </Field>

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-2 rounded-xl bg-error/10 px-4 py-3 text-error"
            role="alert"
          >
            <AlertCircle size={18} strokeWidth={1.75} className="shrink-0 mt-0.5" />
            <p className="font-body text-sm">{feedback}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        variant="primary"
        disabled={status === "submitting"}
        className="w-full sm:w-fit"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Bhej Rahe Hain...
          </>
        ) : (
          <>
            <Send size={18} strokeWidth={1.75} />
            Enquiry Bhejein
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="font-body text-sm font-medium text-charcoal">
        {label}
      </label>
      {children}
      {error && (
        <p className="font-body text-xs text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-warm-white px-4 py-3 font-body text-[15px] text-charcoal placeholder:text-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-blush/40",
    hasError ? "border-error" : "border-border focus:border-blush"
  );
}
