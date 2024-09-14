import { useEffect, useState } from 'react';
import { allProjects } from '../../../data/projects/allProjects';
import ProjectCard from './ProjectCard';
import { ProjectData } from '../../../types/projectContent/projectData';

const getInnerWidth = (): number => Math.min(1495, window.innerWidth);

const mobileViewWidth = 570;
const horizontalSpacing = 200;
const gap = 25;
const padding = 20;
const horizontalGridSpacing = horizontalSpacing + padding + gap;
const rawCardWidth = 216;

const getColumnsForWidthAndProjects = (projects: ProjectData[], innerWidth: number) =>
  innerWidth < mobileViewWidth ? projects.length : Math.floor((innerWidth - gap) / horizontalGridSpacing);

const getColumnLogic = (allProjects: ProjectData[]): ProjectData[][] => {
  const columnCount = getColumnsForWidthAndProjects(allProjects, getInnerWidth());
  const columnLogic: ProjectData[][] = [...Array(columnCount)].map(() => []);

  allProjects.forEach((projectData, index) => columnLogic[index % columnCount].push(projectData));

  return columnLogic;
};

export const ProjectOverview = () => {
  const [centerPosition, setCenterPosition] = useState<[number, number]>([115, window.innerHeight * 0.5]);

  const [positions, setPositions] = useState<ProjectData[][]>(getColumnLogic(allProjects));
  const [marginLeft, setMarginLeft] = useState<string>('calc((100vw - 216px) * 0.5)');
  const [minWidth, setMinWidth] = useState<number>(0);

  const onScroll = () => setCenterPosition([window.scrollX, window.scrollY + window.innerHeight * 0.5]);

  const onScreenScale = () => {
    const columnData = getColumnLogic(allProjects);

    window.innerWidth < mobileViewWidth
      ? setMarginLeft(`${(window.innerWidth - rawCardWidth) * 0.5}px`)
      : setMarginLeft(`${(window.innerWidth - columnData.length * (rawCardWidth + gap) + gap) * 0.5}px`);

    window.innerWidth < mobileViewWidth
      ? setMinWidth(columnData.length * (rawCardWidth + gap) - gap + (window.innerWidth - rawCardWidth) * 0.5)
      : setMinWidth(columnData.length * (rawCardWidth + gap) - gap);

    setPositions(getColumnLogic(allProjects));
  };

  useEffect(() => {
    onScreenScale(); // initial
    window.addEventListener('resize', onScreenScale);
    window.addEventListener('scroll', onScroll);
    setTimeout(onScreenScale, 1000);

    return () => {
      window.removeEventListener('resize', onScreenScale);
    };
  }, []);

  return (
    <div style={{ marginLeft, minWidth }} className='project-grid'>
      {positions.map((column) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap }}>
          {column.map((project, index) => (
            <ProjectCard key={index} index={index} metaData={project.metaData} keyImage={project.projectImage} currentCenterPosition={centerPosition} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProjectOverview;
