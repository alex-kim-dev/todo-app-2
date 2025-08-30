/// <reference types="vitest/config" />

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(() => ({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({
      include: 'src/**/*.svg',
      svgrOptions: {
        ref: true,
        titleProp: true,
      },
    }),
    mkcert(),
  ],

  test: {
    environment: 'happy-dom',
    setupFiles: ['src/vitest-setup.ts'],
  },
}))
