# proto-astro

Prototype of the portfolio without React: Astro renders the existing `src/data` to static HTML,
with small vanilla scripts for the projects filter/masonry, hash-URL redirect and 404 shader.
Renderers (TS data → HTML strings) live in `../src/render/`.

```bash
bun install            # in the repo root and in proto-astro/
bun run build          # astro build + PDF of the CV -> proto-astro/build/
node test/check.mjs    # success criteria; needs ../build from the React build for screenshots
bun run dev            # :3112, dev-only motivation letter at /create-motivation-letter/
```

## Why Astro over a hand-rolled build

Both prototypes passed the same checks (every project page, filters equal to `applyFilters`,
`#/` redirects, A4 CV PDF, dev-only motivation letter, `src/data` untouched). Measured on the same
machine, one after another:

| | React (now) | Astro | hand-rolled |
|---|---|---|---|
| cached build | ~1–2 min | ~11 s | ~56 s |
| dev server ready | – | <1 s | ~50 s |
| glue code | – | ~90 lines | ~205 lines + own static server |
| JS shipped | 2.1 MB | ~6 kB inline | ~5 kB inline |

The hand-rolled version also worked, but we'd own the dev server, asset copying and preview
server. Astro gives those for free and imports the data and `?responsive` images unchanged.

Known gaps before replacing the React app: landing canvas not ported yet, about page,
other CV variants, deploy workflow.
