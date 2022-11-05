import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import progress from 'vite-plugin-progress'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import viteCompression from 'vite-plugin-compression'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    progress(),
    chunkSplitPlugin({
      strategy: 'default',
      customSplitting: {
        'vue-vendor': ['vue'],
      },
    }),
    viteCompression(),
  ],
  server:{
    port: 3000
  },
  envDir: './env',
  css: {
    postcss: 'postcss.config.cjs',
  },
  build: {
    minify: true,
    cssCodeSplit: true,
    commonjsOptions: {
      ignoreTryCatch: false,
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },

})
