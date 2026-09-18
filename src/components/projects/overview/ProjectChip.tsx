import './ProjectChip.css';

interface IProjectChipProps {
  name: string;
  show?: boolean;
  size?: number;
  onClick?: (e: React.MouseEvent) => void;
}

export const ProjectChip: React.FC<IProjectChipProps> = ({ name, size = 24, onClick, show = true }) => {
  return (
    <button
      type="button"
      className={`project-chip ${show ? 'show' : 'hidden'}`}
      // a collapsed chip is still in the dom for the reveal transition, so it is
      // taken out of the tab order explicitly rather than only being clipped
      tabIndex={show ? undefined : -1}
      style={{
        display: 'inline-block',
        fontSize: size * 0.5,
        padding: `${0.05 * size}px ${0.25 * size}px`
      }}
      onClick={onClick}
    >
      {name}
    </button>
  );
};
