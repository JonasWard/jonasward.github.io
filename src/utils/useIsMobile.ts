import { useEffect, useState } from 'react';

/**
 * The site's mobile breakpoint, in one place.
 *
 * 569.98 rather than 570 so that a `max-width` rule and the matching
 * `min-width` rule cannot both apply at exactly 570px, which they did.
 * The css files repeat the literal — keep them in step with this.
 */
export const MOBILE_MAX_WIDTH = 569.98;
export const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_MAX_WIDTH}px)`;

const matches = (query: string) => (typeof window === 'undefined' ? false : window.matchMedia(query).matches);

/** true while the viewport is at or below the mobile breakpoint */
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(() => matches(MOBILE_MEDIA_QUERY));

  useEffect(() => {
    const list = window.matchMedia(MOBILE_MEDIA_QUERY);
    const onChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);

    // the viewport can have crossed the breakpoint between first render and here
    setIsMobile(list.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, []);

  return isMobile;
};
