// @ts-check
import { defineConfig } from 'astro/config';

// UWAGA: `site` musi wskazywać docelową domenę — jest używane do budowy
// absolutnych URL-i w tagach Open Graph, canonical i w Schema.org.
//
// Obecna konfiguracja celuje w GitHub Pages, gdzie strona stoi w podkatalogu
// o nazwie repozytorium: https://poczta-cpu.github.io/prosto-w-slowa/
//
// Przy przenosinach na własną domenę (Cloudflare Pages) ustaw `site` na tę
// domenę i USUŃ `base` — tam strona serwowana jest z roota. Ścieżki do plików
// z `public/` przechodzą przez `withBase` w BaseLayout, więc zadziałają w obu
// wariantach bez dalszych zmian.
export default defineConfig({
  site: 'https://poczta-cpu.github.io',
  base: '/prosto-w-slowa',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    // Domyślny serwis Sharp — generuje AVIF/WebP w czasie builda.
    responsiveStyles: true,
  },
  devToolbar: {
    enabled: false,
  },
});
