---
name: write-description
description: Write or rewrite portfolio texts in Jonas' own voice instead of generic AI prose - project descriptions, one-line subtitles, section headings, image captions, the about page and README blurbs. Use this whenever text is written or edited in src/data/projects/**, when a new project page is added, or when the user asks to "describe", "write up", "add some text for", "fill in the description" or to make something "sound less AI" / "more like me", even if it is only one sentence or a subtitle.
---

# Writing descriptions in Jonas' voice

This portfolio is personal. Most of its texts were written by Jonas over ten years: an architect and developer from Ghent, living in Zürich, writing English as a second language next to Dutch and German. A paragraph in default LLM prose is easy to spot between them, it reads like marketing copy next to somebody talking about their own work. The goal is that a new text could sit between the existing ones without anybody noticing a different author.

The existing texts are the source of truth, not this file. This file tells you where to look and what to listen for.

## Before writing

1. **Collect the facts.** Use what the user said, the project file itself (keywords, partners, links, image file names), a linked repo or deployment, and the CV files in `src/components/cv/content/` (`cvContent.ts` and its variants), which hold one-line facts for many projects. Many projects have their own repo checked out next to this one (`../<project-name>`); its README and git history are a good source for dates and for what was actually built, as long as you say in the hand-over that you used it. Never invent dimensions, counts, dates, collaborators, prizes or outcomes. Jonas' texts are full of specifics and a made-up one is worse than none. If the facts are thin, write a short text or ask one concrete question. Short is completely fine here: several live projects have one sentence.
2. **Read the neighbours.** Read `references/voice-samples.md`, then open two or three live files of the same kind as the text you are writing (table below). The samples go stale, the files do not.
3. **Pick the size** from the table, not from how much you could say.

| Kind of project | Size | Read these first |
| --- | --- | --- |
| Small web toy, library, proof of concept | 1 to 4 sentences, fragments allowed | `art/svgSDF.ts`, `software/state-to-function.ts`, `software/densing.ts`, `art/aMerryFXMesh.ts` |
| Software with a story behind it | 2 to 4 short paragraphs, optional heading per block | `software/urlSafeBitpacker.ts`, `software/lucernaeTurici.ts`, `software/digitaleAugen.ts` |
| Fabrication / computational design | 1 or 2 dense paragraphs | `computationDesign/smartBrick.ts`, `computationDesign/impactClay.ts`, `design/rrreefs.ts`, `computationDesign/roboticGlass.ts` |
| Architecture / urbanism, competition, thesis | Short paragraphs spread between the images | `urbanism/napolitSotterana.ts`, `architecture/frituurFuturist.ts`, `architecture/livingOnTheEdge.ts`, `architecture/jokerweek.ts` |
| Lamp of a building | One paragraph about the building, not about the lamp | `lamps/anitkabir.ts`, `lamps/boekentoren.ts`, `lamps/quadrato.ts` |

All paths are under `src/data/projects/`. Pick the row by what the project is, not by the folder it happens to sit in. If the project belongs to a family (the pattern generator and the scarves, the lamps and their configurators, url-safe-bitpacking and the tools built on it), also read its siblings, so the new text links up with them instead of repeating them.

Some texts in the repo are **not** Jonas' voice. Do not learn from them: `architecture/concreteChoreography.ts` and the first paragraph of `architecture/v&a.ts` (official ETH project texts), `software/haashausconfigurator.ts` and `software/holzvisionMax.ts` (company texts), `motivationLetterDefaultContent.ts` (placeholder) and the CV bullets (résumé register with "Shipped", "Delivered", "Engineered", right for a CV and wrong on a project page).

## The voice

**Start with the situation, not with the project.** Longer texts open on the context or the problem and get to the project in the second or third sentence: "Modern-day Napoli is a rather illegible maze of canyonesque streets.", "Corals around the world are facing tough times.", "For many of my projects I have faced the problem of...". Short texts skip all that and open on a fragment that names the thing: "Little proof of concept to render SVGs with SDFs...", "POC to allow users to store simple math in a url.", "Static webpage, with convex backend, written in typescript."

**Tell it as a process, including what did not work.** What was the goal, what was decided, what was dropped, what the trade-off is, what is still open. "An impasse was reached, a decision had to be made.", "the biggest trade-off for this library is legibility", "One of the major hurdles, that hasn't been fully dealt with yet...", "experimental yet risky mixing of different types of glass was attempted and led to some initial success". He does not oversell. A thing is a "POC", a "WIP", a "first iteration", a "little proof of concept" when that is what it is.

**Be specific.** Measurements, counts, material names, tool names, people: "a brick shape measuring 220 x 220 x 250 mm, which was compiled of 25 individual tiles", "400 pillows ... 92 2.5 meter beams ... 2 km of rope", "shrinks rather violently and up to 15% during the drying stage", "rendered in the browser with the help of BabylonJS". When there is no such detail available, do not replace it with adjectives.

**Connect sentences the way he does.** Sentences regularly start with "Though", "However", "But rather than", "Therefore", "To this end", "Also", "Besides", "Finally", "Nonetheless". "Though" at the start of a sentence, in the sense of "but", is the most typical one. "namely" introduces the precise thing: "one specific aspect of clay, namely its malleability".

**Hedge and intensify with small words**, not big ones: "rather" ("rather illegible", "rather short urls"), "quite" ("quite a bit of additional overhead"), "actually", "pretty much", "a whole bunch of", "to a certain degree", "arguably".

**Asides go between spaced hyphens**: "a new - iconic - model", "The clay selected in the end - G-ton - shrinks rather violently". Never an em dash. Bracketed half-words are his too: "(mis)use", "(re)development", "(de)compacting", "(partial) inputs", "the (changing) office cultures".

**Long sentence, then a short one.** Sentences run long with several clauses, then something short lands: "The goal was simple: try and make as large and intricate of a surface with as little material as possible.", "In total there were 23 boxes.", "They should make one themselves!"

**Dry humour and an opinion, sparingly.** Roughly once per text and never in every paragraph: "This time it was our turn to roll up our sleeves and get our hands dirty...", "a housing project on a graveyard became conceivable and, dare I say, even qualitative", "In true web-3 (and GDPR compliancy)", "my life-long companion: Architectural Lamps", "Besides what is on offering, nothing about the Frituur is iconic." Architecture texts are allowed a judgement ("very few ... are iconic or actually even noteworthy"). A rhetorical question or two is fine when the project really started from a question ("What happens when you start opening existing doors?").

**I, we, and the passive.** "I" for solo work and personal motivation, "we" for team work, and a lot of passive for the process itself ("a new direction was chosen", "different infill strategies were iterated"). Collaborators are named and credited plainly ("initialized by ceramist Marie Griesmar and marine biologist Ulrike Pfreudt", "thanks a lot to Richa and Roxas for the modelling").

**Vocabulary from the architecture studio and the workshop**: typology, legible, iconic, conceptual, materialise, expression, formal language, informed by, iteration, workflow, strategies (pattern strategies, infill strategies), logic, possibility space, POC. Stack and tools are named flatly, without selling them: "This project is a static frontend page, using next.js, convex backend."

**Software texts are allowed to be a bit cheerful.** One exclamation mark for the fun part and a direct invitation: "Entire state stored in the url!", "No backend used at all!", "feel free to share your creations with a friend!"

**Stop when the content stops.** Texts end on a result, a caveat or one last concrete fact. Never on a summary, a lesson learned or a look into the future.

**Spelling**: mostly British -ise (realisation, visualisation, materialisation, recognised) but always "color", and the older texts mix in -ize. Follow the file you are in. Write correct English. Jonas' texts contain typos and some Dutch-shaped grammar ("allows to cut", "both X as Y", "the by him instated capital"); do not copy the mistakes, but keep the shape of the thinking: the long front-loaded sentence, the "Though", the "namely". When editing one of his existing texts, change only what was asked and mention typos you notice instead of silently rewriting his sentences.

## What gives the AI away

These are the things that make a text stand out on this site. Check for them after writing.

- A text that is longer than its neighbours. Padding a small project is the most common failure.
- Praise words and sales verbs: innovative, cutting-edge, seamless, powerful, stunning, elegant, robust, intuitive, showcases, leverages, empowers, unlocks, passion for, journey.
- Abstract openers and closers: "This project explores the intersection of...", "Ultimately...", "The result is a...", "This demonstrates how...".
- Triplets of adjectives or of parallel clauses, and "not just X, but Y" constructions.
- Em dashes, semicolons, bold text, bullet lists and markdown inside the prose. The page renders plain strings.
- Every sentence the same medium length, every paragraph the same shape.
- A text that only contains things that went well.
- Anything that could be pasted onto somebody else's project without changing a word.

## Where the text goes

A project is a `ProjectData` object in `src/data/projects/<category>/<name>.ts`.

- `metaData.name`: the title. Often a name with a wink (Frituur Futurist, Chocolade Chaud, A Merry FX Mesh, Santini at Home, Kwatrecht Under Pressure).
- `metaData.description`: the subtitle on the card. A noun phrase of 3 to 10 words, no full stop, no verb that sells: "Lamp Topologies with SDFs", "Front-end Static Calculator", "Urban Fabric of Napoli", "POC and WIP lamp configurator", "First experiments for an online chocolate bar configurator".
- `createText(columns, ...texts)` in `projectContent`: each plain string is one paragraph, a `[heading, paragraph]` tuple renders a heading above it. Headings are short labels: "Sampling", "Parametric Object Bit-Packing", "EXPO 58 - Iconic Brussels", "The Frituur / Fritkot / Friterie". Use 2 columns for a real text, 1 for a single short paragraph.
- Image captions (`createImage(img, caption)`, `imageText`): a credit ("© J.W.") or a short label: "Initial Geometry Experiments", "Sketch of Housing Organisation Concept", "Luc Tuymans - Vlaams Dorp", "Gantt Graph for (related) Part Status".
- Link names (`alternativeName`): what it is, nothing more: "Playground", "GitHub Pages Deployment", "npm", "github".

Strings are plain text in single quotes, so escape apostrophes (`\'`) or the build breaks.

## Before handing over

Read the text once more next to the two or three neighbours you opened and ask whether somebody could tell which one Jonas did not write. Then check: every fact has a source, the length matches the size of the project, the last sentence is not a conclusion, no em dashes. Tell the user which facts you were missing instead of writing around them.
