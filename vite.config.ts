import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve, join } from 'path';
import { readdirSync } from 'fs';
import packageJSON from './package.json';

const srcPath = resolve('./src');
const srcRootContent = readdirSync(srcPath);

const absolutePathAliases = {
  '@': resolve(__dirname, 'src'),
  '@features': resolve(__dirname, 'src/features'),
};

srcRootContent.forEach((directory) => {
  if (!packageJSON.dependencies[directory] && !packageJSON.devDependencies[directory])
    absolutePathAliases[directory] = join(srcPath, directory);
});

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: absolutePathAliases,
  },
  build: {
    outDir: './dist',
  },
  esbuild: { drop: ['console', 'debugger'] },
});
