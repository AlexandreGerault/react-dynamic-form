import typescript from '@rollup/plugin-typescript';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'A multi-step form',
      // the proper extensions will be added
      fileName: 'react-dynamic-form',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom'],
      plugins: [
        typescript({
          target: 'esnext',
          declaration: true,
          declarationDir: 'dist',
          exclude: ['node_modules/**', 'tests/**'],
          allowSyntheticDefaultImports: true,
        }),
      ],
    },
  },
  plugins: [react(), tsconfigPaths()],
});
