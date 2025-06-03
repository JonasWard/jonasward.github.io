import { ReactNode } from 'react';
import { Header } from './Header';

export const HeaderWrapper: React.FC<{ children: ReactNode; withFilter?: boolean }> = ({ children, withFilter }) => (
  <>
    <Header withFilter={withFilter} />
    {children}
  </>
);
