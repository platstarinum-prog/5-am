import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { translate } from '@vitalets/google-translate-api';

const SOURCE_LANG = 'uk';
const TARGET_LANGS = ['ru', 'en'];

const DATA_GLOBS = [
  'src/data/products/*.json',
  'src/data/faq/*.json',
  'src/data/home.json',
  'src/data/faq.json',
];

function hasCyrillic(text) {
  return /[а-яА-ЯіІїЇєЄґҐ]/.test(text);
}

function shouldTranslate(value) {
  if (!value || typeof value !== 'string') return false;
  const t = value.trim();
  if (t.length < 2) return false;
  if (t.length > 500) return false;
  if (/^https?:\/\//.test(t)) return false;
  if (!hasCyrillic(t)) return false;
  return true;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function loadFiles() {
  const files = [];
  for (const pattern of DATA_GLOBS) {
    const matches = globSync(pattern);
    for (const f of matches) files.push(f);
  }
  return [...new Set(files)];
}

async function translateText(text, target) {
  try {
    const res = await translate(text, { from: SOURCE_LANG, to: target });
    return res.text;
  } catch (err) {
    return null;
  }
}

async function processFile(filePath) {
  const raw = readFileSync(filePath, 'utf-8');
  let data;
  try { data = JSON.parse(raw); } catch { return; }

  const toTranslate = [];

  const findMissing = (obj) => {
    if (!obj || typeof obj !== 'object') return;
    for (const key of Object.keys(obj)) {
      if (Array.isArray(obj[key])) {
        for (const item of obj[key]) findMissing(item);
      } else if (obj[key] && typeof obj[key] === 'object') {
        findMissing(obj[key]);
      } else if (typeof obj[key] === 'string') {
        const m = key.match(/^(.+)_(ru|en)$/);
        if (m) continue; // skip already localized fields
        if (!shouldTranslate(obj[key])) continue;
        for (const lang of TARGET_LANGS) {
          const lf = `${key}_${lang}`;
          if (obj[lf] && obj[lf].trim().length > 0) continue;
          toTranslate.push({ obj, field: key, base: obj[key], lang });
        }
      }
    }
  };

  findMissing(data);

  if (toTranslate.length === 0) {
    console.log(`  ✓ ${filePath}`);
    return;
  }

  console.log(`\n→ ${filePath}`);
  let modified = false;

  for (const { obj, field, base, lang } of toTranslate) {
    const lf = `${field}_${lang}`;
    if (obj[lf] && obj[lf].trim().length > 0) continue;

    process.stdout.write(`  ${field} → ${lang}... `);
    const translated = await translateText(base, lang);
    if (translated) {
      obj[lf] = translated;
      modified = true;
      console.log(`✓`);
    } else {
      console.log(`⏭`);
    }
    await sleep(400);
  }

  if (modified) {
    writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
    console.log(`  ✓ saved\n`);
  }
}

async function main() {
  console.log('🔍 Scanning for missing translations...\n');
  const files = loadFiles();
  console.log(`Found ${files.length} data files\n`);

  for (const file of files) {
    await processFile(file);
  }

  console.log('\n✅ Translation complete!');
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
