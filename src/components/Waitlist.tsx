import { useState, type FormEvent } from "react";
import { CONTACT_EMAIL, MAILING_ADDRESS } from "../config";
import { supabase } from "../lib/supabase";

// Saved with every signup as proof of what the person agreed to (CASL), so it must match the checkbox label exactly.
const CONSENT_TEXT = "Email me when Cohort launches. Unsubscribe anytime.";

// CASL also requires saying who's asking and how to reach them. Saved with each signup, like the consent text.
const DISCLOSURE_TEXT = ["Cohort, a UAIS project", MAILING_ADDRESS, CONTACT_EMAIL].filter(Boolean).join(" · ");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "loading" | "success" | "error";

// Where the visitor came from, e.g. ?src=campus on the QR code.
function getSource() {
  return new URLSearchParams(window.location.search).get("src")?.trim().slice(0, 50) || "website";
}

// Email signup for the launch announcement. Styled for the dark closing card.
export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!supabase || !consent || status === "loading") return;

    const cleaned = email.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(cleaned)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    const { error } = await supabase
      .from("waitlist")
      .insert({
        email: cleaned,
        consent: true,
        consent_text: CONSENT_TEXT,
        disclosure_text: DISCLOSURE_TEXT,
        source: getSource(),
      });

    // 23505 = already on the list. Show the normal success message so the form doesn't reveal who has signed up.
    if (!error || error.code === "23505") {
      setStatus("success");
    } else {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  let body;
  if (!supabase) {
    body = <p className="rounded-lg border border-white/25 px-5 py-3 text-center text-sm font-medium">Waitlist coming soon</p>;
  } else if (status === "success") {
    body = (
      <p role="status" className="flex items-center justify-center gap-2 rounded-lg bg-white/10 px-5 py-4 text-center font-medium">
        <span className="text-accent">✓</span>
        You're on the list! We'll email you when Cohort launches.
      </p>
    );
  } else {
    body = (
      <form onSubmit={handleSubmit} noValidate className="text-left">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="waitlist-email" className="sr-only">
            Email
          </label>
          <input
            id="waitlist-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="you@ualberta.ca"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={status === "error"}
            aria-describedby={status === "error" ? "waitlist-error" : undefined}
            className="min-w-0 flex-1 rounded-lg border border-white/25 bg-white/10 px-4 py-3 text-base text-white outline-none transition placeholder:text-white/40 focus:border-white/60 sm:text-sm"
          />
          <button
            type="submit"
            disabled={!consent || status === "loading"}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-white/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
          >
            {status === "loading" ? "Joining…" : "Join the waitlist"}
          </button>
        </div>
        <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm text-white/80">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-accent"
          />
          <span>{CONSENT_TEXT}</span>
        </label>
        {status === "error" && (
          <p id="waitlist-error" role="alert" className="mt-3 text-sm text-white">
            {error}
          </p>
        )}
      </form>
    );
  }

  return <div className="mx-auto max-w-md">{body}</div>;
}

// Who's asking and how to reach them. Must stay in the same card as the form, so it's part of the consent request.
export function WaitlistSmallPrint() {
  return (
    <p className="mx-auto max-w-md text-center text-xs leading-relaxed text-white/50">
      Built by UofA students. We'll only email you about Cohort's launch.
      <br />
      {DISCLOSURE_TEXT} ·{" "}
      <a href="/privacy.html" className="underline underline-offset-2 hover:text-white">
        Privacy
      </a>
    </p>
  );
}
