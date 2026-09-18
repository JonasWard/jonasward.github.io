import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { useParams, useSearchParams } from 'react-router-dom';
import { ProjectCategoryFilterType } from '../../../types/navigation/filterType';
import { useProjectStore } from '../../../state/projectStore';
import { useIsMobile } from '../../../utils/useIsMobile';
import { getPaperTexture } from './paperTexture';

const CARD_WIDTH = 200;
const GAP = 16;
const MAX_COLUMNS = 6;
/** id, title, description and the keywords toggle, at the card's width */
const ASSUMED_TEXT_HEIGHT = 120;
const FALLBACK_ASPECT_RATIO = 4 / 3;

/**
 * What a card will be worth to the packer before it has been measured. The image
 * half is exact — its box is reserved from the data's aspect ratio — so only the
 * text block is guessed. Good enough to spread the cards down the page on the
 * first render, which is what lets the browser skip the off-screen images:
 * stacked at the origin they would all count as visible and load at once.
 * The measured height replaces this as soon as it is available.
 */
const estimateHeight = ({ projectImage }: ProjectData): number => {
  const { imageWidth, imageHeigth } = projectImage;
  const aspect = imageWidth && imageHeigth ? imageWidth / imageHeigth : FALLBACK_ASPECT_RATIO;
  return CARD_WIDTH / aspect + ASSUMED_TEXT_HEIGHT;
};

const PROJECT_SCROLL_OFFSET = 'project-position-offset';

type Placement = { x: number; y: number };
type Layout = { placements: Map<string, Placement>; width: number; height: number };

const EMPTY_LAYOUT: Layout = { placements: new Map(), width: CARD_WIDTH, height: 0 };

const columnsForWidth = (available: number) =>
  Math.max(1, Math.min(MAX_COLUMNS, Math.floor((available + GAP) / (CARD_WIDTH + GAP))));

/**
 * Place each card in whichever column is currently shortest, rather than dealing
 * them out round robin, so the columns end level even though cards differ in
 * height. Cards keep their document order, so reading and tab order still run
 * newest first across the grid.
 */
const packLayout = (projects: ProjectData[], heights: Map<string, number>, columnCount: number): Layout => {
  const bottoms = new Array<number>(columnCount).fill(0);
  const placements = new Map<string, Placement>();

  projects.forEach((project) => {
    let shortest = 0;
    for (let c = 1; c < columnCount; c++) if (bottoms[c] < bottoms[shortest]) shortest = c;

    const key = project.metaData.webstring;
    placements.set(key, { x: shortest * (CARD_WIDTH + GAP), y: bottoms[shortest] });
    bottoms[shortest] += (heights.get(key) ?? estimateHeight(project)) + GAP;
  });

  return {
    placements,
    width: columnCount * (CARD_WIDTH + GAP) - GAP,
    height: Math.max(0, ...bottoms) - GAP
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

  const isMobile = useIsMobile();
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef(new Map<string, HTMLElement>());
  const measuredHeights = useRef(new Map<string, number>());

  const hasHydratedKeywords = useRef(false);

  // Sync category filter from path param
  useEffect(() => {
    useProjectStore
      .getState()
      .setFilter(isProjectCategoryFilterType(filter) ? (filter as ProjectCategoryFilterType) : 'All');
  }, [filter]);

  // Hydrate keyword filters from URL once, then keep the URL in sync.
  // Skip syncing on the hydrate pass so an empty store doesn't wipe ?k= before seed applies.
  useEffect(() => {
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

  // seeded from the estimates, so the very first paint already has the cards
  // spread down the page rather than stacked at the origin
  const [layout, setLayout] = useState<Layout>(() =>
    typeof window === 'undefined'
      ? EMPTY_LAYOUT
      : packLayout(projects, new Map(), columnsForWidth(window.innerWidth - 2 * 16))
  );
  const [hasPacked, setHasPacked] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  // ---------------------------------------------------------------- packing

  const repack = useCallback(() => {
    const available = (gridRef.current?.parentElement?.clientWidth ?? window.innerWidth) - 2 * 16;
    setLayout(packLayout(useProjectStore.getState().activeProjects, measuredHeights.current, columnsForWidth(available)));
    setHasPacked(true);
  }, []);

  // Measure what actually rendered, then pack from that. Estimating the text
  // block from its character count is unreliable while the Montserrat faces are
  // still loading, and one ResizeObserver covers font loading, filtering and
  // resizing alike. Cards keep one parent, so a repack moves them rather than
  // remounting them — their entrance animation and open keywords survive it.
  useLayoutEffect(() => {
    if (isMobile) {
      setHasPacked(true);
      return;
    }

    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(repack);
    };

    const readHeights = () => {
      let changed = false;
      cardRefs.current.forEach((element, key) => {
        const height = element.offsetHeight;
        if (height > 0 && measuredHeights.current.get(key) !== height) {
          measuredHeights.current.set(key, height);
          changed = true;
        }
      });
      if (changed) schedule();
    };

    readHeights();
    repack();

    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(readHeights);
    cardRefs.current.forEach((element) => observer?.observe(element));

    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('resize', schedule);
    };
  }, [projects, projectFilter, isMobile, repack]);

  // ---------------------------------------------------------------- paper

  useEffect(() => {
    let cancelled = false;

    const apply = () => {
      getPaperTexture().then((texture) => {
        if (!cancelled && texture) document.documentElement.style.setProperty('--paper-texture', texture);
      });
    };

    // after first paint, since the cards read perfectly well without the grain.
    // requestIdleCallback is missing from older Safari and from this project's
    // TypeScript dom lib, hence the lookup rather than a direct call.
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const handle = idle ? idle(apply) : window.setTimeout(apply, 200);

    return () => {
      cancelled = true;
      const cancelIdle = (window as unknown as { cancelIdleCallback?: (handle: number) => void }).cancelIdleCallback;
      if (idle && cancelIdle) cancelIdle(handle);
      else window.clearTimeout(handle);
    };
  }, []);

  // ------------------------------------------------------- header clearance

  useEffect(() => {
    const header = document.querySelector('.header');
    if (!header) return;

    const publish = () =>
      document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);

    publish();
    // the keyword filter bar renders inside the header, so wrapping chips grow it
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(publish);
    observer?.observe(header);
    return () => observer?.disconnect();
  }, []);

  // -------------------------------------------------- scroll position memory

  useEffect(() => {
    const grid = gridRef.current;
    const target: HTMLElement | Window = isMobile && grid ? grid : window;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        localStorage.setItem(PROJECT_SCROLL_OFFSET, `${isMobile && grid ? grid.scrollLeft : window.scrollY}`);
      });
    };

    target.addEventListener('scroll', onScroll, { passive: true });

    const saved = Number(localStorage.getItem(PROJECT_SCROLL_OFFSET) ?? 0);
    if (saved > 0) {
      if (isMobile && grid) {
        // mandatory snapping will re-snap an assignment made while it is active,
        // so it is lifted for the one frame the restore takes
        const snap = grid.style.scrollSnapType;
        grid.style.scrollSnapType = 'none';
        grid.scrollLeft = saved;
        requestAnimationFrame(() => {
          grid.style.scrollSnapType = snap;
        });
      } else {
        window.scrollTo(0, saved);
      }
    }

    return () => {
      cancelAnimationFrame(frame);
      target.removeEventListener('scroll', onScroll);
    };
  }, [isMobile]);

  // --------------------------------------------------- which card is centred

  useEffect(() => {
    const grid = gridRef.current;
    if (!isMobile || !grid || typeof IntersectionObserver === 'undefined') return;

    const order = new Map(projects.map((project, index) => [project.metaData.webstring, index]));
    const visible = new Set<HTMLElement>();

    const pickCentred = () => {
      const bounds = grid.getBoundingClientRect();
      const centre = bounds.left + bounds.width / 2;

      let best: HTMLElement | null = null;
      let bestDistance = Infinity;
      visible.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - centre);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = element;
        }
      });

      const index = order.get((best as HTMLElement | null)?.dataset.project ?? '');
      if (index !== undefined) setFocusedIndex(index);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) visible.add(element);
          else visible.delete(element);
        });
        pickCentred();
      },
      // A band down the middle of the strip, kept comfortably wider than the gap
      // between cards: a hairline band lets a gap straddle the centre so that no
      // card matches at all. Whichever of the matches is nearest the centre wins.
      { root: grid, rootMargin: '0px -35% 0px -35%', threshold: 0 }
    );

    cardRefs.current.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isMobile, projects]);

  const registerCard = useCallback((key: string, element: HTMLElement | null) => {
    if (element) {
      element.dataset.project = key;
      cardRefs.current.set(key, element);
    } else {
      cardRefs.current.delete(key);
    }
  }, []);

  const gridStyle = useMemo(
    () => (isMobile ? undefined : { width: layout.width, height: layout.height }),
    [isMobile, layout]
  );

  return (
    <>
      {/* the tone the cards lie on, for as long as the overview is mounted */}
      <div className="project-page-tone" aria-hidden="true" />

      {/* the page's only h1: the header's logo is an image, so without this the
          cards' h2 titles would have nothing to hang off */}
      <h1 className="visually-hidden">Projects</h1>

      <div
        ref={gridRef}
        className="project-grid"
        data-packed={hasPacked}
        data-mobile={isMobile}
        style={gridStyle}
        role={isMobile ? 'group' : undefined}
        aria-label={isMobile ? 'projects, swipe sideways' : undefined}
      >
        {projects.map((project, index) => {
          const placement = layout.placements.get(project.metaData.webstring);
          return (
            <ProjectCard
              key={project.metaData.webstring}
              ref={(element) => registerCard(project.metaData.webstring, element)}
              metaData={project.metaData}
              keyImage={project.projectImage}
              isInFocus={isMobile && index === focusedIndex}
              // the position is handed over as custom properties rather than as a
              // transform, so the card's hover lift can compose with it instead of
              // being overridden by this inline style
              style={
                isMobile || !placement
                  ? undefined
                  : ({ '--card-x': `${placement.x}px`, '--card-y': `${placement.y}px` } as React.CSSProperties)
              }
            />
          );
        })}
      </div>

      {isMobile && projects.length > 1 && (
        <div className="project-carousel-progress" aria-hidden="true">
          <div
            className="project-carousel-progress-thumb"
            style={{
              width: `${100 / projects.length}%`,
              transform: `translateX(${focusedIndex * 100}%)`
            }}
          />
        </div>
      )}
    </>
  );
};

export default ProjectOverview;
