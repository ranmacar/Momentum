import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import mix from 'vite-plugin-mix';

export default defineConfig({
  plugins: [
    solidPlugin(),
    mix({ handler: './src/rest.js' })
  ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
