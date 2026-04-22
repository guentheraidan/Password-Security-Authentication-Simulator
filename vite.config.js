import { defineConfig } from 'vite';
import react          from '@vitejs/plugin-react';
import wasm           from 'vite-plugin-wasm';
import topLevelAwait  from 'vite-plugin-top-level-await';

export default defineConfig({
  plugins: [
    react(),
    wasm(),
    topLevelAwait(),
  ],
  worker: {
    format:  'es',
    plugins: () => [wasm(), topLevelAwait()],
  },
  build: {
    target: 'es2022',
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom', 'react-router-dom'],
          'vendor-crypto': ['bcryptjs', 'crypto-js', 'hash-wasm'],
          'vendor-otp':    ['otpauth', 'qrcode.react'],
          'vendor-zxcvbn': ['zxcvbn'],
        },
      },
    },
  },
});
