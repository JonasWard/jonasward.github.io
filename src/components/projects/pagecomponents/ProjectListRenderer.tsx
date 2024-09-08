import { ProjectList } from '../../../types/projectContent/projectList';
import './projectContent.css';

export const ProjectListRenderer: React.FC<{ content: ProjectList }> = ({ content }) => {
  return content.content.length === 0 ? null : (
    <div className='link-block'>
      {content.title ? <h1>{content.title}</h1> : null}
      {content.description ? <p>{content.description}</p> : null}
      {typeof content.content[0] === 'string'
        ? content.content.map((s) => <span>{s}</span>)
        : (content.content as [string, string][]).map(([s0, s1]) => (
            <div>
              <span>{s0}</span>
              <span>{s1}</span>
            </div>
          ))}
    </div>
  );
};
