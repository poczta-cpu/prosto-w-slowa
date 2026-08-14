/**
 * Treść wszystkich sekcji strony.
 *
 * Kolejność odpowiada strukturze z briefu marki: najpierw sprzedajemy
 * i tłumaczymy własną kategorię, a granice usługi stawiamy dopiero na końcu.
 * `icon` odwołuje się do nazw z `src/components/ui/Icon.astro`.
 */

export type Feature = {
  icon: string;
  title: string;
  body: string;
};

export type Step = Feature & { number: string };

export type FaqItem = {
  question: string;
  answer: string;
};

/* ── Hero ─────────────────────────────────────────────────────────────── */

export const HERO = {
  eyebrow: 'Rozmowy 1:1 online',
  title: 'Masz coś do przegadania?',
  lead: 'Umów rozmowę 1:1 online z Asią. 25 albo 50 minut, w których nie musisz zastanawiać się, czy temat jest wystarczająco ważny.',
  note: 'Bez oceniania. Bez naprawiania.',
  /* Krótkie fakty pod CTA — cena, czas i kamera mają być widoczne od razu. */
  facts: [
    { icon: 'clock', label: '25 albo 50 minut' },
    { icon: 'wallet', label: '79 zł albo 129 zł' },
    { icon: 'camera', label: 'Kamera opcjonalna' },
  ],
  portraitAlt:
    'Asia siedzi w jasnym pokoju przy oknie i trzyma w dłoniach kubek, patrzy w obiektyw',
  portraitCaption: 'prowadzę te rozmowy',
} as const;

/* ── Może znasz ten moment ────────────────────────────────────────────── */

export const MOMENTS = {
  eyebrow: 'Może znasz ten moment',
  title: 'Nie każdy brak rozmowy wynika z braku ludzi',
  lead: 'Czasem temat jest zbyt błahy, zbyt świeży albo dotyczy właśnie tych osób, z którymi normalnie się gada.',
  items: [
    {
      quote: 'Nie mam z kim tego przegadać.',
      body: 'Nie chodzi o to, że nie masz nikogo. Chodzi o to, że akurat teraz nikt nie ma na to głowy.',
    },
    {
      quote: 'Mam ludzi, ale akurat tego nie chcę mówić im.',
      body: 'Bo temat dotyczy właśnie ich albo kogoś, kogo oboje znacie.',
    },
    {
      quote: 'Nie potrzebuję terapii. Chcę po prostu z kimś pogadać.',
      body: 'I to jest w porządku. Nie każda rozmowa musi być od razu czymś większym.',
    },
    {
      quote: 'Nie chcę rady. Chcę to powiedzieć na głos.',
      body: 'Czasem samo ubranie tego w zdania układa połowę sprawy.',
    },
    {
      quote: 'Nie chcę nikomu zawracać głowy.',
      body: 'Tutaj nie zawracasz. To jest umówiony czas i on jest Twój.',
    },
    {
      quote: 'Chcę kogoś spoza całej tej sytuacji.',
      body: 'Kogoś, kto nie zna bohaterów i nie ma w tym żadnego interesu.',
    },
  ],
  /* Konkretne sceny — celowo zwykłe, żeby obniżyć próg wejścia. */
  scenes: [
    'randka, która nie do końca wypaliła',
    'decyzja o zmianie pracy, o której jeszcze nikt nie wie',
    'niezręczna sytuacja sprzed tygodnia',
    'myśli, które chodzą w kółko przed snem',
    'historia tak absurdalna, że trzeba ją komuś opowiedzieć',
    'dobra wiadomość, którą nie ma z kim uczcić',
  ],
  note: 'Nie trzeba mieć kryzysu, żeby mieć o czym pogadać.',
} as const;

/* ── Jak to działa ────────────────────────────────────────────────────── */

export const HOW_IT_WORKS = {
  eyebrow: 'Jak to działa',
  title: 'Cztery kroki i tyle',
  lead: 'Bez ankiet wstępnych, bez opisywania historii z góry i bez zobowiązań na przyszłość.',
  steps: [
    {
      number: '01',
      icon: 'clock',
      title: 'Wybierasz długość',
      body: '25 albo 50 minut. Nic więcej nie musisz na tym etapie ustalać.',
    },
    {
      number: '02',
      icon: 'calendar',
      title: 'Rezerwujesz termin',
      body: 'Wybierasz godzinę, która Ci pasuje, i opłacasz rozmowę z góry.',
    },
    {
      number: '03',
      icon: 'video',
      title: 'Łączymy się online',
      body: 'Dostajesz link. Kamerę włączasz, jeśli chcesz — sam dźwięk wystarczy.',
    },
    {
      number: '04',
      icon: 'chat',
      title: 'Rozmawiamy',
      body: 'O tym, o czym chcesz. Nie musisz zaczynać od początku historii.',
    },
  ] satisfies Step[],
} as const;

/* ── Dlaczego płatna rozmowa ──────────────────────────────────────────── */

export const WHY_PAID = {
  eyebrow: 'Dlaczego płatna rozmowa',
  title: 'Płacisz za czas, nie za rozwiązanie',
  lead: 'Nie kupujesz tego, że ktoś naprawi Twoją sprawę. Kupujesz czas, w którym nie musisz zastanawiać się, czy masz prawo zająć komuś uwagę.',
  items: [
    {
      icon: 'clock',
      title: 'Ten czas jest Twój',
      body: 'Przez 25 albo 50 minut nie dzielisz uwagi z niczym innym. Nikt nie odbiera telefonu i nie musi zaraz biec.',
    },
    {
      icon: 'balance',
      title: 'Nie musisz oddawać',
      body: 'Nie ma rewanżu. Nie musisz potem pytać „a co u Ciebie" i wysłuchiwać drugiej połowy.',
    },
    {
      icon: 'people',
      title: 'Nikt nie jest w to zamieszany',
      body: 'Nie znam Twojej mamy, szefa ani byłego. Nie mam w tej sprawie żadnego interesu.',
    },
    {
      icon: 'spark',
      title: 'Bez progu ważności',
      body: 'Nie ma poziomu, od którego temat „się liczy". Możesz przyjść z drobiazgiem.',
    },
  ] satisfies Feature[],
} as const;

/* ── O mnie ───────────────────────────────────────────────────────────── */

export const ABOUT = {
  eyebrow: 'O mnie',
  title: 'Cześć, jestem Asia',
  paragraphs: [
    'Prowadzę te rozmowy, bo lubię ludzi i lubię słuchać. Tyle. Nie jestem terapeutką, coachką ani ekspertką od życia i nie będę udawać, że jestem.',
    'Nie poprowadzę Cię, nie naprawię i nie powiem, co masz zrobić. Będę po drugiej stronie i będę słuchać. Jak trzeba — dopytam. Jak trzeba — pomilczę.',
    'Możesz mówić serio, chaotycznie, z humorem albo zacząć od „nie wiem, jak to powiedzieć". To też jest początek.',
  ],
  note: 'Naprawdę nie musisz się przygotowywać.',
  imageAlt: 'Asia patrzy w obiektyw — portret z bliska, w domowym wnętrzu',
  quote: 'Czasem nie chodzi o radę. Chodzi o to, żeby powiedzieć to na głos.',
} as const;

/* ── Cennik ───────────────────────────────────────────────────────────── */

export const PRICING = {
  eyebrow: 'Cennik',
  title: 'Ile to kosztuje',
  lead: 'Płacisz za konkretny czas. Bez pakietów, abonamentów i zapisywania się na cokolwiek dalej.',
  plans: [
    {
      duration: '25 minut',
      price: '79',
      currency: 'zł',
      body: 'Na jedną rzecz. Kiedy chcesz coś powiedzieć na głos i nie potrzebujesz do tego godziny.',
      featured: false,
      badge: '',
    },
    {
      duration: '50 minut',
      price: '129',
      currency: 'zł',
      body: 'Na spokojnie. Kiedy temat jest większy albo wiesz, że rozkręcasz się wolniej.',
      featured: true,
      badge: 'Najczęściej wybierane',
    },
  ],
  facts: [
    { icon: 'video', label: 'Rozmowy odbywają się online' },
    { icon: 'camera', label: 'Kamera opcjonalna — sam dźwięk też jest ok' },
    { icon: 'calendar', label: 'Odwołanie do 12 godzin przed rozmową — pełny zwrot' },
  ],
} as const;

/* ── Umów rozmowę (formularz) ─────────────────────────────────────────── */

export const BOOKING_SECTION = {
  eyebrow: 'Rezerwacja',
  title: 'Umów rozmowę',
  lead: 'Napisz, ile czasu chcesz i kiedy Ci pasuje. Odezwę się i ustalimy termin. Tematu nie musisz opisywać w wiadomości — od tego jest rozmowa.',
} as const;

/* ── FAQ ──────────────────────────────────────────────────────────────── */

export const FAQ = {
  eyebrow: 'FAQ',
  title: 'Pytania, które padają najczęściej',
  lead: '',
  items: [
    {
      question: 'Czy to terapia?',
      answer:
        'Nie. To płatna rozmowa 1:1 i nie zastępuje psychoterapii, konsultacji psychologicznej ani psychiatrycznej. Nie stawiam diagnoz i niczego nie leczę.',
    },
    {
      question: 'O czym mogę rozmawiać?',
      answer:
        'O tym, o czym chcesz — od wczorajszej niezręcznej sytuacji po rzecz, która chodzi Ci po głowie od miesięcy. Temat nie musi być poważny.',
    },
    {
      question: 'Czy muszę mieć włączoną kamerę?',
      answer: 'Nie. Kamera jest opcjonalna — możesz zostać przy samym dźwięku.',
    },
    {
      question: 'Czy muszę się przygotować?',
      answer:
        'Nie. Możesz zacząć dokładnie tam, gdzie jesteś — również od „nie wiem, od czego zacząć".',
    },
    {
      question: 'Ile trwa rozmowa?',
      answer: 'Do wyboru 25 albo 50 minut. Długość wybierasz przy rezerwacji.',
    },
    {
      question: 'Co, jeśli odwołam termin?',
      answer:
        'Do 12 godzin przed rozmową dostajesz pełny zwrot. Przy rezygnacji później niż 12 godzin przed terminem zwrot nie przysługuje.',
    },
    {
      question: 'Czy to, co powiem, zostaje między nami?',
      answer: 'Tak. Nie nagrywam rozmów i nie opowiadam o nich nikomu.',
    },
  ] satisfies FaqItem[],
} as const;

/* ── Granice usługi ───────────────────────────────────────────────────── */

export const LIMITS = {
  eyebrow: 'Granice usługi',
  title: 'Czego to nie jest',
  lead: 'Piszę to wprost, bo tak jest uczciwiej — i łatwiej Ci ocenić, czy to w ogóle jest dla Ciebie.',
  items: [
    'To nie jest psychoterapia ani konsultacja psychologiczna.',
    'To nie jest pomoc psychiatryczna ani interwencja kryzysowa.',
    'To nie jest coaching, mentoring ani doradztwo eksperckie.',
    'Nie stawiam diagnoz, nie leczę i nie obiecuję, że coś się rozwiąże.',
  ],
  crisis: {
    title: 'Jeśli dzieje się coś poważnego',
    body: 'Jeżeli Ty albo ktoś obok Ciebie jest w bezpośrednim zagrożeniu życia lub zdrowia, ta rozmowa nie jest właściwym miejscem. Zadzwoń pod numer alarmowy 112 albo skorzystaj z bezpłatnego telefonu wsparcia.',
    /* TODO: uzupełnić o zweryfikowane, aktualne numery telefonów wsparcia
       (brief, sekcja 16 — nie wpisujemy ich „na sztywno" bez weryfikacji).
       Format: { label: 'Kryzysowy Telefon Zaufania', number: '…', href: 'tel:…' } */
    helplines: [] as { label: string; number: string; href: string }[],
  },
} as const;

/* ── Końcowe CTA ──────────────────────────────────────────────────────── */

export const FINAL_CTA = {
  title: 'Masz coś do przegadania?',
  body: 'Wybierz 25 albo 50 minut i umów termin. Resztę ustalimy już w rozmowie.',
  note: 'Bez oceniania. Bez naprawiania.',
} as const;
