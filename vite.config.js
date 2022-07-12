import { defineConfig } from "vite"
import persistPlugin from "./persist-plugin"

export default defineConfig({
  plugins: [
    persistPlugin({
      file: {
        // base: '/home/ranmacar/ram'
      }
    }),
  ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
