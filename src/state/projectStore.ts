import { create } from 'zustand';
import { ProjectData } from '../types/projectContent/projectData';
import { ProjectCategoryFilterType } from '../types/navigation/filterType';
import { allProjects } from 'src/data/projects/allProjects';
import { getProjectKeywords } from 'src/utils/projectconstructor';

const applyFilters = (
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

export type ProjectStoreType = {
  projects: ProjectData[];
  setProjects: (projects: ProjectData[]) => void;
  activeProjects: ProjectData[];
  filter: ProjectCategoryFilterType;
  keywordFilters: string[];
  setFilter: (filter: ProjectCategoryFilterType) => void;
  toggleKeyword: (keyword: string) => void;
  setKeywordFilters: (keywords: string[]) => void;
  clearFilter: () => void;
};

export const useProjectStore = create<ProjectStoreType>()((set) => ({
  projects: allProjects,
  setProjects: (projects) => set(() => ({ projects })),
  activeProjects: allProjects,
  filter: 'All',
  keywordFilters: [],
  setFilter: (filter) =>
    set((s) => ({
      activeProjects: applyFilters(s.projects, filter, s.keywordFilters),
      filter,
    })),
  toggleKeyword: (keyword) =>
    set((s) => {
      const keywordFilters = s.keywordFilters.includes(keyword)
        ? s.keywordFilters.filter((k) => k !== keyword)
        : [...s.keywordFilters, keyword];
      return { keywordFilters, activeProjects: applyFilters(s.projects, s.filter, keywordFilters) };
    }),
  setKeywordFilters: (keywords) =>
    set((s) => ({
      keywordFilters: keywords,
      activeProjects: applyFilters(s.projects, s.filter, keywords),
    })),
  clearFilter: () =>
    set((s) => ({
      activeProjects: applyFilters(s.projects, 'All', s.keywordFilters),
      filter: 'All',
    })),
}));
