import { getPrimaryColorForString, getSecondaryColorForString } from '../localisation/colorForString';
import './ProjectChip.css';

interface IProjectChipProps {
  name: string;
  size?: number;
}

export const ProjectChip: React.FC<IProjectChipProps> = ({ name, size = 24 }) => {
  return (
    <div
      className='project-chip'
      style={{
        backgroundColor: getSecondaryColorForString(name),
        color: getPrimaryColorForString(name),
        display: 'inline-block',
        fontSize: size * 0.55,
        padding: '0 4px',
      }}
    >
      {name}
    </div>
  );
};
