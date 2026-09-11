import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";

const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
const hosting = JSON.parse(
  await readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8"),
);

assert.match(html, /<html lang="zh-CN">/);
assert.match(html, /幻核动漫｜人工智能短剧与广告制作/);
assert.equal(html.includes("\r"), false, "构建入口必须使用稳定的换行格式");
assert.match(html, /src="\/assets\/[^"]+\.js"/);
assert.match(html, /href="\/assets\/[^"]+\.css"/);
assert.ok(
  (await stat(new URL("../dist/fonts/GeistPixel-Circle.woff2", import.meta.url))).size > 1000,
);
assert.equal(hosting.static.directory, "dist");
assert.equal(hosting.static.not_found_handling, "single-page-application");

console.log("构建产物测试通过");
