/**
 * Obsługa nagłówka: stan po przewinięciu, menu mobilne oraz
 * podświetlanie aktywnego linku odpowiadającego widocznej sekcji.
 */

const SCROLL_THRESHOLD = 24;
const DESKTOP_QUERY = '(min-width: 62rem)';

export function initNav(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const panel = document.querySelector<HTMLElement>('[data-nav-panel]');
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));

  if (!header) return;

  /* ── Tło nagłówka po przewinięciu ─────────────────────────────── */

  const updateScrollState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
  };

  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });

  /* ── Menu mobilne ─────────────────────────────────────────────── */

  if (toggle && panel) {
    const desktop = window.matchMedia(DESKTOP_QUERY);

    const setOpen = (open: boolean) => {
      toggle.setAttribute('aria-expanded', String(open));
      panel.classList.toggle('is-open', open);
      // Blokada przewijania tła tylko wtedy, gdy panel faktycznie przykrywa stronę
      document.body.style.overflow = open && !desktop.matches ? 'hidden' : '';
    };

    const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

    toggle.addEventListener('click', () => setOpen(!isOpen()));

    // Kliknięcie linku zamyka menu i pozwala przewinąć do sekcji
    links.forEach((link) => link.addEventListener('click', () => setOpen(false)));
    panel.querySelector('a.btn')?.addEventListener('click', () => setOpen(false));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Przejście na desktop musi wyczyścić stan mobilny
    desktop.addEventListener('change', () => setOpen(false));
  }

  /* ── Aktywna sekcja ───────────────────────────────────────────── */

  const sections = links
    .map((link) => document.querySelector<HTMLElement>(link.hash))
    .filter((section): section is HTMLElement => section !== null);

  if (sections.length === 0) return;

  const setActive = (id: string | null) => {
    links.forEach((link) => link.classList.toggle('is-active', link.hash === `#${id}`));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) setActive(visible.target.id);
    },
    // Pas obserwacji tuż pod nagłówkiem — sekcja jest „aktywna”, gdy zajmuje środek ekranu
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));
}
