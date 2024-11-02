import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  root: 'src',
  base: '/arknights-scoreboard/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  /**
   * @todo 映射为 public/rules
   */
  publicDir: path.resolve(__dirname, './'),
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
});
