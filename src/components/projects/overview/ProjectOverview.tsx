import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { useParams, useSearchParams } from 'react-router-dom';
import { ProjectCategoryFilterType } from '../../../types/navigation/filterType';
import { useProjectStore } from '../../../state/projectStore';

const getInnerWidth = (): number => Math.min(1200 + 50, window?.visualViewport?.width ?? window.innerWidth);

const mobileViewWidth = 570;
const horizontalSpacing = 200;
const gap = 25;
const padding = 0;
const horizontalGridSpacing = horizontalSpacing + padding + gap;
const rawCardWidth = 200;

const PROJECT_POSITION_OFFSET_X = 'project-position-offset-x';
const PROJECT_POSITION_OFFSET_Y = 'project-position-offset-y';

const getColumnsForWidthAndProjects = (projects: ProjectData[], innerWidth: number) =>
  innerWidth < mobileViewWidth ? projects.length : Math.floor((innerWidth - gap) / horizontalGridSpacing);

const getColumnLogic = (allProjects: ProjectData[]): ProjectData[][] => {
  const columnCount = getColumnsForWidthAndProjects(allProjects, getInnerWidth());
  const columnLogic: ProjectData[][] = [...Array(columnCount)].map(() => []);

  allProjects.forEach((projectData, index) => columnLogic[index % columnCount].push(projectData));

  return columnLogic;
};

const isProjectCategoryFilterType = (s: string | undefined) =>
  Object.values(ProjectCategory).includes(s as ProjectCategory) || s === 'All';

export const ProjectOverview: React.FC = () => {
  const { filter } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const projectFilter = useProjectStore((s) => s.filter);
  const keywordFilters = useProjectStore((s) => s.keywordFilters);
  const projects = useProjectStore((s) => s.activeProjects);

  // Sync category filter from path param
  useEffect(() => {
    useProjectStore
      .getState()
      .setFilter(isProjectCategoryFilterType(filter) ? (filter as ProjectCategoryFilterType) : 'All');
  }, [filter]);

  // Seed keyword filters from URL on first load
  useEffect(() => {
    const k = searchParams.get('k');
    const initial = k ? k.split(',').filter(Boolean) : [];
    if (initial.length > 0) useProjectStore.getState().setKeywordFilters(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep URL in sync with keyword filter state
  useEffect(() => {
    setSearchParams(
      (prev) => {
        if (keywordFilters.length > 0) prev.set('k', keywordFilters.join(','));
        else prev.delete('k');
        return prev;
      },
      { replace: true }
    );
  }, [keywordFilters, setSearchParams]);

  const [centerPosition, setCenterPosition] = useState<[number, number]>([0, window.innerHeight * 0.5]);

  const [positions, setPositions] = useState<ProjectData[][]>(getColumnLogic(projects));
  const [marginLeft, setMarginLeft] = useState<string>('calc((100vw - 200px) * 0.5)');
  const [minWidth, setMinWidth] = useState<number>(0);

  const onScroll = () => {
    setCenterPosition([window.scrollX, window.scrollY + window.innerHeight * 0.5]);
    localStorage.setItem(PROJECT_POSITION_OFFSET_X, `${window.scrollX}`);
    localStorage.setItem(PROJECT_POSITION_OFFSET_Y, `${window.scrollY}`);
  };

  const onScreenScale = () => {
    const columnData = getColumnLogic(useProjectStore.getState().activeProjects);

    window.innerWidth < mobileViewWidth
      ? setMarginLeft(`${(window.innerWidth - rawCardWidth) * 0.5}px`)
      : setMarginLeft(`${(window.innerWidth - columnData.length * (rawCardWidth + gap) + gap) * 0.5}px`);

    window.innerWidth < mobileViewWidth
      ? setMinWidth(columnData.length * (rawCardWidth + gap) - gap + (window.innerWidth - rawCardWidth) * 0.5)
      : setMinWidth(columnData.length * (rawCardWidth + gap) - gap);

    setPositions(getColumnLogic(useProjectStore.getState().activeProjects));
  };

  useEffect(() => {
    const localOnScreenScale = () => onScreenScale();
    window.addEventListener('resize', localOnScreenScale);
    window.addEventListener('scroll', onScroll);
    setTimeout(onScreenScale, 1000);

    const scrollX = Number(localStorage.getItem(PROJECT_POSITION_OFFSET_X) ?? 0);
    const scrollY = Number(localStorage.getItem(PROJECT_POSITION_OFFSET_Y) ?? 0);

    window.scrollTo(scrollX, scrollY);

    return () => {
      window.removeEventListener('resize', localOnScreenScale);
      window.removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onScreenScale();
  }, [projects, projectFilter]);

  return (
    <div style={{ marginLeft, minWidth }} className="project-grid">
      {positions.map((column, jndex) => (
        <div key={jndex} style={{ display: 'flex', flexDirection: 'column', gap }}>
          {column.map((project, index) => (
            <ProjectCard
              key={index}
              index={index}
              metaData={project.metaData}
              keyImage={project.projectImage}
              currentCenterPosition={centerPosition}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProjectOverview;
