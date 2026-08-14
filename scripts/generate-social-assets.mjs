/**
 * Generuje zasoby graficzne do `public/`:
 *   • og-image.png         — 1200×630, podgląd przy udostępnianiu linku
 *   • apple-touch-icon.png — 180×180, ikona na ekranie głównym iOS
 *   • robots.txt
 *
 * Uruchomienie: `node scripts/generate-social-assets.mjs`
 * Skrypt korzysta z `sharp`, który jest już zależnością Astro.
 *
 * Grafika jest w całości rysowana — nie używamy zdjęć stockowych.
 * Kroje marki (Archivo Black, Cormorant Garamond) nie są dostępne dla
 * renderera SVG, więc sięgamy po najbliższe systemowe odpowiedniki.
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
  <text x="76" y="252" font-family="${DISPLAY}" font-size="74" fill="${BURGUNDY}">Masz coś</text>
  <text x="76" y="336" font-family="${DISPLAY}" font-size="74" fill="${BURGUNDY}">do przegadania?</text>

  <!-- podtytuł -->
  <text x="76" y="404" font-family="${BODY}" font-size="26" fill="${MUTED}">Rozmowa 1:1 online. 25 albo 50 minut,</text>
  <text x="76" y="442" font-family="${BODY}" font-size="26" fill="${MUTED}">w których nie musisz uzasadniać tematu.</text>

  <!-- odręczny dopisek -->
  <text x="76" y="512" font-family="${SERIF}" font-size="30" font-style="italic" fill="${BERRY}">Bez oceniania. Bez naprawiania.</text>

  <!-- cena -->
  <rect x="76" y="546" width="196" height="46" rx="23" fill="${BURGUNDY}"/>
  <text x="102" y="577" font-family="${BODY}" font-size="21" fill="${CREAM}">25 min — 79 zł</text>
  <rect x="288" y="546" width="204" height="46" rx="23" fill="${BURGUNDY}"/>
  <text x="314" y="577" font-family="${BODY}" font-size="21" fill="${CREAM}">50 min — 129 zł</text>

  <!-- dymek po prawej -->
  <g transform="translate(830 150)" fill="none" stroke="${BURGUNDY}" stroke-width="9" stroke-linejoin="round">
    <path d="M10 60a56 56 0 0 1 56-56h140a56 56 0 0 1 56 56v70a56 56 0 0 1-56 56H108l-63 49v-49h-7a28 28 0 0 1-28-28V60Z"/>
  </g>
  <circle cx="1000" cy="245" r="14" fill="${BLUE}"/>
</svg>`);

await sharp(og).png().toFile(path.join(publicDir, 'og-image.png'));

/* ── Ikona iOS ────────────────────────────────────────────────────── */

const favicon = await readFile(path.join(publicDir, 'favicon.svg'));
await sharp(favicon, { density: 384 })
  .resize(180, 180)
  .flatten({ background: BURGUNDY })
  .png()
  .toFile(path.join(publicDir, 'apple-touch-icon.png'));

await writeFile(path.join(publicDir, 'robots.txt'), 'User-agent: *\nAllow: /\n', 'utf8');

console.log('Wygenerowano: og-image.png, apple-touch-icon.png, robots.txt');
