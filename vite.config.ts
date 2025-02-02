import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { name } from './package.json';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: 'src',
    base: env.DEPLOY_AS_SUB_FOLDER === 'true' ? `/${name}/` : '/',
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
  };
});
