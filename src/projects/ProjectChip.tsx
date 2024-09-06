import { getPrimaryColorForString, getSecondaryColorForString } from '../localisation/colorForString';
import './ProjectChip.css';

interface IProjectChipProps {
  name: string;
  show?: boolean;
  size?: number;
  onClick?: (e: Event) => void;
}

export const ProjectChip: React.FC<IProjectChipProps> = ({ name, size = 24, onClick, show = true }) => {
  return (
    <div
      className={`project-chip ${show ? 'show' : 'hidden'}`}
      style={{
        backgroundColor: getSecondaryColorForString(name),
        color: getPrimaryColorForString(name),
        display: 'inline-block',
        fontSize: size * 0.55,
        padding: '0 4px',
      }}
      onClick={onClick as any}
    >
      {name}
    </div>
  );
};
