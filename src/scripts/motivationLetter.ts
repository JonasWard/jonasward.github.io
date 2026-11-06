// dev-only motivation letter generator: form fields <-> localStorage, live letter preview, pdf via the browser's print
import {
  MotivationLetterKeys,
  type MotivationLetterContent,
  type MotivationLetterLocalStorage
} from 'src/types/motivationLetter/content';

const defaults = (window as unknown as { __ML_DEFAULTS__: MotivationLetterContent }).__ML_DEFAULTS__;
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const read = <T>(key: string, fallback: T): T => {
  try {
    return (JSON.parse(localStorage.getItem(key) ?? 'null') as T) ?? fallback;
  } catch {
    return fallback;
  }
};

let letters: MotivationLetterLocalStorage = {
  ...read<MotivationLetterLocalStorage>(MotivationLetterKeys.motivationLetterPreviousData, {}),
  [MotivationLetterKeys.defaultKey]: defaults
};
let activeKey = localStorage.getItem(MotivationLetterKeys.lastKeyMotivationLetter) ?? MotivationLetterKeys.defaultKey;
if (!letters[activeKey]) activeKey = MotivationLetterKeys.defaultKey;

const form = document.querySelector<HTMLFormElement>('[data-ml-form]')!;
const select = document.querySelector<HTMLSelectElement>('[data-ml-key-select]')!;
const keyName = document.querySelector<HTMLInputElement>('[data-ml-key-name]')!;
const slot = (name: string) => document.querySelector<HTMLElement>(`[data-ml="${name}"]`)!;

const save = () => {
  localStorage.setItem(MotivationLetterKeys.motivationLetterPreviousData, JSON.stringify(letters));
  localStorage.setItem(MotivationLetterKeys.lastKeyMotivationLetter, activeKey);
};

// lines starting with "-" become bullet lists, every other line a paragraph (as in MotivationLetterPDF.tsx)
const renderContent = (content: string) => {
  const root = document.createDocumentFragment();
  let list: HTMLUListElement | null = null;
  for (const line of content.split('\n')) {
    if (line.trimStart().startsWith('-')) {
      list ??= root.appendChild(document.createElement('ul'));
      list.appendChild(document.createElement('li')).textContent = line.trimStart().replace(/^-\s*/, '');
    } else {
      list = null;
      root.appendChild(document.createElement('p')).textContent = line;
    }
  }
  return root;
};

const renderPreview = () => {
  const letter = letters[activeKey];
  for (const key of ['title', 'intro', 'people', 'outro', 'wishes'] as const) slot(key).textContent = letter[key];
  slot('content').replaceChildren(renderContent(letter.content ?? ''));
  const now = new Date();
  slot('date').textContent = `${letter.city}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
};

const renderAll = () => {
  select.replaceChildren(...Object.keys(letters).map((k) => new Option(k, k, false, k === activeKey)));
  keyName.value = activeKey;
  for (const [name, value] of Object.entries(letters[activeKey])) {
    const field = form.elements.namedItem(name) as HTMLInputElement | null;
    if (field) field.value = value;
  }
  renderPreview();
};

form.addEventListener('input', (e) => {
  const field = e.target as HTMLInputElement;
  if (!field.name) return;
  letters[activeKey] = { ...letters[activeKey], [field.name]: field.value };
  save();
  renderPreview();
});

select.addEventListener('change', () => {
  activeKey = select.value;
  save();
  renderAll();
});

// renaming the key stores the current letter under the new name
const rename = () => {
  const next = keyName.value.trim();
  if (!next || next === activeKey) return;
  letters = { ...letters, [next]: letters[activeKey] };
  activeKey = next;
  save();
  renderAll();
};
keyName.addEventListener('blur', rename);
keyName.addEventListener('keydown', (e) => e.key === 'Enter' && rename());

const drawerButton = document.querySelector<HTMLButtonElement>('[data-ml-drawer]')!;
drawerButton.addEventListener('click', () => {
  const open = form.classList.toggle('open');
  drawerButton.textContent = open ? 'Close Input Drawer' : 'Open Input Drawer';
});

document.querySelector('[data-ml-print]')!.addEventListener('click', () => window.print());

renderAll();
