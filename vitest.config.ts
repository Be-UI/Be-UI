import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import type { UserConfigExport } from 'vitest/config'

export default defineConfig({
  plugins: [
    Vue(),
    vueJsx(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
} as UserConfigExport)
