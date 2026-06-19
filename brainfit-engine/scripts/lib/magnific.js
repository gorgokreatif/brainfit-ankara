// scripts/lib/magnific.js
// -----------------------------------------------------------------------------
// Magnific görsel üretimi. İKİ MOD destekler:
//
//  1) MCP modu  (önerilen): Sen Claude.ai'da Magnific MCP'ni bağlamışsın.
//     Bu durumda görselleri Claude'a ürettirip dosyaları buraya koyarsın;
//     pipeline sadece varlık kontrolü yapar. (En güvenli, retry maliyeti sende.)
//
//  2) API modu: MAGNIFIC_API_KEY env değişkeni varsa doğrudan REST çağrısı.
//     NOT: Magnific'in resmi public REST şeması değişebildiği için endpoint'i
//     .env üzerinden konfigüre edilebilir bıraktım (MAGNIFIC_ENDPOINT).
//
// Hangi modda olursan ol, çıktı public/generated/<key>.jpg olarak yazılır.
// -----------------------------------------------------------------------------

import fs from "node:fs/promises";
import path from "node:path";

const OUT_DIR = (root) => path.join(root, "site", "public", "generated");

async function fileExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

/**
 * Tek bir görseli üretir/doğrular.
 * @returns {Promise<{key:string, file:string, mode:string, skipped:boolean}>}
 */
async function ensureAsset(root, asset) {
  const outDir = OUT_DIR(root);
  await fs.mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, `${asset.key}.jpg`);

  // Zaten varsa ve --force verilmediyse tekrar üretme (retry maliyetini kısar)
  if (await fileExists(outFile) && process.env.FORCE_IMAGES !== "1") {
    return { key: asset.key, file: outFile, mode: "cache", skipped: true };
  }

  const apiKey = process.env.MAGNIFIC_API_KEY;
  const endpoint = process.env.MAGNIFIC_ENDPOINT;

  if (apiKey && endpoint) {
    // ---- API MODU --------------------------------------------------------
    const [w, h] = (asset.size || "1600x1000").split("x").map(Number);
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ prompt: asset.prompt, width: w, height: h }),
    });
    if (!res.ok) {
      throw new Error(`Magnific API ${asset.key} başarısız: ${res.status} ${await res.text()}`);
    }
    const data = await res.json();
    const imgUrl = data.url || data.image_url || data.output?.[0];
    if (!imgUrl) throw new Error(`Magnific yanıtında görsel URL'i yok: ${asset.key}`);
    const imgRes = await fetch(imgUrl);
    const buf = Buffer.from(await imgRes.arrayBuffer());
    await fs.writeFile(outFile, buf);
    return { key: asset.key, file: outFile, mode: "api", skipped: false };
  }

  // ---- MCP / MANUEL MOD --------------------------------------------------
  // API anahtarı yoksa, görselin Magnific MCP üzerinden üretilip buraya
  // konmasını bekleriz. Placeholder bir SVG yazıp pipeline'ı durdurmuyoruz,
  // ama net bir uyarı bırakıyoruz.
  const placeholder = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000">
  <rect width="100%" height="100%" fill="#0B3D7A"/>
  <text x="50%" y="50%" fill="#36C0C9" font-family="sans-serif" font-size="40"
    text-anchor="middle">${asset.key} — Magnific ile üret</text>
</svg>`;
  await fs.writeFile(outFile.replace(/\.jpg$/, ".svg"), placeholder);
  return { key: asset.key, file: outFile, mode: "placeholder", skipped: false,
           prompt: asset.prompt };
}

export async function generateImages(root, branch) {
  const assets = branch.imagery?.assets || [];
  const results = [];
  for (const a of assets) {
    process.stdout.write(`  🎨 ${a.key} ... `);
    const r = await ensureAsset(root, a);
    console.log(r.mode === "placeholder" ? "⚠ placeholder (Magnific bekliyor)" : `✓ ${r.mode}`);
    results.push(r);
  }
  const pending = results.filter((r) => r.mode === "placeholder");
  if (pending.length) {
    console.log("\n  ⚠ Şu görseller Magnific ile üretilmeli ve public/generated/ altına .jpg olarak konmalı:");
    pending.forEach((p) => console.log(`     - ${p.key}.jpg  →  prompt: "${p.prompt}"`));
  }
  return results;
}
