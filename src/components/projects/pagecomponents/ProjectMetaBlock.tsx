import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import './projectMetaBlock.css';

interface IProjectMetaBlockProps {
  metaData: ProjectMetaData;
}

export const ProjectMetaBlock: React.FC<IProjectMetaBlockProps> = ({ metaData }) => (
  <div className="project-meta-block">
    <div className="meta-item">
      <span className="meta-label">category</span>
      <span className="meta-value">{metaData.projectType}</span>
    </div>
    <div className="meta-item">
      <span className="meta-label">context</span>
      <span className="meta-value">{metaData.projectContext}</span>
    </div>
    <div className="meta-item">
      <span className="meta-label">collaboration</span>
      <span className="meta-value">{metaData.projectPartnerContext}</span>
    </div>
    {metaData.projectPartners && metaData.projectPartners.length > 0 && (
      <div className="meta-item">
        <span className="meta-label">partners</span>
        <span className="meta-value">{metaData.projectPartners.join(', ')}</span>
      </div>
    )}
    {metaData.keywords && metaData.keywords.length > 0 && (
      <div className="meta-item meta-item--keywords">
        <span className="meta-label">keywords</span>
        <div className="meta-keywords">
          {metaData.keywords.map((kw, i) => (
            <span key={i} className="meta-keyword">{kw}</span>
          ))}
        </div>
      </div>
    )}
  </div>
);
