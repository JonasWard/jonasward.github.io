// projects overview: every card rendered up front, the filter script only toggles `hidden` (see data-* attributes)
import type { ProjectData } from '../types/projectContent/projectData';
import { getProjectKeywords } from '../utils/projectconstructor';
import { attrs, each, esc } from './html';
import { responsiveImg } from './img';

const cardWidth = 200;

export const projectHref = (project: ProjectData) => `/project/${project.metaData.webstring}/`;

const chip = (keyword: string) => `<button${attrs({ class: 'tag project-chip hidden', 'data-keyword': keyword })}>${esc(keyword)}</button>`;

export const renderProjectCard = (project: ProjectData) => {
  const { metaData } = project;
  // a project can show something else on its card than the hero of its page
  const picture = metaData.keyImage ?? project.projectImage.picture;
  const keywords = getProjectKeywords(metaData).map(String);
  return `<a${attrs({
    class: 'project-card fade-in',
    href: projectHref(project),
    'data-category': metaData.projectType,
    'data-keywords': JSON.stringify(keywords.map((k) => k.toLowerCase()))
  })}><div>${responsiveImg(picture, {
    sizes: `${cardWidth}px`,
    alt: metaData.name
  })}<div class="project-card-content stack"><h4>${esc(metaData.id)}</h4><h2>${esc(metaData.name)}</h2><main><p>${esc(
    metaData.description
  )}</p></main><h3 data-keywords-toggle><span>keywords </span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><path d="M2 9 L6 3 L10 9" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg></h3><div class="keywords cluster keywords-hidden">${each(
    keywords,
    chip
  )}</div></div></div></a>`;
};

export const renderProjectGrid = (projects: ProjectData[]) =>
  `<div class="project-grid" data-project-grid>${each(projects, renderProjectCard)}</div>`;

/** the input of the keyword filter, chips and suggestions are added by the filter script */
export const renderKeywordFilterBar = () =>
  `<div class="keyword-filter-inner cluster" data-filter-bar><div class="kf-input-wrap"><input class="kf-input" placeholder="filter by keyword…" aria-label="filter by keyword"><div class="kf-dropdown stack" hidden></div></div></div>`;
