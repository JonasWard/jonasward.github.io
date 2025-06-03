import { useEffect, useMemo, useState } from 'react';
import ProjectCard from './ProjectCard';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { useParams } from 'react-router-dom';
import { ProjectCategoryFilterType } from '../../../types/navigation/filterType';
import { useProjectStore } from '../../../state/projectStore';

const getInnerWidth = (): number => Math.min(1495, window.innerWidth);

const mobileViewWidth = 570;
const horizontalSpacing = 200;
const gap = 25;
const padding = 20;
const horizontalGridSpacing = horizontalSpacing + padding + gap;
const rawCardWidth = 216;

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
  const projectFilter = useProjectStore((s) => s.filter);
  const projects = useProjectStore((s) => s.activeProjects);

  useEffect(() => {
    useProjectStore
      .getState()
      .setFilter(isProjectCategoryFilterType(filter) ? (filter as ProjectCategoryFilterType) : 'All');
  }, [filter]);

  const [centerPosition, setCenterPosition] = useState<[number, number]>([0, window.innerHeight * 0.5]);

  const [positions, setPositions] = useState<ProjectData[][]>(getColumnLogic(projects));
  const [marginLeft, setMarginLeft] = useState<string>('calc((100vw - 216px) * 0.5)');
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
