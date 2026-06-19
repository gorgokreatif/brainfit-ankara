// scripts/lib/content.js
// -----------------------------------------------------------------------------
// branch.json'daki ham veriden, sitenin tüm metinlerini içeren tek bir
// content.json üretir. Bu, site/content/content.json'a yazılır ve Next.js
// build sırasında okunur. İçerik üretimini deterministik tutuyoruz
// (LLM çağrısı opsiyonel) — böylece her deploy aynı sonucu verir.
//
// İSTERSEN: USE_LLM=1 ile bu modül, şehre özel paragrafları Anthropic API
// üzerinden zenginleştirebilir. Anahtar yoksa şablon metne düşer.
// -----------------------------------------------------------------------------

import fs from "node:fs/promises";
import path from "node:path";

function baseContent(b) {
  return {
    meta: {
      domain: b.domain,
      city: b.city,
      title: `BrainFit ${b.city} — Beyin Egzersizi Merkezi`,
      description: b.seo?.defaultDescription,
      keywords: b.seo?.keywords || [],
    },
    hero: {
      eyebrow: `BrainFit ${b.city}`,
      title: "Öğrenmenin önündeki kök nedeni buluyoruz",
      subtitle:
        `Nöroplastisite temelli, kişiye özel beyin egzersizleriyle ${b.cityLocative} ` +
        `dikkat, hafıza ve öğrenme becerilerini güçlendiriyoruz.`,
      ctaPrimary: "Zihin Check-Up randevusu al",
      ctaSecondary: "Programları incele",
    },
    intro: {
      title: "BrainFit nedir?",
      body:
        "BrainFit, 2001'den bu yana bilimsel temelli nörobilimsel programlarla öğrenme " +
        "becerilerini geliştiren bütünsel bir beyin gelişim sistemidir. Beynin 5 temel " +
        "alanını ölçer, zayıf alanları kişiye özel egzersizlerle güçlendirir.",
    },
    skills: b.skills.map((s) => ({ name: s })),
    checkup: b.checkup,
    programs: b.programs,
    cta: {
      title: `${b.cityLocative} ilk adımı atın`,
      body: "Zihin Check-Up değerlendirmesiyle çocuğunuzun güçlü ve gelişime açık alanlarını netleştirelim.",
      button: "Hemen randevu al",
    },
    contact: b.contact,
    social: b.social,
  };
}

async function maybeEnrichWithLLM(content, b) {
  if (process.env.USE_LLM !== "1" || !process.env.ANTHROPIC_API_KEY) return content;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 600,
        messages: [{
          role: "user",
          content:
            `BrainFit ${b.city} şubesi için, kaygılı anne-babalara hitap eden, ` +
            `samimi ama güven veren 2 paragraflık (toplam ~90 kelime) Türkçe tanıtım metni yaz. ` +
            `Abartı/iddialı tıbbi vaat yok. Sadece metni döndür.`,
        }],
      }),
    });
    const data = await res.json();
    const text = data.content?.find((c) => c.type === "text")?.text?.trim();
    if (text) content.intro.body = text;
  } catch (e) {
    console.log(`  ⚠ LLM zenginleştirme atlandı: ${e.message}`);
  }
  return content;
}

export async function generateContent(root, branch) {
  let content = baseContent(branch);
  content = await maybeEnrichWithLLM(content, branch);
  const outDir = path.join(root, "site", "content");
  await fs.mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, "content.json");
  await fs.writeFile(outFile, JSON.stringify(content, null, 2));
  console.log(`  ✓ İçerik üretildi → ${path.relative(root, outFile)}`);
  return content;
}
