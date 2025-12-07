import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,         // biar bisa diakses dari network
    port: 5173,         // pastikan sesuai port dev Vite
    strictPort: true,
    allowedHosts: ['.ngrok-free.dev']  // terima semua subdomain ngrok free
  }
})
