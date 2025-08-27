import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Service worker atualiza automaticamente
      strategies: 'injectManifest', // Usar seu sw.js customizado
      srcDir: 'public', // Diretório do sw.js
      filename: 'sw.js',
      manifest: {
        name: 'Chatbot UI',
        short_name: 'ChatbotUI',
        description: 'Aplicativo de chat em tempo real com suporte offline',
        theme_color: '#0A0A0A',
        background_color: '#181818',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^http:\/\/localhost:3000\/api\/.*$/, // Ajuste sua API se tiver
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60 // 1 dia
              }
            }
          }
        ]
      }
    })
  ],
})
