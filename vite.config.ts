import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // The landing page plus the waitlist privacy note at /privacy.html.
    rolldownOptions: {
      input: { main: 'index.html', privacy: 'privacy.html' },
    },
  },
})
