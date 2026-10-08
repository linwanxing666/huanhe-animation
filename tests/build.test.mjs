import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import { constants } from "node:fs";

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
const scriptName = (await readdir(new URL("../dist/assets/", import.meta.url))).find(
  (fileName) => fileName.endsWith(".js"),
);
assert.ok(scriptName, "正式构建必须包含应用脚本");
const appScript = await readFile(
  new URL(`../dist/assets/${scriptName}`, import.meta.url),
  "utf8",
);
assert.ok(
  appScript.includes(
    "https://github.com/linwanxing666/huanhe-animation/releases/download/site-media-v1/",
  ),
  "案例视频必须使用已发布的 GitHub 媒体直链",
);
for (const fileName of [
  "ragnarok-trailer.mp4",
  "hospital-chaos.mp4",
  "chosen-by-billionaire.mp4",
  "wedding-betrayal.mp4",
  "corporate-spy.mp4",
  "judge.mp4",
  "all-corrupted.mp4",
  "save-wolf-commentary.mp4",
  "farming-system.mp4",
  "aunt-baby.mp4",
  "lucky-child-shen-family.mp4",
  "family-reunion-banquet.mp4",
  "heiress-takes-control.mp4",
  "little-treasure.mp4",
  "sweetheart.mp4",
  "aunt-baby-trailer.mp4",
  "ten-million-order.mp4",
  "wife-in-car.mp4",
  "triplets-marry-rich.mp4",
  "black-gold-python.mp4",
  "dragon-blood.mp4",
  "touch-my-daughter.mp4",
  "contract-husband.mp4",
  "mermaid.mp4",
]) {
  assert.ok(appScript.includes(fileName), `${fileName} 必须进入正式构建配置`);
}
for (const fileName of [
  "wedding-betrayal.jpg",
  "corporate-spy.jpg",
  "judge.jpg",
  "all-corrupted.jpg",
  "save-wolf-commentary.jpg",
  "farming-system.jpg",
  "aunt-baby.jpg",
  "lucky-child-shen-family.jpg",
  "family-reunion-banquet.jpg",
  "heiress-takes-control.jpg",
  "little-treasure.jpg",
  "sweetheart.jpg",
  "aunt-baby-trailer.jpg",
  "ten-million-order.jpg",
  "wife-in-car.jpg",
  "triplets-marry-rich.jpg",
  "black-gold-python.jpg",
  "dragon-blood.jpg",
  "touch-my-daughter.jpg",
  "contract-husband.jpg",
  "mermaid.jpg",
]) {
  assert.ok(
    (await stat(new URL(`../dist/covers/${fileName}`, import.meta.url))).size > 10_000,
    `${fileName} 必须进入正式构建且不是空文件`,
  );
}
assert.ok(
  (await stat(new URL("../dist/contact/business-qr.jpg", import.meta.url))).size > 10_000,
  "商务二维码必须进入正式构建",
);
for (const retiredFile of ["werewolf.mp4", "angel.mp4", "werewolf.jpg", "angel.jpg"]) {
  await assert.rejects(
    access(
      new URL(
        retiredFile.endsWith(".mp4")
          ? `../dist/videos/${retiredFile}`
          : `../dist/covers/${retiredFile}`,
        import.meta.url,
      ),
      constants.F_OK,
    ),
    `${retiredFile} 必须从正式构建撤下`,
  );
}
assert.equal(hosting.static.directory, "dist");
assert.equal(hosting.static.not_found_handling, "single-page-application");

console.log("构建产物测试通过");
