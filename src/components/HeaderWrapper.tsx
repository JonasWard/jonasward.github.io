import { Header } from './Header';

export const HeaderWrapper: React.FC<{ content: React.ReactNode; children?: React.ReactNode }> = ({
  content,
  children
}) => (
  <>
    <Header children={children} />
    {content}
  </>
);
