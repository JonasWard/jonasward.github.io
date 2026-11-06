// run with bun: prints what the real data + filterProjects say the site should show.
// images are stubbed, only the project data matters here
import { plugin } from 'bun';

plugin({
  name: 'stub-assets',
  setup(build) {
    build.onResolve({ filter: /\.(webp|jpe?g|png|svg|gif)(\?.*)?$|\?(raw|url)$/ }, (args) => ({ path: args.path, namespace: 'stub' }));
    build.onLoad({ filter: /.*/, namespace: 'stub' }, () => ({
      contents: 'export default { sources: { webp: "" }, img: { src: "", w: 1, h: 1 } };',
      loader: 'js'
    }));
  }
});

const { allProjects } = await import('../src/data/projects/allProjects');
const { filterProjects } = await import('../src/utils/filterProjects');
const { getProjectKeywords } = await import('../src/utils/projectconstructor');

// the filter cases checked on /projects: 3 keywords (single and combined) + 1 category
const counts = new Map<string, number>();
for (const p of allProjects) for (const k of getProjectKeywords(p.metaData)) counts.set(String(k), (counts.get(String(k)) ?? 0) + 1);
const byCount = [...counts.entries()].filter(([, n]) => n > 1 && n < allProjects.length).sort((a, b) => b[1] - a[1]);
const keywords = [counts.has('Timber') ? 'Timber' : byCount[1][0], byCount[0][0], byCount[Math.floor(byCount.length / 2)][0]];

const cases: { category: string; keywords: string[]; expected: string[] }[] = [];
const run = (category: string, kws: string[]) =>
  cases.push({ category, keywords: kws, expected: filterProjects(allProjects, category as never, kws).map((p) => p.metaData.webstring) });
for (const k of keywords) run('All', [k]);
run('All', [keywords[0], keywords[1]]);
run('Software', []);
run('Software', [keywords[1]]);

console.log(
  JSON.stringify({
    projects: allProjects.map((p) => ({ webstring: p.metaData.webstring, name: p.metaData.name })),
    cases
  })
);
