/**
 * Animacje pojawiania się przy przewijaniu.
 *
 * Każdy element z atrybutem `data-reveal` dostaje klasę `is-revealed`,
 * gdy wejdzie w kadr. Obserwacja kończy się po pierwszym ujawnieniu —
 * elementy nie znikają przy przewijaniu w górę.
 */

const REVEAL_MARGIN = '0px 0px -12% 0px';
const REVEAL_THRESHOLD = 0.12;

export function initReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (targets.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Brak wsparcia dla IntersectionObserver lub wyłączone animacje:
  // pokazujemy wszystko od razu, treść nigdy nie zostaje ukryta.
  if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      });
    },
    { rootMargin: REVEAL_MARGIN, threshold: REVEAL_THRESHOLD },
  );

  targets.forEach((el) => observer.observe(el));

  // Zmiana ustawień systemowych w trakcie sesji natychmiast odsłania resztę
  prefersReducedMotion.addEventListener('change', (event) => {
    if (!event.matches) return;
    observer.disconnect();
    targets.forEach((el) => el.classList.add('is-revealed'));
  });
}
