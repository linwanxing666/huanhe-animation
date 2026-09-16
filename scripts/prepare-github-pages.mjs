import { copyFileSync, mkdirSync } from "node:fs";

const distDir = new URL("../dist/", import.meta.url);
const indexFile = new URL("index.html", distDir);
const routeNames = ["services", "cases", "contact"];

copyFileSync(indexFile, new URL("404.html", distDir));

for (const routeName of routeNames) {
  const routeDir = new URL(`${routeName}/`, distDir);
  mkdirSync(routeDir, { recursive: true });
  copyFileSync(indexFile, new URL("index.html", routeDir));
}
