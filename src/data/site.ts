/**
 * Globalne dane strony: metadane SEO, rezerwacja, kontakt, nawigacja.
 *
 * Wartości oznaczone TODO to placeholdery z briefu (sekcja „Elementy do
 * uzupełnienia przed publikacją”). Strona działa bez nich — po prostu
 * ukrywa to, czego jeszcze nie ma.
 */

export const SITE = {
  name: 'Prosto w słowa',
  /* TODO: meta title i description do domknięcia po wyborze domeny
     i badaniu fraz. Punkt wyjścia: język problemu, nie języka terapii. */
  title: 'Prosto w słowa — płatna rozmowa 1:1 online. Masz coś do przegadania?',
  description:
    'Umów rozmowę 1:1 online. 25 albo 50 minut, w których nie musisz zastanawiać się, czy temat jest wystarczająco ważny. Bez oceniania, bez naprawiania. To nie jest terapia.',
  lang: 'pl',
  locale: 'pl_PL',
  /** Osoba prowadząca rozmowy — używane w Schema.org i w treści. */
  host: 'Asia',
} as const;

/**
 * Rezerwacja — jedno miejsce na link do systemu rezerwacji i płatności.
 * Dopóki `href` jest pusty, wszystkie CTA prowadzą do formularza na stronie,
 * więc ścieżka „umów rozmowę” działa od pierwszego dnia.
 */
export const BOOKING = {
  /** TODO: docelowy adres systemu rezerwacji / płatności. */
  href: '',
  fallback: '#umow',
} as const;

export const bookingHref: string = BOOKING.href || BOOKING.fallback;

/** Czy rezerwacja idzie na zewnętrzny system (wtedy link otwieramy w nowej karcie). */
export const bookingIsExternal: boolean = BOOKING.href.startsWith('http');

/** Kontakt — usługa jest online, więc bez adresu i godzin otwarcia. */
export const CONTACT = {
  /** TODO: adres e-mail marki. Pusty = sekcja e-mail się nie pokazuje. */
  email: '',
  instagram: '@prosto_w_slowa',
  instagramHref: 'https://www.instagram.com/prosto_w_slowa/',
} as const;

export const NAV_LINKS = [
  { href: '#jak-to-dziala', label: 'Jak to działa' },
  { href: '#cennik', label: 'Cennik' },
  { href: '#o-mnie', label: 'O mnie' },
  { href: '#faq', label: 'FAQ' },
] as const;

/**
 * Główne CTA — powtarzane w kilku sekcjach, dlatego trzymane centralnie.
 * Przyciski mówią, co się wydarzy: „Umów rozmowę”, nie „Dowiedz się więcej”.
 */
export const CTA = {
  primary: { label: 'Umów rozmowę', href: bookingHref },
  secondary: { label: 'Jak to działa', href: '#jak-to-dziala' },
  pricing: { label: 'Zobacz cennik', href: '#cennik' },
} as const;

/** Prawne — do uzupełnienia razem z faktycznym procesem płatności. */
export const LEGAL = {
  /** TODO: adres regulaminu. Pusty = link w stopce się nie pokazuje. */
  termsHref: '',
  /** TODO: adres polityki prywatności. */
  privacyHref: '',
} as const;
