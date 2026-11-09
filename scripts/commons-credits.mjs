#!/usr/bin/env node
/**
 * Completa autor y licencia de las fotos de Wikimedia Commons en src/data/photos.json.
 *
 * - Verifica que cada archivo exista (si un nombre está mal escrito, falla).
 * - Resuelve entradas con "category" eligiendo la primera foto de esa categoría.
 * - Trae autor, licencia y URL de licencia desde la API de Commons (extmetadata).
 *
 * Uso: node scripts/commons-credits.mjs   (corre solo también en "predeploy")
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const PHOTOS_PATH = fileURLToPath(new URL("../src/data/photos.json", import.meta.url));
const API = "https://commons.wikimedia.org/w/api.php";
const HEADERS = {
  // Wikimedia pide un User-Agent identificable para clientes automáticos.
  "User-Agent": "tigre-turismo-credits/1.0 (https://github.com/Laura-M-stack/tigre-turismo)",
};

function stripHtml(html) {
  return String(html ?? "")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanAuthor(author) {
  if (!author) return null;
  const flickr = author.match(/flickr\.com\/(?:people|photos)\/([^/\s]+)/i);
  if (flickr) return `${decodeURIComponent(flickr[1])} (Flickr)`;
  return author.replace(/[…\s]+$/u, "").trim() || null;
}

async function api(params) {
  const url = new URL(API);
  Object.entries({ format: "json", formatversion: "2", origin: "*", ...params }).forEach(([k, v]) =>
    url.searchParams.set(k, v),
  );
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`Commons API ${res.status} ${res.statusText}`);
  return res.json();
}

async function firstFileInCategory(category) {
  const data = await api({
    action: "query",
    list: "categorymembers",
    cmtitle: `Category:${category}`,
    cmtype: "file",
    cmlimit: "50",
  });
  const files = (data.query?.categorymembers ?? [])
    .map((m) => m.title.replace(/^File:/, ""))
    .filter((t) => /\.(jpe?g|png|webp)$/i.test(t));
  return files[0] ?? null;
}

async function fetchMetadata(files) {
  const out = new Map();
  for (let i = 0; i < files.length; i += 40) {
    const chunk = files.slice(i, i + 40);
    const data = await api({
      action: "query",
      prop: "imageinfo",
      iiprop: "extmetadata",
      titles: chunk.map((f) => `File:${f}`).join("|"),
    });
    const normalized = new Map((data.query?.normalized ?? []).map((n) => [n.to, n.from]));
    for (const page of data.query?.pages ?? []) {
      const requested = (normalized.get(page.title) ?? page.title).replace(/^File:/, "");
      if (page.missing) {
        out.set(requested, null);
        continue;
      }
      const meta = page.imageinfo?.[0]?.extmetadata ?? {};
      out.set(requested, {
        resolvedFile: page.title.replace(/^File:/, ""),
        author: cleanAuthor(stripHtml(meta.Artist?.value) || stripHtml(meta.Credit?.value) || null),
        license: stripHtml(meta.LicenseShortName?.value) || null,
        licenseUrl: meta.LicenseUrl?.value || null,
      });
    }
  }
  return out;
}

async function main() {
  const photos = JSON.parse(await readFile(PHOTOS_PATH, "utf8"));
  const problems = [];

  for (const [key, entry] of Object.entries(photos)) {
    if (entry.category && !entry.file) {
      entry.file = await firstFileInCategory(entry.category);
      if (!entry.file) problems.push(`${key}: la categoría "${entry.category}" no tiene fotos`);
    }
  }

  const files = Object.values(photos)
    .map((e) => e.file)
    .filter(Boolean);
  const meta = await fetchMetadata([...new Set(files)]);

  for (const [key, entry] of Object.entries(photos)) {
    if (!entry.file) continue;
    const m = meta.get(entry.file);
    if (!m) {
      problems.push(`${key}: no existe "${entry.file}" en Commons`);
      continue;
    }
    entry.file = m.resolvedFile;
    entry.author = m.author ?? entry.author;
    entry.license = m.license ?? entry.license;
    entry.licenseUrl = m.licenseUrl ?? entry.licenseUrl;
    if (!entry.license) problems.push(`${key}: sin licencia en Commons`);
  }

  await writeFile(PHOTOS_PATH, `${JSON.stringify(photos, null, 2)}\n`, "utf8");

  console.table(
    Object.fromEntries(
      Object.entries(photos).map(([k, e]) => [k, { autor: e.author, licencia: e.license }]),
    ),
  );

  if (problems.length) {
    console.error(`\n${problems.length} problema(s):\n- ${problems.join("\n- ")}`);
    process.exit(1);
  }
  console.log("\nCréditos actualizados en src/data/photos.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
