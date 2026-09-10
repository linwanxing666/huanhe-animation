import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "dist");

const read = (name) => readFile(path.join(root, name), "utf8");

async function run() {
  const html = await read("index.html");
  const css = await read("styles.css");
  const js = await read("main.js");
  assert.match(html, /<html lang="zh-CN">/);
  assert.match(html, /<title>幻核动漫｜人工智能短剧与广告制作<\/title>/);
  assert.match(html, /hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7\.mp4/);
  assert.match(html, /首页/);
  assert.match(html, /服务/);
  assert.match(html, /案例/);
  assert.match(html, /联系/);
  assert.match(html, /人工智能短剧制作/);
  assert.match(html, /广告商单制作/);
  assert.match(html, /<span>让想象，<\/span>[\s\S]*<span>直接开拍<\/span>/);
  assert.match(html, /aria-label="打开导航菜单"/);
  assert.match(html, /assets\/logo\.webp/);
  assert.match(html, /fonts\/GeistPixel-Circle\.woff2/);
  assert.doesNotMatch(html, />\s*(Home|Product|Case Studies|Contact|Get Started|Sign in)\s*</i);

  const visibleText = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ");
  assert.doesNotMatch(visibleText, /[A-Za-z]{2,}/, "页面可见区域不应出现英文单词");

  assert.match(css, /height:\s*100dvh/);
  assert.match(css, /overflow:\s*hidden/);
  assert.match(css, /\.bg-video\s*\{[\s\S]*object-fit:\s*cover/);
  assert.match(css, /\.page\s*\{[\s\S]*display:\s*flex/);
  assert.match(css, /@media\s*\(max-width:\s*720px\)/);
  assert.match(css, /\.desktop-nav[\s\S]*display:\s*none/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /font-family:\s*"Geist Pixel Circle"/);

  assert.match(js, /setAttribute\("aria-expanded"/);
  assert.match(js, /event\.key === "Escape"/);
  assert.match(js, /window\.innerWidth > 720/);
  assert.match(js, /IntersectionObserver/);
  assert.match(js, /requestAnimationFrame/);
  assert.match(js, /prefers-reduced-motion/);
  assert.match(js, /1500 \+ index \* 80/);

  assert.ok((await stat(path.join(root, "assets", "logo.webp"))).size > 1000);
  assert.ok((await stat(path.join(root, "fonts", "GeistPixel-Circle.woff2"))).size > 1000);

  console.log("页面结构测试通过");
}

run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
