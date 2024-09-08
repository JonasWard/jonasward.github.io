import { ReactNode } from 'react';
import { Header } from './Header';

export const HeaderWrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);
