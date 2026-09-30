import { useLayoutEffect, useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { useParams, useSearchParams } from 'react-router-dom';
import { ProjectCategoryFilterType } from '../../../types/navigation/filterType';
import { useProjectStore } from '../../../state/projectStore';

const mobileViewWidth = 570;
const horizontalSpacing = 200;
const gap = 16;
const padding = 0;
const horizontalGridSpacing = horizontalSpacing + padding + gap;
const rawCardWidth = 200;

const maxCardColumns = 6;
const totalCardWidth = horizontalGridSpacing * maxCardColumns + gap;

const getInnerWidth = (): number => Math.min(totalCardWidth, window?.visualViewport?.width ?? window.innerWidth);

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

type GridLayout = { columns: ProjectData[][]; marginLeft: string; minWidth: number };

const computeLayout = (projects: ProjectData[]): GridLayout => {
  const columns = getColumnLogic(projects);
  const columnsWidth = columns.length * (rawCardWidth + gap) - gap;
  const isMobile = window.innerWidth < mobileViewWidth;
  const mobileInset = (window.innerWidth - rawCardWidth) * 0.5;

  return {
    columns,
    marginLeft: `${isMobile ? mobileInset : (window.innerWidth - columnsWidth) * 0.5}px`,
    minWidth: isMobile ? columnsWidth + mobileInset : columnsWidth
  };
};

const isProjectCategoryFilterType = (s: string | undefined) =>
  Object.values(ProjectCategory).includes(s as ProjectCategory) || s === 'All';

export const ProjectOverview: React.FC = () => {
  const { filter } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const projectFilter = useProjectStore((s) => s.filter);
  const keywordFilters = useProjectStore((s) => s.keywordFilters);
  const projects = useProjectStore((s) => s.activeProjects);

  const hasHydratedKeywords = useRef(false);

  // Sync category filter from path param, before paint so the unfiltered grid never flashes
  useLayoutEffect(() => {
    useProjectStore
      .getState()
      .setFilter(isProjectCategoryFilterType(filter) ? (filter as ProjectCategoryFilterType) : 'All');
  }, [filter]);

  // Hydrate keyword filters from URL once, then keep the URL in sync.
  // Skip syncing on the hydrate pass so an empty store doesn't wipe ?k= before seed applies.
  useLayoutEffect(() => {
    if (!hasHydratedKeywords.current) {
      hasHydratedKeywords.current = true;
      const k = searchParams.get('k');
      const initial = k ? k.split(',').filter(Boolean) : [];
      if (initial.length > 0) useProjectStore.getState().setKeywordFilters(initial);
      return;
    }

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (keywordFilters.length > 0) next.set('k', keywordFilters.join(','));
        else next.delete('k');
        return next.toString() === prev.toString() ? prev : next;
      },
      { replace: true }
    );
  }, [keywordFilters, searchParams, setSearchParams]);

  // only the horizontal scroll position is needed to highlight the card in focus on mobile
  const [scrollX, setScrollX] = useState<number>(window.scrollX);
  // computed synchronously so the first paint already has the final grid, nothing jumps into place afterwards
  const [layout, setLayout] = useState<GridLayout>(() => computeLayout(projects));

  useLayoutEffect(() => {
    window.scrollTo(
      Number(localStorage.getItem(PROJECT_POSITION_OFFSET_X) ?? 0),
      Number(localStorage.getItem(PROJECT_POSITION_OFFSET_Y) ?? 0)
    );

    // scroll events fire far more often than frames get painted, handle at most one per frame
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrollX(window.scrollX);
      });
    };
    const storeScrollPosition = () => {
      localStorage.setItem(PROJECT_POSITION_OFFSET_X, `${window.scrollX}`);
      localStorage.setItem(PROJECT_POSITION_OFFSET_Y, `${window.scrollY}`);
    };
    const onResize = () => setLayout(computeLayout(useProjectStore.getState().activeProjects));

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('pagehide', storeScrollPosition);

    return () => {
      cancelAnimationFrame(frame);
      storeScrollPosition();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pagehide', storeScrollPosition);
    };
  }, []);

  useLayoutEffect(() => {
    setLayout(computeLayout(projects));
  }, [projects, projectFilter]);

  return (
    <div style={{ marginLeft: layout.marginLeft, minWidth: layout.minWidth }} className="project-grid">
      {layout.columns.map((column, jndex) => (
        <div key={jndex} style={{ display: 'flex', flexDirection: 'column', gap }}>
          {column.map((project, index) => (
            <ProjectCard
              key={project.id}
              index={index}
              metaData={project.metaData}
              keyImage={project.projectImage}
              currentScrollX={scrollX}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProjectOverview;
