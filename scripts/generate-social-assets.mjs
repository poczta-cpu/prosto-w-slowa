/**
 * Generuje zasoby graficzne do `public/`:
 *   • og-image.png       — 1200×630, podgląd przy udostępnianiu linku
 *   • apple-touch-icon.png — 180×180, ikona na ekranie głównym iOS
 *
 * Uruchomienie: `node scripts/generate-social-assets.mjs`
 * Skrypt korzysta z `sharp`, który jest już zależnością Astro.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const heroPath = path.join(root, 'src', 'assets', 'rozmowa-przy-oknie.png');

const INK = '#522B29';
const CREAM = '#F5F1E9';
const ACCENT = '#B9663D';

await mkdir(publicDir, { recursive: true });

/* ── Open Graph ───────────────────────────────────────────────────── */

// Zdjęcie po prawej stronie kadru, przycięte do 520×630
const photo = await sharp(heroPath).resize(520, 630, { fit: 'cover', position: 'top' }).toBuffer();

const overlay = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${CREAM}"/>
  <circle cx="72" cy="96" r="9" fill="${ACCENT}"/>
  <text x="98" y="104" font-family="Georgia, 'Times New Roman', serif" font-size="27" fill="${INK}">Prosto w słowa</text>
  <text x="72" y="268" font-family="Georgia, 'Times New Roman', serif" font-size="76" fill="${INK}">Twoja przestrzeń</text>
  <text x="72" y="352" font-family="Georgia, 'Times New Roman', serif" font-size="76" fill="${INK}">do rozmowy</text>
  <rect x="72" y="398" width="72" height="3" rx="2" fill="${ACCENT}"/>
  <text x="72" y="464" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="25" fill="#6F4F4A">Bezpieczne miejsce, gdzie możesz być sobą.</text>
  <text x="72" y="502" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="25" fill="#6F4F4A">Przyjazna atmosfera i otwarte uszy na Twoje potrzeby.</text>
</svg>`);

await sharp(overlay)
  .composite([{ input: photo, left: 680, top: 0 }])
  .png()
  .toFile(path.join(publicDir, 'og-image.png'));

/* ── Ikona iOS ────────────────────────────────────────────────────── */

const favicon = await readFile(path.join(publicDir, 'favicon.svg'));
await sharp(favicon, { density: 384 })
  .resize(180, 180)
  .flatten({ background: CREAM })
  .png()
  .toFile(path.join(publicDir, 'apple-touch-icon.png'));

await writeFile(
  path.join(publicDir, 'robots.txt'),
  'User-agent: *\nAllow: /\n',
  'utf8',
);

console.log('Wygenerowano: og-image.png, apple-touch-icon.png, robots.txt');
