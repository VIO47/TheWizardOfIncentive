import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/TheWizardOfIncentive/the-wizard-of-incentive/",
  plugins: [react()],
  resolve: {
    alias: {
      "@style": path.resolve(__dirname, "src/style"),
    },
  },
})
