import { ProjectData } from 'src/types/projectContent/projectData';
import { ProjectCategoryFilterType } from 'src/types/navigation/filterType';
import { getProjectKeywords } from 'src/utils/projectconstructor';

/** the projects shown on /projects: same category (or 'All'), and every keyword (case-insensitive) on the project */
export const filterProjects = (
  projects: ProjectData[],
  filter: ProjectCategoryFilterType,
  keywordFilters: string[]
): ProjectData[] => {
  const byCategory = filter === 'All' ? projects : projects.filter((p) => p.metaData.projectType === filter);
  if (keywordFilters.length === 0) return byCategory;
  return byCategory.filter((p) => {
    const kws = getProjectKeywords(p.metaData).map((k) => String(k).toLowerCase());
    return keywordFilters.every((kw) => kws.includes(kw.toLowerCase()));
  });
};
