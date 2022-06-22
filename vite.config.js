import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"
import persistPlugin from "./persist-plugin"

export default defineConfig({
  plugins: [
    persistPlugin({
      file: {
        // base: '/home/ranmacar/ram'
      }
    }),
    solidPlugin(),
  ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
