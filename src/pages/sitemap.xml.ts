// sitemap for search engines: the main pages and every project page; the tailored cv variants stay out of it
import type { APIRoute } from 'astro';
import { allProjects } from 'src/data/projects/allProjects';

const pages = ['/', '/projects/', '/about/', '/cv/', ...allProjects.map((p) => `/project/${p.metaData.webstring}/`)];

export const GET: APIRoute = ({ site }) =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
      .map((path) => `  <url><loc>${new URL(path, site)}</loc></url>`)
      .join('\n')}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
