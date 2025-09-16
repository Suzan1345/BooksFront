import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// WICHTIG: server.proxy ist TOP-LEVEL unter defineConfig,
// und die Map hat Schlüssel = Pfadpräfix ("/books"),
// Wert = ProxyOptions (mit "target", NICHT noch mal "proxy" innen).
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // optional: eigenen Dev-Port setzen
    // port: 5173,
    proxy: {
      '/books': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        // optional: Pfadumschreibung, HIER NICHT nötig:
        // rewrite: (path) => path.replace(/^\/books/, '/books'),
      },
    },
  },
})
