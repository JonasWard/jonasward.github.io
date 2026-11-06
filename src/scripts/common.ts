// on every page: image fade-in and the mobile burger menu

const markLoaded = (img: HTMLImageElement) => img.classList.add('loaded');
document.querySelectorAll<HTMLImageElement>('img.responsive-img').forEach((img) => {
  if (img.complete && img.naturalWidth > 0) markLoaded(img);
  else img.addEventListener('load', () => markLoaded(img), { once: true });
});

const toggle = document.querySelector<HTMLElement>('[data-nav-toggle]');
const dropdown = document.querySelector<HTMLElement>('.nav-menu');
toggle?.addEventListener('click', () => {
  toggle.classList.toggle('show');
  dropdown?.classList.toggle('show');
});
