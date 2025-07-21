// vite.config.js
export default {
  server: {
    // Deshabilitar caché en desarrollo
    cors: true,
    strictPort: true,
    hmr: {
      overlay: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Error de proxy:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
            // Agregar headers para evitar caché
            proxyReq.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            proxyReq.setHeader('Pragma', 'no-cache');
            proxyReq.setHeader('Expires', '0');
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        }
      }
    }
  },
  // Configuración para evitar caché en producción
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name].[hash].js`,
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: `[name].[hash].[ext]`
      }
    }
  },
  // Configuración de caché para desarrollo
  cacheDir: 'node_modules/.vite',
  clearScreen: false
}