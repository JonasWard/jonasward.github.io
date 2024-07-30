import { useEffect, useRef, useState } from 'react';
import { Header } from '../Header';
import { allProjects } from './projectsData/allProjects';
import './ProjectOverview.css';
import ProjectCard from './ProjectCard';
import { ProjectData } from '../types/projectContent/projectData';
import { ProjectImage } from '../types/projectContent/projectImage';
import { getProjectKeywords } from './helper';

const mobileViewWidth = 501;
const getImageHeight = (keyImage: ProjectImage) => ((keyImage.imageHeigth as number) / (keyImage.imageWidth as number)) * horizontalSpacing;
const horizontalSpacing = 200;
const h2Height = 29;
const pHeight = 19.5;
const gap = 25;
const padding = 20;
const horizontalGridSpacing = horizontalSpacing + padding + gap;
const baseY = gap * 3;

const calculateApproximiteProjectCardHeight = (project: ProjectData): number => {
  const imageHeight = getImageHeight(project.projectImage);
  const titleHeight = Math.ceil(project.metaData.name.length / 10) * h2Height;
  const descriptionHeight = Math.ceil(project.metaData.description.length / 35) * h2Height;
  const keyWordLines = Math.ceil(getProjectKeywords(project.metaData).length / 2.5) * pHeight;
  const keyWordHeight = keyWordLines !== 0 ? keyWordLines * 16.5 + (keyWordLines - 1) * 4 : 0;

  return 20 * 3 + padding * 2 + imageHeight + titleHeight + descriptionHeight + keyWordHeight;
};

const getLeftForColumnIndex = (index: number) => {
  const columnCount = getColumnsForWidthAndProjects(allProjects, window.innerWidth);
  const baseX = window.innerWidth < mobileViewWidth ? gap : 0.5 * (window.innerWidth + gap - columnCount * horizontalGridSpacing);
  return (index % columnCount) * horizontalGridSpacing + baseX;
};

const getColumnsForWidthAndProjects = (projects: ProjectData[], innerWidth: number) =>
  innerWidth < mobileViewWidth ? projects.length : Math.floor((innerWidth + gap) / horizontalGridSpacing);

export const ProjectOverview = () => {
  const [width, setWidth] = useState(getColumnsForWidthAndProjects(allProjects, window.innerWidth) * horizontalGridSpacing - gap);
  const [height, setHeight] = useState(2000);
  const [hasBeenUpdatedOnce, setHasBeenUpdatedOnce] = useState(false);
  const projectCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [positions, setPositions] = useState<[number, number, number][]>(allProjects.map((_, index) => [index, getLeftForColumnIndex(index), baseY]));

  useEffect(() => {
    if (!hasBeenUpdatedOnce && projectCardRefs.current && projectCardRefs.current.every((e) => e !== null)) {
      onScreenScale();
      setHasBeenUpdatedOnce(true);
    }
  }, [projectCardRefs]);

  const onScreenScale = () => {
    const columnCount = getColumnsForWidthAndProjects(allProjects, window.innerWidth);
    const baseX = window.innerWidth < mobileViewWidth ? gap : 0.5 * (window.innerWidth + gap - columnCount * horizontalGridSpacing);

    const columns: [number, number, ProjectData][][] = [...Array(columnCount)].map((_) => []);

    allProjects.forEach((p, i) => columns[i % columnCount].push([i, baseX + (i % columnCount) * horizontalGridSpacing, p]));

    const localPositions: [number, number, number][] = [];

    let maximumHeight = 0;

    columns.forEach((column) => {
      let localY = baseY;
      column.forEach(([index, x, project]) => {
        localPositions.push([index, x, localY]);
        localY += (projectCardRefs?.current[index]?.offsetHeight as undefined | null | number)
          ? (projectCardRefs?.current[index]?.offsetHeight as number) + gap
          : calculateApproximiteProjectCardHeight(project);

        if (localY > maximumHeight) maximumHeight = localY;
      });
    });

    setWidth(getColumnsForWidthAndProjects(allProjects, window.innerWidth) * horizontalGridSpacing - gap);
    setHeight(maximumHeight + gap);
    setPositions(localPositions);
  };

  useEffect(() => {
    onScreenScale(); // initial
    window.addEventListener('resize', onScreenScale);

    return window.addEventListener('resize', onScreenScale);
  }, []);

  return (
    <>
      <Header />
      <div className='project-grid fade-in' style={{ width, height }}>
        {positions.map(([index, left, top]) => (
          <ProjectCard
            key={index}
            index={index}
            metaData={allProjects[index].metaData}
            keyImage={allProjects[index].projectImage}
            left={left}
            top={top}
            refArray={projectCardRefs}
          />
        ))}
      </div>
    </>
  );
};

export default ProjectOverview;
