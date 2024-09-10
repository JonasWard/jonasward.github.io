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
        display: 'inline-block',
        fontSize: size * 0.5,
        padding: `${0.05 * size}px ${0.25 * size}px`,
      }}
      onClick={onClick as any}
    >
      {name}
    </div>
  );
};
