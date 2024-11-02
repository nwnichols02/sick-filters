import react from '@vitejs/plugin-react-swc';
import { defineConfig, mergeConfig } from 'vite'
import { tanstackViteConfig } from '@tanstack/config/vite'

const config = defineConfig({
  plugins: [ react()]
});

export default mergeConfig(
  config,
  tanstackViteConfig({
    entry: './src/index.ts',
    srcDir: './src',
  }),
)