import type { ReactNode } from "react";
import { CONTACT_EMAIL, MAILING_ADDRESS } from "./config";

// Update this whenever the text below changes.
const LAST_UPDATED = "November 16, 2026";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

// Plain-language privacy note for the launch waitlist, served at /privacy.html.
export default function PrivacyPage() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line/70 bg-paper/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2 font-semibold">
            <img src="/favicon.svg" alt="" className="h-5 w-5" />
            Cohort
          </a>
          <a href="/#waitlist" className="text-sm text-muted hover:text-ink">
            Back to the waitlist
          </a>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <p className="mb-3 text-sm font-medium text-accent">Privacy</p>
        <h1 className="font-serif text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
          What happens to your email
        </h1>
        <p className="mt-4 text-sm text-muted">Last updated {LAST_UPDATED}</p>

        <Section title="Who we are">
          <p>
            Cohort is a project of UAIS, the Undergraduate Artificial Intelligence Society at the University of Alberta.
            {MAILING_ADDRESS && <> Our mailing address is {MAILING_ADDRESS}.</>}
            {CONTACT_EMAIL && (
              <>
                {" "}
                You can reach us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink underline underline-offset-4">
                  {CONTACT_EMAIL}
                </a>
                .
              </>
            )}
          </p>
        </Section>

        <Section title="What we collect">
          <p>When you join the waitlist we save:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>your email address</li>
            <li>the exact wording you agreed to, and when you agreed</li>
            <li>where you found us, such as a campus QR code</li>
          </ul>
          <p>We don't ask for your name, and this site doesn't use cookies or analytics.</p>
        </Section>

        <Section title="How we use it">
          <p>
            We'll email you when Cohort launches, and only about the launch. We won't sell your email or share it with
            anyone else to market to you.
          </p>
        </Section>

        <Section title="Where it's stored">
          <p>
            The list is stored with Supabase, a database provider whose servers may be outside Canada. Only the person
            running the waitlist can see it. The site's fonts load from Google Fonts, which sees your IP address like any
            website you visit.
          </p>
        </Section>

        <Section title="How long we keep it">
          <p>
            We keep your email until you unsubscribe or ask us to delete it. Unsubscribing means we won't email you again.
          </p>
        </Section>

        <Section title="Your choices">
          <p>
            Every email has an unsubscribe link.
            {CONTACT_EMAIL && (
              <>
                {" "}
                You can also email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink underline underline-offset-4">
                  {CONTACT_EMAIL}
                </a>{" "}
                to see, correct or delete what we have about you.
              </>
            )}
          </p>
        </Section>
      </main>
    </>
  );
}
