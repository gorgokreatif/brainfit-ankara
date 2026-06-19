// scripts/launch.js
// -----------------------------------------------------------------------------
// TEK KOMUT.  Kullanım:
//
//   node scripts/launch.js --branch=config/branch.ankara.json
//   node scripts/launch.js --branch=config/branch.ankara.json --deploy
//   node scripts/launch.js --branch=... --deploy --force-images
//
// Aşamalar:
//   1. branch.json'u oku & doğrula
//   2. İçeriği üret  (content.json)
//   3. Görselleri üret/doğrula (Magnific)
//   4. Tema değişkenlerini yaz (brand renkleri → CSS)
//   5. Next.js build
//   6. (--deploy ise) Vercel'e prod deploy
// -----------------------------------------------------------------------------

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { generateContent } from "./lib/content.js";
import { generateImages } from "./lib/magnific.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function arg(name, def = null) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (hit) return hit.split("=")[1];
  return process.argv.includes(`--${name}`) ? true : def;
}

function run(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { cwd, stdio: "inherit", shell: true });
    p.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} çıkış kodu ${code}`)));
  });
}

function validate(b) {
  const required = ["slug", "domain", "city", "contact", "brand", "programs"];
  const missing = required.filter((k) => !b[k]);
  if (missing.length) throw new Error(`branch.json eksik alanlar: ${missing.join(", ")}`);
}

async function writeTheme(root, b) {
  const c = b.brand.colors;
  const css = `:root{
  --ink:${c.ink};
  --primary:${c.primary};
  --primary-deep:${c.primaryDeep};
  --accent:${c.accent};
  --warm:${c.warm};
  --paper:${c.paper};
}`;
  const out = path.join(root, "site", "app", "theme.css");
  await fs.writeFile(out, css);
  console.log(`  ✓ Tema yazıldı → app/theme.css`);
}

async function main() {
  console.log("\n🧠  BrainFit Engine — site üretimi başlıyor\n");
  const branchPath = arg("branch");
  if (!branchPath) throw new Error("--branch=config/branch.<şehir>.json gerekli");
  if (arg("force-images")) process.env.FORCE_IMAGES = "1";

  const b = JSON.parse(await fs.readFile(path.resolve(ROOT, branchPath), "utf8"));
  validate(b);
  console.log(`📍  Şube: ${b.city}  (${b.domain})\n`);

  console.log("1/5  İçerik");
  await generateContent(ROOT, b);

  console.log("\n2/5  Görseller (Magnific)");
  await generateImages(ROOT, b);

  console.log("\n3/5  Tema");
  await writeTheme(ROOT, b);

  console.log("\n4/5  Build");
  await run("npm", ["run", "build"], path.join(ROOT, "site"));

  if (arg("deploy")) {
    console.log("\n5/5  Vercel deploy (prod)");
    // vercel CLI kurulu ve `vercel login` yapılmış olmalı.
    // Domain ataması için: vercel domains add <domain> (ilk seferde)
    await run("npx", ["vercel", "--prod", "--yes"], path.join(ROOT, "site"));
    console.log(`\n✅  Yayında olmalı: https://${b.domain}`);
    console.log("   (İlk kurulumsa: vercel domains add " + b.domain + " ile domaini bağla)");
  } else {
    console.log("\n5/5  Deploy atlandı (--deploy verilmedi). Yerel önizleme: cd site && npm run start");
  }

  console.log("\n🎉  Tamamlandı.\n");
}

main().catch((e) => { console.error("\n❌  Hata:", e.message, "\n"); process.exit(1); });
