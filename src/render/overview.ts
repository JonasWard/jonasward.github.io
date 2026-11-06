// projects overview: every card rendered up front, the filter script only toggles `hidden` (see data-* attributes)
import type { ProjectData } from '../types/projectContent/projectData';
import { getProjectKeywords } from '../utils/projectconstructor';
import { attrs, each, esc } from './html';
import { responsiveImg } from './img';

const cardWidth = 200;

export const projectHref = (project: ProjectData) => `/project/${project.metaData.webstring}/`;

// same sizing as ProjectChip's default size of 24
const chip = (keyword: string) =>
  `<button${attrs({
    class: 'project-chip hidden',
    style: 'display:inline-block;font-size:12px;padding:1.2px 6px',
    'data-keyword': keyword
  })}>${esc(keyword)}</button>`;

export const renderProjectCard = (project: ProjectData) => {
  const { metaData } = project;
  // a project can show something else on its card than the hero of its page
  const picture = metaData.keyImage ?? project.projectImage.picture;
  const keywords = getProjectKeywords(metaData).map(String);
  return `<a${attrs({
    class: `project-card fade-in ${metaData.projectType}`,
    href: projectHref(project),
    'data-category': metaData.projectType,
    'data-keywords': JSON.stringify(keywords.map((k) => k.toLowerCase()))
  })}><div>${responsiveImg(picture, {
    sizes: `${cardWidth}px`,
    alt: metaData.name,
    style: `width:100%;height:${(picture.img.h / picture.img.w) * cardWidth}px;object-fit:cover`
  })}<div class="project-card-content"><h4>${esc(metaData.id)}</h4><h2>${esc(metaData.name)}</h2><main><p>${esc(
    metaData.description
  )}</p></main><h3 data-keywords-toggle><span>keywords </span><svg style="width:10px;height:10px;transition:all 0.6s;transform:rotate(180deg)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><path d="M2 9 L6 3 L10 9" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg></h3><div class="keywords keywords-hidden">${each(
    keywords,
    chip
  )}</div></div></div></a>`;
};

export const renderProjectGrid = (projects: ProjectData[]) =>
  `<div class="project-grid" data-project-grid>${each(projects, renderProjectCard)}</div>`;

/** the input of the keyword filter, chips and suggestions are added by the filter script */
export const renderKeywordFilterBar = () =>
  `<div class="keyword-filter-inner" data-filter-bar><div class="kf-input-wrap"><input class="kf-input" placeholder="filter by keyword…" aria-label="filter by keyword"><div class="kf-dropdown" hidden></div></div></div>`;
