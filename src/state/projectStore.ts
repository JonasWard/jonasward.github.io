import { create } from 'zustand';
import { ProjectData } from '../types/projectContent/projectData';
import { ProjectCategoryFilterType } from '../types/navigation/filterType';
import { allProjects } from 'src/data/projects/allProjects';

export type ProjectStoreType = {
  projects: ProjectData[];
  setProjects: (projects: ProjectData[]) => void;
  activeProjects: ProjectData[];
  filter: ProjectCategoryFilterType;
  setFilter: (filter: ProjectCategoryFilterType) => void;
  clearFilter: () => void;
};

export const useProjectStore = create<ProjectStoreType>()((set, get) => ({
  projects: allProjects,
  setProjects: (projects: ProjectData[]) => set(() => ({ projects })),
  activeProjects: [],
  filter: 'All',
  setFilter: (filter: ProjectCategoryFilterType) =>
    set((s) => ({
      activeProjects: filter === 'All' ? s.projects : s.projects.filter((p) => p.metaData.projectType === filter),
      filter
    })),
  clearFilter: () => set((s) => ({ activeProjects: s.projects, filter: 'All' }))
}));
