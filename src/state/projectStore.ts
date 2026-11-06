import { create } from 'zustand';
import { ProjectData } from '../types/projectContent/projectData';
import { ProjectCategoryFilterType } from '../types/navigation/filterType';
import { allProjects } from 'src/data/projects/allProjects';
import { filterProjects } from 'src/utils/filterProjects';

const applyFilters = filterProjects;

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
