/**
 * Treść poszczególnych sekcji strony.
 *
 * Teksty pochodzą ze strony źródłowej — kolejność sekcji jest zachowana.
 * `icon` odwołuje się do nazw z `src/components/ui/Icon.astro`.
 */

export type Feature = {
  icon: string;
  title: string;
  body: string;
};

export type Step = Feature & { number: string };

export type Testimonial = {
  author: string;
  quote: string;
  rating: number;
};

export type FaqItem = {
  question: string;
  answer: string;
};

/* ── Hero ─────────────────────────────────────────────────────────────── */

export const HERO = {
  eyebrow: 'Przestrzeń do rozmowy',
  title: 'Prosto w słowa',
  titleAccent: 'Twoja przestrzeń do rozmowy',
  lead: 'Bezpieczne miejsce, gdzie możesz być sobą. Przyjazna atmosfera i otwarte uszy na Twoje potrzeby.',
  imageAlt:
    'Dwie osoby siedzące naprzeciw siebie i rozmawiające w jasnym, ciepłym wnętrzu z dużym oknem',
} as const;

/* ── O nas ────────────────────────────────────────────────────────────── */

export const ABOUT = {
  title: 'O nas',
  subtitle: 'Ciepło i profesjonalizm w jednym',
  imageAlt: 'Spokojne, minimalistyczne wnętrze w ciepłych, kremowych barwach',
  features: [
    {
      icon: 'heart',
      title: 'Kim jesteśmy',
      body: 'Miejsce, gdzie możesz porozmawiać o wszystkim. Bezpieczna atmosfera, w której poczujesz się wysłuchany i zrozumiany.',
    },
    {
      icon: 'leaf',
      title: 'Nasze podejście',
      body: 'Wierzymy w siłę rozmowy. Empatia, akceptacja i brak oceniania. Ulga i nowa perspektywa po każdej sesji.',
    },
    {
      icon: 'people',
      title: 'Dla kogo',
      body: 'Dla każdego, kto potrzebuje przestrzeni do wyrażenia siebie. Uporządkowania myśli i swobodnego wygadania.',
    },
  ] satisfies Feature[],
} as const;

/* ── Jak to działa ────────────────────────────────────────────────────── */

export const HOW_IT_WORKS = {
  title: 'Jak to działa?',
  subtitle: 'Prosty proces do Twojej dyspozycji',
  steps: [
    {
      number: '01',
      icon: 'phone',
      title: 'Kontakt',
      body: 'Skontaktuj się przez formularz lub telefon. Ustalimy dogodny termin i formę spotkania.',
    },
    {
      number: '02',
      icon: 'chat',
      title: 'Spotkanie',
      body: 'Przyjazna atmosfera. Porozmawiamy o tym, co dla Ciebie ważne. Skupiamy się na Twoich potrzebach.',
    },
    {
      number: '03',
      icon: 'sun',
      title: 'Ulga i perspektywa',
      body: 'Poczujesz się lżej. Nowe spojrzenie pomoże znaleźć najlepsze rozwiązania.',
    },
  ] satisfies Step[],
} as const;

/* ── Opinie ───────────────────────────────────────────────────────────── */

export const TESTIMONIALS = {
  title: 'Co mówią inni?',
  subtitle: 'Głosy zadowolonych klientów',
  items: [
    {
      author: 'Anna K.',
      quote:
        'Po rozmowie poczułam, jakby zrzuciłam ogromny ciężar z serca. Dziękuję za zrozumienie i wsparcie.',
      rating: 5,
    },
    {
      author: 'Marek S.',
      quote:
        'Nareszcie znalazłem miejsce, gdzie mogę być sobą bez obaw. Profesjonalizm i ciepło w jednym.',
      rating: 5,
    },
    {
      author: 'Ewa P.',
      quote: 'Asia jest świetna! Od razu poczułam się lepiej!',
      rating: 5,
    },
  ] satisfies Testimonial[],
} as const;

/* ── Filozofia ────────────────────────────────────────────────────────── */

export const PHILOSOPHY = {
  title: 'Nasza filozofia',
  subtitle: 'Siła prostych słów',
  imageAlt: 'Dłonie uniesione ku górze, nad nimi symbol dymku dialogowego',
  values: [
    {
      icon: 'chat',
      title: 'Otwarta rozmowa',
      body: 'Kluczem do zrozumienia jest szczera i otwarta rozmowa. Bez filozofii i zawiłości.',
    },
    {
      icon: 'shield',
      title: 'Autentyczność',
      body: 'Stawiamy na autentyczność i zaufanie. Przestrzeń do swobodnego wyrażania emocji i myśli.',
    },
    {
      icon: 'balance',
      title: 'Bez ocen',
      body: 'Spotkania to nie terapia, ale miejsce gdzie możesz być sobą. Bez sądu i oczekiwań.',
    },
  ] satisfies Feature[],
} as const;

/* ── Regulamin ────────────────────────────────────────────────────────── */

export const RULES = {
  title: 'Regulamin',
  subtitle: 'Jasne zasady dla Twojego komfortu',
  items: [
    {
      number: '1',
      title: 'Zasady współpracy',
      body: 'Zapoznaj się z naszymi zasadami, aby zapewnić komfort i bezpieczeństwo obu stronom.',
    },
    {
      number: '2',
      title: 'Poufność',
      body: 'Regulamin określa zasady poufności wszystkich rozmów i informacji udostępnionych podczas spotkań.',
    },
    {
      number: '3',
      title: 'Odwołania',
      body: 'Informacje o zasadach odwoływania spotkań oraz oczekiwaniach wobec uczestników.',
    },
  ],
  link: {
    label: 'Link do pełnego regulaminu',
    note: 'Zapoznaj się ze szczegółowymi zasadami współpracy',
    // TODO: podmień na adres pliku PDF lub podstrony z regulaminem.
    href: '#regulamin',
  },
} as const;

/* ── Kontakt ──────────────────────────────────────────────────────────── */

export const CONTACT_SECTION = {
  title: 'Kontakt',
  subtitle: 'Jesteśmy tu dla Ciebie',
  imageAlt: 'Jasne wejście z łukowatymi drzwiami, otoczone zielenią w słonecznym świetle',
  formNote:
    'Wypełnij formularz — odezwiemy się, aby ustalić dogodny termin. Możesz też zadzwonić lub napisać bezpośrednio.',
} as const;

/* ── FAQ ──────────────────────────────────────────────────────────────── */

export const FAQ = {
  title: 'FAQ',
  subtitle: 'Najczęściej zadawane pytania',
  items: [
    {
      question: 'Czy to terapia?',
      answer:
        'Nie, nasze spotkania to nie terapia, a przestrzeń do swobodnej rozmowy i wygadania się.',
    },
    {
      question: 'Czy rozmowy są poufne?',
      answer:
        'Tak, gwarantujemy pełną poufność wszystkich naszych rozmów i informacji udostępnionych podczas spotkań.',
    },
    {
      question: 'Jak długo trwa spotkanie?',
      answer: 'Standardowe spotkanie trwa 60 minut. Mamy czas na wszystko, co chcesz powiedzieć.',
    },
    {
      question: 'Czy mogę odwołać spotkanie?',
      answer:
        'Tak, prosimy o informację z 24-godzinnym wyprzedzeniem, aby uwolnić termin dla innych.',
    },
  ] satisfies FaqItem[],
} as const;

/* ── Końcowe CTA ──────────────────────────────────────────────────────── */

export const FINAL_CTA = {
  title: 'Dołącz do nas',
  subtitle: 'Zacznij rozmowę już dziś',
  columns: [
    {
      title: 'Nie czekaj',
      body: 'Nie czekaj, aż problemy Cię przytłoczą. Znajdź przestrzeń, by się wygadać i poczuć lepiej.',
    },
    {
      title: 'Twoja przystań',
      body: '„Prosto w słowa” – Twoja przystań w świecie pełnym zgiełku. Miejsce, gdzie możesz być sobą.',
    },
  ],
} as const;
