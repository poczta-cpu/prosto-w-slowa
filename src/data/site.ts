/**
 * Globalne dane strony: metadane SEO, dane kontaktowe, nawigacja.
 *
 * Wartości w nawiasach kwadratowych to świadome placeholdery — źródłowa
 * strona ich nie zawierała. Podmień je przed wdrożeniem produkcyjnym
 * (razem z `site` w astro.config.mjs).
 */

export const SITE = {
  name: 'Prosto w słowa',
  title: 'Prosto w słowa: Twoja przestrzeń do rozmowy',
  description:
    'Bezpieczne miejsce, gdzie możesz być sobą. Przyjazna atmosfera i otwarte uszy na Twoje potrzeby.',
  lang: 'pl',
  locale: 'pl_PL',
} as const;

/** Dane kontaktowe — do uzupełnienia przez właściciela strony. */
export const CONTACT = {
  address: '[ADRES FIRMY]',
  phone: '[NUMER TELEFONU]',
  /** Wersja telefonu do atrybutu href="tel:" — bez spacji, z prefiksem kraju. */
  phoneHref: '',
  email: '[ADRES EMAIL]',
  emailHref: '',
  hours: '[GODZINY KONTAKTU I SPOTKAŃ]',
} as const;

export const NAV_LINKS = [
  { href: '#o-nas', label: 'O nas' },
  { href: '#jak-to-dziala', label: 'Jak to działa' },
  { href: '#opinie', label: 'Opinie' },
  { href: '#filozofia', label: 'Filozofia' },
  { href: '#regulamin', label: 'Regulamin' },
  { href: '#faq', label: 'FAQ' },
] as const;

/** Główne CTA — powtarzane w kilku sekcjach, dlatego trzymane centralnie. */
export const CTA = {
  primary: { label: 'Umów się na spotkanie', href: '#kontakt' },
  secondary: { label: 'Skontaktuj się z nami', href: '#kontakt' },
  learnMore: { label: 'Dowiedz się więcej', href: '#o-nas' },
} as const;
