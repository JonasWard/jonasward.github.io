import { useProjectStore } from 'src/state/projectStore';
import { ProjectRoutes } from 'src/types/navigation/projectroutes';
import { ProjectChip } from './ProjectChip';
import { useNavigate } from 'react-router-dom';

export const KeywordButton: React.FC<{ keyword: string; show: boolean }> = ({ keyword, show }) => {
  const navigate = useNavigate();

  const goToFilter = (e: Event) => {
    e.stopPropagation();
    if (window.location.hash.includes(ProjectRoutes.Projects)) {
      if (!useProjectStore.getState().keywordFilters.includes(keyword))
        useProjectStore.getState().setKeywordFilters([...useProjectStore.getState().keywordFilters, keyword]);
    } else {
      navigate(`${ProjectRoutes.Projects}?k=${encodeURIComponent(keyword)}`);
      useProjectStore.getState().setKeywordFilters([keyword]);
    }
  };

  return <ProjectChip name={keyword} onClick={goToFilter} show={show} />;
};
