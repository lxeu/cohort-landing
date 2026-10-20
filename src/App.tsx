import type { ReactNode } from "react";
import Reveal from "./components/Reveal";
import { CONTACT_EMAIL, HAS_DEMO_VIDEO, PROTOTYPE_URL } from "./config";

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2 font-semibold">
      <img src="/favicon.svg" alt="" className="h-5 w-5" />
      Cohort
    </a>
  );
}

function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-black active:scale-[0.98]"
    >
      {children}
    </a>
  );
}

function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-card px-5 py-3 text-sm font-medium transition hover:border-ink/30 active:scale-[0.98]"
    >
      {children}
    </a>
  );
}

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

function CallToAction() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <PrimaryButton href={PROTOTYPE_URL}>
        Try the prototype <Arrow />
      </PrimaryButton>
      {CONTACT_EMAIL ? (
        <SecondaryButton href={`mailto:${CONTACT_EMAIL}?subject=Cohort`}>Get in touch</SecondaryButton>
      ) : (
        <SecondaryButton href="#how">See how it works</SecondaryButton>
      )}
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-sm font-medium text-accent">{children}</p>;
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="font-serif text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">{children}</h2>;
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-line bg-card ${className}`}>{children}</div>;
}

// A browser window around the real prototype screenshot (or the demo video once there is one).
function ProductShot() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-card shadow-[0_30px_80px_-30px_rgba(28,27,25,0.35)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="ml-3 truncate rounded-md bg-paper px-3 py-1 text-xs text-muted">calendarai-mini.vercel.app</span>
      </div>
      {HAS_DEMO_VIDEO ? (
        <video src="/demo.mp4" poster="/mini-desktop.png" autoPlay muted loop playsInline className="block w-full" />
      ) : (
        <img
          src="/mini-desktop.png"
          alt="The CalendarAI Mini prototype: a syllabus schedule next to an October calendar with deadlines marked."
          className="block w-full"
        />
      )}
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-xs text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          For University of Alberta students
        </p>
        <h1 className="font-serif text-4xl leading-[1.08] font-semibold tracking-tight sm:text-6xl">
          Every deadline, every classmate, in one app.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
          Upload your syllabi and Cohort puts every assignment, lab, quiz and exam on one calendar. Then it helps you find
          someone in your course to study with.
        </p>
        <div className="mt-8 flex justify-center">
          <CallToAction />
        </div>
      </Reveal>
      <Reveal delay={150} className="mt-14 sm:mt-20">
        <ProductShot />
      </Reveal>
    </section>
  );
}

function Problem() {
  const problems = [
    {
      stat: "5+",
      title: "syllabi every term",
      body: "Each one is a different PDF with dates in a different place. Deadlines get missed because they were on page 6, not because nobody cared.",
    },
    {
      stat: "300",
      title: "people in a lecture",
      body: "Hundreds of people are in the room, and it's still hard to find one who wants to review for the midterm with you.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <Reveal className="max-w-2xl">
        <Eyebrow>The problem</Eyebrow>
        <SectionTitle>University gives you the information. It just doesn't put it in one place.</SectionTitle>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {problems.map((p, i) => (
          <Reveal key={p.title} delay={i * 120}>
            <Card className="h-full p-7 sm:p-8">
              <p className="font-serif text-5xl font-semibold tracking-tight sm:text-6xl">{p.stat}</p>
              <p className="mt-2 font-medium">{p.title}</p>
              <p className="mt-4 leading-relaxed text-muted">{p.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// Small drawings of the app's UI for each step. They're illustrations, not screenshots.
function StepSearch() {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm">
        <span className="text-muted">⌕</span>
        CMPUT 174
        <span className="h-4 w-px animate-pulse bg-ink" />
      </div>
      <p className="text-center text-xs text-muted">or</p>
      <div className="flex items-center gap-2 rounded-lg border border-dashed border-line px-3 py-2 font-mono text-xs text-muted">
        <span>▤</span> syllabus.pdf
      </div>
    </div>
  );
}

function StepReview() {
  const rows = [
    ["Assignment 2", "Oct 6"],
    ["Quiz 3", "Oct 9"],
    ["Midterm", "Oct 20"],
  ];
  return (
    <div className="space-y-1.5 text-sm">
      {rows.map(([title, date]) => (
        <div key={title} className="flex items-center justify-between rounded-md bg-paper px-3 py-1.5">
          <span className="flex items-center gap-2">
            <span className="text-accent">✓</span>
            {title}
          </span>
          <span className="text-muted">{date}</span>
        </div>
      ))}
    </div>
  );
}

function StepCalendar() {
  const marks: Record<number, string> = { 6: "bg-blue", 9: "bg-red", 14: "bg-accent", 20: "bg-blue", 24: "bg-accent" };
  return (
    <div className="grid grid-cols-7 gap-y-1.5 text-center text-xs">
      {Array.from({ length: 3 }, (_, i) => (
        <span key={`blank-${i}`} />
      ))}
      {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
        <span key={day} className="flex flex-col items-center gap-0.5">
          {day}
          <span className={`h-0.5 w-3 rounded-full ${marks[day] ?? "bg-transparent"}`} />
        </span>
      ))}
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "Find your course",
      body: "Search for it, or upload the syllabus as a PDF or pasted text.",
      art: <StepSearch />,
    },
    {
      title: "Check the dates",
      body: "Cohort pulls out every deadline. Nothing is added until you confirm it.",
      art: <StepReview />,
    },
    {
      title: "See it on your calendar",
      body: "All your courses on one calendar, and you can export it to Google, Apple or Outlook.",
      art: <StepCalendar />,
    },
  ];
  return (
    <section id="how" className="scroll-mt-20 border-y border-line bg-card/60">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <SectionTitle>From syllabus to calendar in three steps.</SectionTitle>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 120}>
              <Card className="flex h-full flex-col p-6">
                <div className="mb-6 min-h-36 rounded-xl border border-line p-4">{step.art}</div>
                <p className="text-sm text-muted">Step {i + 1}</p>
                <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudyBuddy() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 sm:px-6 md:grid-cols-2">
      <Reveal>
        <Eyebrow>Study buddy</Eyebrow>
        <SectionTitle>Get matched with someone in your course.</SectionTitle>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Cohort already knows which courses you're in and when your exams are, so it can pair you with a classmate who
          wants to study for the same thing. You don't have to work up the nerve to ask someone after lecture.
        </p>
      </Reveal>
      <Reveal delay={150}>
        <Card className="p-6 shadow-[0_20px_60px_-30px_rgba(28,27,25,0.3)]">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">CMPUT 174</p>
            <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs text-accent">Match found</span>
          </div>
          <div className="my-8 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink font-medium text-white">You</span>
            <span className="h-px w-16 bg-line" />
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft font-medium text-accent">
              ?
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between rounded-md bg-paper px-3 py-2">
              <span className="text-muted">Same course</span>
              <span>CMPUT 174</span>
            </div>
            <div className="flex justify-between rounded-md bg-paper px-3 py-2">
              <span className="text-muted">Shared deadline</span>
              <span>Midterm · Oct 20</span>
            </div>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}

function WhereWeAre() {
  const facts = [
    {
      label: "Working prototype",
      body: (
        <>
          You can try the syllabus-to-calendar flow today at{" "}
          <a href={PROTOTYPE_URL} target="_blank" rel="noreferrer" className="text-ink underline underline-offset-4">
            CalendarAI Mini
          </a>
          .
        </>
      ),
    },
    { label: "7-person team", body: "Built by students in UAIS, the Undergraduate Artificial Intelligence Society at UofA." },
    { label: "Winter launch goal", body: "We're aiming to launch to UofA students for the winter term." },
  ];
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal className="max-w-2xl">
          <Eyebrow>Where we are</Eyebrow>
          <SectionTitle>Early, and building in the open.</SectionTitle>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {facts.map((fact, i) => (
            <Reveal key={fact.label} delay={i * 120} className="h-full bg-card">
              <div className="h-full p-7">
                <p className="flex items-center gap-2 font-semibold">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  {fact.label}
                </p>
                <p className="mt-3 leading-relaxed text-muted">{fact.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <Reveal>
        <div className="rounded-3xl bg-ink px-6 py-16 text-center text-white sm:px-12">
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">See it for yourself.</h2>
          <p className="mx-auto mt-4 max-w-md text-white/70">
            Upload one of your syllabi and watch the deadlines land on your calendar.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={PROTOTYPE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-white/90 active:scale-[0.98]"
            >
              Try the prototype <Arrow />
            </a>
            {CONTACT_EMAIL && (
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Cohort`}
                className="inline-flex items-center justify-center rounded-lg border border-white/25 px-5 py-3 text-sm font-medium transition hover:border-white/60"
              >
                Get in touch
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function App() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line/70 bg-paper/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted sm:inline">A UAIS project</span>
            <a
              href={PROTOTYPE_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-ink px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-black"
            >
              Try it
            </a>
          </div>
        </div>
      </header>
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <StudyBuddy />
        <WhereWeAre />
        <Closing />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <Logo />
            <span>A UAIS project at the University of Alberta</span>
          </div>
          {CONTACT_EMAIL && (
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-ink">
              {CONTACT_EMAIL}
            </a>
          )}
        </div>
      </footer>
    </>
  );
}
