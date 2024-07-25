import { getPrimaryColorForString, getSecondaryColorForString } from '../localisation/colorForString';

interface IProjectChipProps {
  name: string;
  size?: number;
}

export const ProjectChip: React.FC<IProjectChipProps> = ({ name, size = 22 }) => {
  return (
    <div
      style={{
        backgroundColor: getSecondaryColorForString(name),
        color: getPrimaryColorForString(name),
        borderRadius: size / 2,
        display: 'inline-block',
        fontSize: size * 0.55,
        padding: '0 4px',
      }}
    >
      {name}
    </div>
  );
};
