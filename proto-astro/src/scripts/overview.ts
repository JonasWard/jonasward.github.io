// /projects: category (?c=) + keyword (?k=a,b) filter over the statically rendered cards.
// matches applyFilters in src/state/projectStore.ts: same category, and every keyword (case-insensitive) on the card

type Card = { el: HTMLElement; category: string; keywords: string[] };

const cards: Card[] = [...document.querySelectorAll<HTMLElement>('.project-card[data-keywords]')].map((el) => ({
  el,
  category: el.dataset.category ?? '',
  keywords: JSON.parse(el.dataset.keywords ?? '[]')
}));
const allKeywords = [...new Set(cards.flatMap((c) => c.keywords))].sort();

const params = new URLSearchParams(location.search);
const category = params.get('c') ?? 'All';
let keywordFilters = (params.get('k') ?? '').split(',').filter(Boolean);

const matches = (card: Card, keywords: string[]) =>
  (category === 'All' || card.category === category) && keywords.every((kw) => card.keywords.includes(kw.toLowerCase()));

const bar = document.querySelector<HTMLElement>('[data-filter-bar]')!;
const inputWrap = bar.querySelector<HTMLElement>('.kf-input-wrap')!;
const input = bar.querySelector<HTMLInputElement>('.kf-input')!;
const dropdown = bar.querySelector<HTMLElement>('.kf-dropdown')!;

const button = (className: string, html: string, onPress: () => void, event: 'click' | 'mousedown' = 'click') => {
  const b = document.createElement('button');
  b.className = className;
  b.innerHTML = html;
  b.addEventListener(event, onPress);
  return b;
};
const escapeHtml = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

const renderSuggestions = () => {
  const query = input.value.toLowerCase();
  const suggestions = allKeywords.filter(
    (kw) =>
      !keywordFilters.includes(kw) && kw.includes(query) && cards.some((c) => matches(c, [...keywordFilters, kw]))
  );
  dropdown.replaceChildren(
    ...suggestions.map((kw) =>
      button('kf-suggestion', escapeHtml(kw), () => {
        toggleKeyword(kw);
        input.value = '';
      }, 'mousedown')
    )
  );
  dropdown.hidden = !(document.activeElement === input && suggestions.length > 0);
};

const update = () => {
  for (const card of cards) card.el.hidden = !matches(card, keywordFilters);

  bar.querySelectorAll('.kf-chip').forEach((chip) => chip.remove());
  for (const kw of keywordFilters)
    inputWrap.before(button('tag tag--solid kf-chip', `${escapeHtml(kw)} <span>×</span>`, () => toggleKeyword(kw)));
  input.placeholder = keywordFilters.length === 0 ? 'filter by keyword…' : '+';
  renderSuggestions();

  const next = new URLSearchParams(location.search);
  if (keywordFilters.length > 0) next.set('k', keywordFilters.join(','));
  else next.delete('k');
  const search = next.toString();
  history.replaceState(history.state, '', `${location.pathname}${search ? `?${search}` : ''}${location.hash}`);
  relayout();
};

const toggleKeyword = (kw: string) => {
  keywordFilters = keywordFilters.includes(kw) ? keywordFilters.filter((k) => k !== kw) : [...keywordFilters, kw];
  update();
};

input.addEventListener('input', renderSuggestions);
input.addEventListener('focus', renderSuggestions);
input.addEventListener('blur', () => setTimeout(() => (dropdown.hidden = true), 150));

// cards are links; the keyword toggle and chips inside them must not navigate
for (const { el } of cards) {
  el.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const chip = target.closest<HTMLElement>('[data-keyword]');
    const toggle = target.closest('[data-keywords-toggle]');
    if (!chip && !toggle) return;
    e.preventDefault();
    if (chip) {
      const kw = chip.dataset.keyword!;
      if (!keywordFilters.includes(kw)) toggleKeyword(kw);
      return;
    }
    const list = el.querySelector('.keywords')!;
    const open = list.classList.toggle('keywords-hidden') === false;
    el.querySelector('[data-keywords-toggle]')!.classList.toggle('open', open);
    list.querySelectorAll('.project-chip').forEach((c) => {
      c.classList.toggle('show', open);
      c.classList.toggle('hidden', !open);
    });
  });
}

// desktop masonry on top of the css grid, like the former js columns: visible card i goes into column i % columns,
// spanning as many 1px rows as it is high (without js it stays a plain grid)
const desktop = matchMedia('(min-width: 571px)');
let frame = 0;
const masonry = () => {
  frame = 0;
  grid.classList.toggle('masonry', desktop.matches);
  const columns = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
  cards
    .filter(({ el }) => !el.hidden)
    .forEach(({ el }, i) => {
      el.style.gridColumn = desktop.matches ? `${(i % columns) + 1}` : '';
      el.style.gridRowEnd = desktop.matches ? `span ${Math.ceil(el.getBoundingClientRect().height) + 16}` : '';
    });
};
const relayout = () => (frame ||= requestAnimationFrame(masonry));

// phones: the card crossing the middle of the horizontal row is in focus
const grid = document.querySelector<HTMLElement>('[data-project-grid]')!;
const focusObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.target.classList.toggle('in-focus', e.isIntersecting)),
  { root: grid, rootMargin: '0px -49% 0px -49%' }
);
const phone = matchMedia('(max-width: 570px)');
const resizes = new ResizeObserver(relayout);
resizes.observe(grid);
cards.forEach(({ el }) => resizes.observe(el));
const observeFocus = () => {
  focusObserver.disconnect();
  cards.forEach(({ el }) => (phone.matches ? focusObserver.observe(el) : el.classList.remove('in-focus')));
};
phone.addEventListener('change', observeFocus);
observeFocus();

update();
