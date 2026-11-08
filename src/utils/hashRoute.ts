// the old react site routed on the hash, with or without a slash: `#/cv`, `#cv`, `#project/x`. Printed cvs, their
// qr codes (`jonasward.ch/#cv-max`) and project texts still use those. A hash only counts as a route when its first
// segment is one, so in-page anchors like `/cv/#education` stay anchors.
// Kept in step with the inline redirect in src/layouts/Base.astro, which can't import this.
export const HASH_ROUTES = [
  'project',
  'projects',
  'about',
  'cv',
  'cv-longer',
  'cv-max',
  'cv-product-designer',
  'cv-living-lab-hil',
  'main',
  'portfolio',
  'landing'
];

/** `#/project/x?k=a` or `#project/x` -> `/project/x/?k=a`; anything that isn't an old route -> null */
export const hashToPath = (hash: string): string | null => {
  const route = hash.replace(/^#\/?/, '');
  if (route === hash || !HASH_ROUTES.includes(route.split(/[/?#]/)[0])) return null;
  const url = new URL('/' + route, 'https://jonasward.ch');
  if (!/\/$|\.\w+$/.test(url.pathname)) url.pathname += '/';
  return url.pathname + url.search + url.hash;
};

/**
 * content links to an old hash route of this site become the real path; everything else is left as it is.
 * Absolute links stay absolute: the cv pdfs are printed from a local server, where a relative link would turn into
 * a localhost url
 */
export const siteHref = (href: string): string => {
  const own = href.match(/^(https?:\/\/(?:www\.)?jonasward\.ch)?\/?(#.*)$/);
  const path = own && hashToPath(own[2]);
  return path ? (own[1] ? 'https://jonasward.ch' : '') + path : href;
};
