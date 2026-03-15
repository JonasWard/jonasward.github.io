import { useRef, useState } from 'react';
import { useProjectStore } from '../../../state/projectStore';
import { getProjectKeywords } from '../../../utils/projectconstructor';
import { allProjects } from '../../../data/projects/allProjects';
import './KeywordFilterBar.css';

const ALL_KEYWORDS = [
  ...new Set(allProjects.flatMap((p) => getProjectKeywords(p.metaData).map((k) => String(k).toLowerCase())))
].sort();

export const KeywordFilterBar: React.FC = () => {
  const keywordFilters = useProjectStore((s) => s.keywordFilters);
  const toggleKeyword = useProjectStore((s) => s.toggleKeyword);
  const filter = useProjectStore((s) => s.filter);
  const projects = useProjectStore((s) => s.projects);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const wouldHaveResults = (candidate: string): boolean => {
    const testKeywords = [...keywordFilters, candidate];
    const byCategory = filter === 'All' ? projects : projects.filter((p) => p.metaData.projectType === filter);
    return byCategory.some((p) => {
      const kws = getProjectKeywords(p.metaData).map((k) => String(k).toLowerCase());
      return testKeywords.every((kw) => kws.includes(kw.toLowerCase()));
    });
  };

  const suggestions = ALL_KEYWORDS.filter(
    (kw) => !keywordFilters.includes(kw) && kw.toLowerCase().includes(inputValue.toLowerCase()) && wouldHaveResults(kw)
  );

  return (
    <div className="keyword-filter-inner">
      {keywordFilters.map((kw) => (
        <button key={kw} className="kf-chip" onClick={() => toggleKeyword(kw)}>
          {kw} <span>×</span>
        </button>
      ))}
      <div className="kf-input-wrap">
        <input
          ref={inputRef}
          className="kf-input"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={keywordFilters.length === 0 ? 'filter by keyword…' : '+'}
        />
        {open && suggestions.length > 0 && (
          <div className="kf-dropdown">
            {suggestions.map((kw) => (
              <button
                key={kw}
                className="kf-suggestion"
                onMouseDown={() => {
                  toggleKeyword(kw);
                  setInputValue('');
                }}
              >
                {kw}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
