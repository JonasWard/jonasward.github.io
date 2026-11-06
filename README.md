## Hi There! Welcome to the Read Me of my portfolio page!

I am Jonas - Developer, designer, architect - based in Zürich CH.

you can view my portfolio at: [jonasward.ch](https://jonasward.ch)

### stack

A static site built with [Astro](https://astro.build/): every page is plain HTML generated at build time from the typed
project data, with a few small vanilla scripts on top (projects filter, landing and 404 shaders, mobile menu). Images go
through [vite-imagetools](https://github.com/JonasKruckenberg/imagetools) (`?responsive` imports become webp `srcset`s
with their intrinsic size), the CV PDFs are printed from the CV pages with [Playwright](https://playwright.dev/).
Everything is hosted on [GitHub Pages](https://pages.github.com/).

```
src/
  data/       projects (one ProjectData file each, with its images), cv variants, motivation letter defaults
  types/      the data's types and keywords
  utils/      project helpers, filterProjects (what /projects shows for a category + keywords)
  render/     data -> HTML strings (project pages, overview cards, header, cv, images)
  pages/      astro routes: /, /projects, /project/<webstring>, /about, /cv, /cv-*, 404
  layouts/    the page shell, incl. the redirect of old /#/ links
  scripts/    client-side scripts (filter, landing + 404 shaders, motivation letter)
  styles/     css, one main.css with cascade layers
  assets/     logos, icons, profile picture, cv qr codes
scripts/      buildPdfs.mjs (cv pdfs after the build), generateLogoSdf.mjs
test/         check.mjs: checks the built site
```

### commands

Needs [Bun](https://bun.sh/) and Node 22.23 or newer.

```bash
bun install
bunx playwright install chromium   # once, for the cv pdfs and the checks
bun run dev                        # http://localhost:3112, incl. the dev-only /create-motivation-letter/
bun run build                      # site + cv pdfs -> build/
bun run preview                    # serve build/ at http://localhost:4322
bun run test                       # checks the build (needs pdftotext); --build rebuilds first, --no-shots skips the screenshots
```

The first build encodes every image (a few minutes), later builds reuse `node_modules/.cache/imagetools`.

### deploy

`.github/workflows/gh-pages.yml` builds and checks every pull request; a push to `master` also deploys `build/` to
GitHub Pages. Old hash links (`jonasward.ch/#/cv`, `#/project/<name>`, printed on CVs and QR codes) are redirected to
the real paths by the page shell.

### adding a project

Add a `ProjectData` file under `src/data/projects/<category>/` and list it in `src/data/projects/allProjects.ts`; its
page and card are generated from it.
