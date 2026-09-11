import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const stableLineEndings = {
  name: "stable-line-endings",
  enforce: "pre",
  transformIndexHtml(html) {
    return html.replace(/\r\n?/g, "\n");
  },
};

export default defineConfig({
  plugins: [stableLineEndings, react()],
  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.jsx"],
    setupFiles: "./tests/setup.js",
  },
});
