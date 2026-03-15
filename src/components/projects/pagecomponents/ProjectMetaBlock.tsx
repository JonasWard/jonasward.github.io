import { useNavigate } from 'react-router-dom';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectRoutes } from '../../../types/navigation/projectroutes';
import './projectMetaBlock.css';
import { useProjectStore } from 'src/state/projectStore';

interface IProjectMetaBlockProps {
  metaData: ProjectMetaData;
}

export const ProjectMetaBlock: React.FC<IProjectMetaBlockProps> = ({ metaData }) => {
  const navigate = useNavigate();

  const goToFilter = (keyword: string) => {
    navigate(`${ProjectRoutes.Projects}?k=${encodeURIComponent(keyword)}`);
    useProjectStore.getState().setKeywordFilters([keyword]);
  };

  return (
    <div className={`project-meta-block-left ${metaData.projectType}`}>
      <div className="project-meta-block">
        <div className="meta-item">
          <span className="meta-label">category</span>
          <button className="meta-value meta-value--link" onClick={() => goToFilter(metaData.projectType)}>
            {metaData.projectType}
          </button>
        </div>
        <div className="meta-item">
          <span className="meta-label">context</span>
          <button className="meta-value meta-value--link" onClick={() => goToFilter(metaData.projectContext)}>
            {metaData.projectContext}
          </button>
        </div>
        <div className="meta-item">
          <span className="meta-label">collaboration</span>
          <button className="meta-value meta-value--link" onClick={() => goToFilter(metaData.projectPartnerContext)}>
            {metaData.projectPartnerContext}
          </button>
        </div>
        {metaData.projectPartners && metaData.projectPartners.length > 0 && (
          <div className="meta-item">
            <span className="meta-label">partners</span>
            <div className="meta-partners">
              {metaData.projectPartners.map((p, i) => (
                <button key={i} className="meta-value meta-value--link" onClick={() => goToFilter(p)}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
        {metaData.keywords && metaData.keywords.length > 0 && (
          <div className="meta-item meta-item--keywords">
            <span className="meta-label">keywords</span>
            <div className="meta-keywords">
              {metaData.keywords.map((kw, i) => (
                <button key={i} className="meta-keyword" onClick={() => goToFilter(String(kw))}>
                  {kw}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
