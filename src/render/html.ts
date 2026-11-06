// tiny helpers for building markup as strings, shared by every renderer in this folder

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** escapes text and attribute values */
export const esc = (value: unknown): string => String(value ?? '').replace(/[&<>"']/g, (c) => ESCAPES[c]);

/** `attrs({ href: 'x', hidden: true, title: undefined })` -> ` href="x" hidden`; false / null / undefined are dropped */
export const attrs = (values: Record<string, string | number | boolean | null | undefined>): string =>
  Object.entries(values)
    .filter(([, v]) => v !== false && v !== null && v !== undefined)
    .map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${esc(v)}"`))
    .join('');

/** joins the truthy class names */
export const cls = (...names: (string | false | null | undefined)[]): string => names.filter(Boolean).join(' ');

const UNITLESS = new Set(['fontWeight', 'lineHeight', 'opacity', 'flexGrow', 'zIndex']);

/** inline style from a map, numbers become px (except unitless properties); empty values are dropped */
export const style = (values: Record<string, string | number | null | undefined>): string | undefined => {
  const css = Object.entries(values)
    .filter(([, v]) => v !== null && v !== undefined && v !== '')
    .map(
      ([k, v]) =>
        `${k.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}:${typeof v === 'number' && !UNITLESS.has(k) ? `${v}px` : v}`
    )
    .join(';');
  return css || undefined;
};

/** maps a list to markup */
export const each = <T>(items: readonly T[] | undefined, render: (item: T, index: number) => string): string =>
  (items ?? []).map(render).join('');
