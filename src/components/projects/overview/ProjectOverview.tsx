import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { useParams } from 'react-router-dom';
import { ProjectCategoryFilterType } from '../../../types/navigation/filterType';

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

const filterProjects = (projects: ProjectData[], filter: ProjectFilter) => {
  switch (filter) {
    case 'All':
      return projects;
    default:
      return projects.filter((p) => p.metaData.projectType === filter);
  }
};

const isProjectFilter = (s: string) => Object.values(ProjectCategory).includes(s as ProjectCategory) || s === 'All';

export const ProjectOverview: React.FC<{ projects: ProjectData[] }> = ({ projects }) => {
  const { filter } = useParams();

  const [centerPosition, setCenterPosition] = useState<[number, number]>([0, window.innerHeight * 0.5]);
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>(filter && isProjectFilter(filter) ? (filter as ProjectFilter) : 'All');
  const [activeProjects, setActiveProjects] = useState<ProjectData[]>(projects);

  const [positions, setPositions] = useState<ProjectData[][]>(getColumnLogic(projects));
  const [marginLeft, setMarginLeft] = useState<string>('calc((100vw - 216px) * 0.5)');
  const [minWidth, setMinWidth] = useState<number>(0);

  const onScroll = () => {
    setCenterPosition([window.scrollX, window.scrollY + window.innerHeight * 0.5]);
    localStorage.setItem(PROJECT_POSITION_OFFSET_X, `${window.scrollX}`);
    localStorage.setItem(PROJECT_POSITION_OFFSET_Y, `${window.scrollY}`);
  };

  const onScreenScale = (activeProjects: ProjectData[]) => {
    const columnData = getColumnLogic(activeProjects);

    window.innerWidth < mobileViewWidth
      ? setMarginLeft(`${(window.innerWidth - rawCardWidth) * 0.5}px`)
      : setMarginLeft(`${(window.innerWidth - columnData.length * (rawCardWidth + gap) + gap) * 0.5}px`);

    window.innerWidth < mobileViewWidth
      ? setMinWidth(columnData.length * (rawCardWidth + gap) - gap + (window.innerWidth - rawCardWidth) * 0.5)
      : setMinWidth(columnData.length * (rawCardWidth + gap) - gap);

    setActiveProjects(activeProjects);
    setPositions(getColumnLogic(activeProjects));
  };

  useEffect(() => {
    onScreenScale(filterProjects(projects, projectFilter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, projectFilter]);

  useEffect(() => {
    onScreenScale(filterProjects(projects, projectFilter)); // initial
    const localOnScreenScale = () => onScreenScale(activeProjects);
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
  }, [activeProjects]);

  const handleFilterChange = (filter: ProjectFilter) => {
    setProjectFilter(filter);
    window.location.hash = `projects/${filter}`;
  };

  return (
    <>
      <div style={{ marginLeft, minWidth }} className='project-grid'>
        {positions.map((column, jndex) => (
          <div key={jndex} style={{ display: 'flex', flexDirection: 'column', gap }}>
            {column.map((project, index) => (
              <ProjectCard key={index} index={index} metaData={project.metaData} keyImage={project.projectImage} currentCenterPosition={centerPosition} />
            ))}
          </div>
        ))}
      </div>
      <select
        style={{ position: 'fixed', zIndex: 1000, left: '50svw', top: 19, border: 'none', background: '#f5f5f5', borderRadius: 7, padding: 2 }}
        value={projectFilter}
        onChange={(v) => handleFilterChange(v.target.value as ProjectFilter)}
      >
        <option value={'All'}>All</option>
        {Object.values(ProjectCategory).map((k) => (
          <option value={k}>{k}</option>
        ))}
      </select>
    </>
  );
};

export default ProjectOverview;
