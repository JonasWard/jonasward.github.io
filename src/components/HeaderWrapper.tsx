import { Suspense } from 'react';
import { Header } from './Header';

// the suspense boundaries keep the header on screen while a lazily loaded route (or its filter bar) is fetched
export const HeaderWrapper: React.FC<{ content: React.ReactNode; children?: React.ReactNode }> = ({
  content,
  children
}) => (
  <>
    <Header children={children && <Suspense fallback={null}>{children}</Suspense>} />
    <Suspense fallback={null}>{content}</Suspense>
  </>
);
