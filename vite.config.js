import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        events: resolve(__dirname, 'events.html'),
        people: resolve(__dirname, 'people.html'),
        join: resolve(__dirname, 'join.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: false,
  },
});
