/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import path from 'path'
import react from '@vitejs/plugin-react'


export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@/core": path.resolve(__dirname, '.') + "/src/core",
      "@/react": path.resolve(__dirname, '.') + "/src/react",
      "@/tests/core":  path.resolve(__dirname, '.') + "/tests/core",
      "@/tests/react":path.resolve(__dirname, '.') + "/tests/react",
      "@/tests/fixtures": path.resolve(__dirname, '.') + "/tests/fixtures"
    }
  }
})