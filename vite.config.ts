import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro({ 
      preset: "vercel",
      externals: {
        inline: ["tslib"]
      }
    }),
    react(),
  ],
  resolve: {
    alias: {
      'tslib': 'tslib/tslib.es6.mjs'
    },
    tsconfigPaths: true,
  },
  ssr: {
    // Vercel Nitro trace bug workaround: Inline everything during Vercel build.
    // We only apply this during 'build' so it doesn't break React CJS interop in local 'npm run dev'
    noExternal: command === 'build' ? true : undefined,
  },
  server: {
    host: "::",
    port: 5173,
  },
}));
