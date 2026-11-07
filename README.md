# jonasward.ch

Portfolio of Jonas Ward - developer, designer, architect in Zürich. Live at [jonasward.ch](https://jonasward.ch).

Static [Astro](https://astro.build/) site, hosted on GitHub Pages.

## Commands

Needs [Bun](https://bun.sh/) and Node 22.23+.

```bash
bun install
bunx playwright install chromium   # once, for cv pdfs and tests
bun run dev                        # localhost:3112
bun run build                      # site + cv pdfs -> build/
bun run test                       # checks the build
```

## Adding a project

Add a file under `src/data/projects/<category>/` and list it in `src/data/projects/allProjects.ts`.

## Deploy

Pull requests are built and checked; pushes to `master` deploy.
