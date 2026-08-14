/**
 * Generuje zasoby graficzne do `public/`:
 *   • og-image.png         — 1200×630, podgląd przy udostępnianiu linku
 *   • apple-touch-icon.png — 180×180, ikona na ekranie głównym iOS
 *   • robots.txt
 *
 * Uruchomienie: `node scripts/generate-social-assets.mjs`
 * Skrypt korzysta z `sharp`, który jest już zależnością Astro.
 *
 * Podgląd składa się z rysowanego tła marki i zdjęcia Asi z hero — tego
 * samego, które widać po wejściu na stronę. Kroje marki (Archivo Black,
 * Cormorant Garamond) nie są dostępne dla renderera SVG, więc sięgamy
 * po najbliższe systemowe odpowiedniki.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');

const CREAM = '#FAF5EE';
const BURGUNDY = '#3E090A';
const BLUE = '#1880BB';
const PEACH = '#F0D7C1';
const BERRY = '#8A1A2D';
const MUTED = '#6B4143';

const DISPLAY = "'Arial Black', 'Helvetica Neue', Impact, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";
const BODY = "'Segoe UI', Helvetica, Arial, sans-serif";

await mkdir(publicDir, { recursive: true });

/* ── Open Graph ───────────────────────────────────────────────────── */

const og = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="glow" cx="0.82" cy="0.18" r="0.75">
      <stop offset="0%" stop-color="${PEACH}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="${CREAM}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="${CREAM}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- logotyp -->
  <circle cx="76" cy="92" r="9" fill="${BLUE}"/>
  <text x="100" y="101" font-family="${DISPLAY}" font-size="24" fill="${BURGUNDY}">Prosto w słowa</text>

  <!-- hasło -->
  <text x="76" y="244" font-family="${DISPLAY}" font-size="66" fill="${BURGUNDY}">Masz coś</text>
  <text x="76" y="318" font-family="${DISPLAY}" font-size="66" fill="${BURGUNDY}">do przegadania?</text>

  <!-- podtytuł -->
  <text x="76" y="382" font-family="${BODY}" font-size="25" fill="${MUTED}">Rozmowa 1:1 online z Asią. 25 albo 50 minut,</text>
  <text x="76" y="418" font-family="${BODY}" font-size="25" fill="${MUTED}">w których nie musisz uzasadniać tematu.</text>

  <!-- odręczny dopisek -->
  <text x="76" y="486" font-family="${SERIF}" font-size="29" font-style="italic" fill="${BERRY}">Bez oceniania. Bez naprawiania.</text>

  <!-- cena -->
  <rect x="76" y="522" width="196" height="46" rx="23" fill="${BURGUNDY}"/>
  <text x="102" y="553" font-family="${BODY}" font-size="21" fill="${CREAM}">25 min — 79 zł</text>
  <rect x="288" y="522" width="204" height="46" rx="23" fill="${BURGUNDY}"/>
  <text x="314" y="553" font-family="${BODY}" font-size="21" fill="${CREAM}">50 min — 129 zł</text>

  <!-- cienka linia domykająca kadr od strony zdjęcia -->
  <rect x="756" y="0" width="4" height="630" fill="${PEACH}"/>
</svg>`);

// Zdjęcie po prawej — ten sam kadr, który stoi w hero
const photo = await sharp(path.join(root, 'src', 'assets', 'asia-hero.jpg'))
  .resize(440, 630, { fit: 'cover', position: 'centre' })
  .toBuffer();

await sharp(og)
  .composite([{ input: photo, left: 760, top: 0 }])
  .png()
  .toFile(path.join(publicDir, 'og-image.png'));

/* ── Ikona iOS ────────────────────────────────────────────────────── */

const favicon = await readFile(path.join(publicDir, 'favicon.svg'));
await sharp(favicon, { density: 384 })
  .resize(180, 180)
  .flatten({ background: BURGUNDY })
  .png()
  .toFile(path.join(publicDir, 'apple-touch-icon.png'));

await writeFile(path.join(publicDir, 'robots.txt'), 'User-agent: *\nAllow: /\n', 'utf8');

console.log('Wygenerowano: og-image.png, apple-touch-icon.png, robots.txt');
