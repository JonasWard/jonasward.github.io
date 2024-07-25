import { ProjectText } from '../../types/projectContent/projectText';
import './projectContent.css';

export const ProjectTextRenderer: React.FC<{ content: ProjectText }> = ({ content }) => {
  return (
    <div className='text-block'>
      {content.content.map(([text, title], index) => (
        <div>
          {title ? <h2>{title}</h2> : null}
          <p key={index}>{text}</p>
        </div>
      ))}
    </div>
  );
};
