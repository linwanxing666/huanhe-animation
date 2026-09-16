import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const distDir = new URL("../dist/", import.meta.url);
const indexHtml = readFileSync(new URL("index.html", distDir), "utf8");
assert.ok(
  existsSync(new URL("404.html", distDir)),
  "GitHub Pages 构建必须生成 404 回退页",
);
const notFoundHtml = readFileSync(new URL("404.html", distDir), "utf8");
const routeNames = ["services", "cases", "contact"];
const assetDir = new URL("assets/", distDir);
const scriptName = readdirSync(assetDir).find((name) => name.endsWith(".js"));

assert.ok(scriptName, "GitHub Pages 构建必须包含应用脚本");
assert.match(
  indexHtml,
  /(?:src|href)="\/huanhe-animation\/assets\//,
  "入口资源必须使用 GitHub Pages 仓库子路径",
);

const appScript = readFileSync(
  fileURLToPath(new URL(`assets/${scriptName}`, distDir)),
  "utf8",
);
assert.ok(
  appScript.includes("/huanhe-animation/") &&
    appScript.includes("videos/soul-guide.mp4"),
  "案例视频必须包含 GitHub Pages 仓库前缀与正确文件路径",
);
assert.ok(
  appScript.includes("/huanhe-animation/") &&
    appScript.includes("covers/soul-guide.jpg"),
  "案例封面必须包含 GitHub Pages 仓库前缀与正确文件路径",
);
assert.equal(
  notFoundHtml,
  indexHtml,
  "404 回退页必须加载同一应用，以支持直接打开内页",
);
for (const routeName of routeNames) {
  const routeFile = new URL(`${routeName}/index.html`, distDir);
  assert.ok(
    existsSync(routeFile),
    `GitHub Pages 构建必须生成 ${routeName} 内页入口`,
  );
  assert.equal(
    readFileSync(routeFile, "utf8"),
    indexHtml,
    `${routeName} 内页入口必须加载同一应用`,
  );
}

console.log("GitHub Pages 构建产物测试通过");
