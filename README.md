# Cohort landing page

A UAIS project. Promo site for Cohort; the working prototype is at https://calendarai-mini.vercel.app/.

Vite + React + TypeScript + Tailwind, same as the Cohort app.

```bash
npm install
npm run dev
```

## Things to change
- `src/config.ts`: contact email, prototype link, demo video on/off
- `public/demo.mp4`: screen recording for the hero (set `HAS_DEMO_VIDEO = true`)
- `public/mini-desktop.png`: hero screenshot, used until there's a video

## Deploy
Import the repo on vercel.com. It detects Vite, no settings needed.
