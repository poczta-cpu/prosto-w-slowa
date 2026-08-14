/**
 * Walidacja i wysyłka formularza kontaktowego po stronie klienta.
 *
 * Endpoint jest celowo pusty — projekt nie zawiera backendu. Aby uruchomić
 * wysyłkę, wystarczy wpisać poniżej adres usługi przyjmującej POST z JSON-em
 * (Formspree, Web3Forms, Cloudflare Worker, własne API). Reszta logiki —
 * walidacja, stany przycisku, komunikaty — działa już teraz.
 */
const FORM_ENDPOINT = '';

type FieldName = 'name' | 'email' | 'message' | 'consent';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const MESSAGES = {
  nameRequired: 'Podaj imię, żebym wiedziała, jak się do Ciebie zwracać.',
  nameShort: 'Imię powinno mieć co najmniej 2 znaki.',
  emailRequired: 'Podaj adres e-mail, żebym mogła odpisać.',
  emailInvalid: 'To nie wygląda na poprawny adres e-mail.',
  messageRequired: 'Napisz choć kilka słów — wystarczy, kiedy Ci pasuje.',
  messageShort: 'Wiadomość powinna mieć co najmniej 10 znaków.',
  consentRequired: 'Bez tej zgody nie mogę odpisać na wiadomość.',
  sending: 'Wysyłanie…',
  submit: 'Wyślij wiadomość',
  success: 'Dzięki. Wiadomość poszła — odezwę się najszybciej, jak dam radę.',
  failure: 'Nie udało się wysłać wiadomości. Spróbuj ponownie albo napisz na Instagramie.',
  notConfigured:
    'Formularz przeszedł walidację, ale wysyłka nie jest jeszcze podłączona. Ustaw FORM_ENDPOINT w src/scripts/form.ts lub napisz przez kanały obok.',
} as const;

/** Zwraca komunikat błędu albo null, gdy wartość jest poprawna. */
function validateField(name: FieldName, value: string, checked: boolean): string | null {
  switch (name) {
    case 'name':
      if (!value) return MESSAGES.nameRequired;
      return value.length < 2 ? MESSAGES.nameShort : null;
    case 'email':
      if (!value) return MESSAGES.emailRequired;
      return EMAIL_PATTERN.test(value) ? null : MESSAGES.emailInvalid;
    case 'message':
      if (!value) return MESSAGES.messageRequired;
      return value.length < 10 ? MESSAGES.messageShort : null;
    case 'consent':
      return checked ? null : MESSAGES.consentRequired;
    default:
      return null;
  }
}

export function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form) return;

  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]');
  const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]');

  const controls = Array.from(
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      'input[name], textarea[name]',
    ),
  ).filter((el) => el.name !== 'company');

  const setStatus = (text: string, state: 'success' | 'error' | 'info' | null) => {
    if (!status) return;
    status.textContent = text;
    if (state) {
      status.setAttribute('data-state', state);
    } else {
      status.removeAttribute('data-state');
    }
  };

  const showError = (control: HTMLInputElement | HTMLTextAreaElement, message: string | null) => {
    const errorEl = document.getElementById(`error-${control.name}`);
    if (errorEl) errorEl.textContent = message ?? '';
    control.setAttribute('aria-invalid', message ? 'true' : 'false');
    return message === null;
  };

  const check = (control: HTMLInputElement | HTMLTextAreaElement) =>
    validateField(
      control.name as FieldName,
      control.value.trim(),
      control instanceof HTMLInputElement && control.type === 'checkbox' ? control.checked : true,
    );

  // Walidacja przy opuszczeniu pola; po pierwszym błędzie — również przy pisaniu,
  // aby użytkownik widział poprawę na bieżąco.
  controls.forEach((control) => {
    control.addEventListener('blur', () => showError(control, check(control)));
    control.addEventListener('input', () => {
      if (control.getAttribute('aria-invalid') === 'true') showError(control, check(control));
    });
    control.addEventListener('change', () => {
      if (control instanceof HTMLInputElement && control.type === 'checkbox') {
        showError(control, check(control));
      }
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatus('', null);

    let firstInvalid: HTMLElement | null = null;
    controls.forEach((control) => {
      const message = check(control);
      showError(control, message);
      if (message && !firstInvalid) firstInvalid = control;
    });

    if (firstInvalid) {
      (firstInvalid as HTMLElement).focus();
      return;
    }

    // Wypełniona pułapka = bot. Udajemy sukces, nic nie wysyłając.
    const honeypot = form.querySelector<HTMLInputElement>('input[name="company"]');
    if (honeypot?.value) {
      setStatus(MESSAGES.success, 'success');
      form.reset();
      return;
    }

    if (!FORM_ENDPOINT) {
      setStatus(MESSAGES.notConfigured, 'info');
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());

    if (submit) submit.disabled = true;
    if (submitLabel) submitLabel.textContent = MESSAGES.sending;

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      setStatus(MESSAGES.success, 'success');
      form.reset();
      controls.forEach((control) => showError(control, null));
    } catch {
      setStatus(MESSAGES.failure, 'error');
    } finally {
      if (submit) submit.disabled = false;
      if (submitLabel) submitLabel.textContent = MESSAGES.submit;
    }
  });
}
