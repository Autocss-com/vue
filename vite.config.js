import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base '/vue/' matches the GitHub Pages project URL:
// https://autocss-com.github.io/vue/
// https://vite.dev/config/
export default defineConfig({
  base: '/vue/',
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // AutoCSS scaffold uses <app-*> custom elements — do not treat
          // them as Vue components (otherwise Vue warns/errors on resolve).
          isCustomElement: (tag) => tag.startsWith('app-'),
        },
      },
    }),
  ],
})
