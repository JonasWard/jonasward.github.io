import { ProjectText } from '../../../types/projectContent/projectText';
import './projectContent.css';

export const ProjectTextRenderer: React.FC<{ content: ProjectText }> = ({ content }) => {
  return (
    <div className={`text-block columns-${content.maxColumnCount}`}>
      {content.content.map((content, index) =>
        Array.isArray(content) ? (
          <>
            <h2 id={`${index}-title`}>{content[0]}</h2>
            <p id={`${index}-p`}>{content[1]}</p>
          </>
        ) : (
          <p id={`${index}`}>{content}</p>
        )
      )}
    </div>
  );
};
