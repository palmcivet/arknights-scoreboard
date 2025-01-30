import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  root: 'src',
  base: '/arknights-scoreboard/',
  envDir: path.resolve(__dirname, './'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@rules': path.resolve(__dirname, './rules'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, './dist'),
    emptyOutDir: true,
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
});
