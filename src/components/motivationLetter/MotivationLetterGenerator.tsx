import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import './motivationletter.css';
import {
  MotivationLetterContent,
  MotivationLetterKeys,
  MotivationLetterLocalStorage
} from '../../types/motivationLetter/content';
import { MotivationPDF } from './MotivationLetterPDF';
import { getFilenameString, MotivationLetterDefaultLocalStorageContent } from './motivationLetterDefaultContent';

export const MotivationLetterGenerator: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>(MotivationLetterKeys.defaultKey);
  const [allContent, setAllContent] = useState<MotivationLetterLocalStorage>(
    MotivationLetterDefaultLocalStorageContent
  );
  const [allKeys, setAllKeys] = useState<string[]>([MotivationLetterKeys.defaultKey]);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  useEffect(() => {
    const previousKey = localStorage.getItem(MotivationLetterKeys.lastKeyMotivationLetter);
    const previousData = localStorage.getItem(MotivationLetterKeys.motivationLetterPreviousData);
    if (previousData) {
      const motivationLetterPreviousData = JSON.parse(previousData) as MotivationLetterLocalStorage;
      if (typeof motivationLetterPreviousData === 'object') {
        const allPreviousKeys = Object.keys(motivationLetterPreviousData);
        setAllKeys(allPreviousKeys);
        setAllContent({ ...motivationLetterPreviousData, ...MotivationLetterDefaultLocalStorageContent });
        if (!previousKey || !allPreviousKeys.includes(previousKey))
          localStorage.setItem(MotivationLetterKeys.lastKeyMotivationLetter, MotivationLetterKeys.defaultKey);
        else setActiveKey(previousKey);
      }
    }
  }, []);

  const changeLocalStateAndLocalStorage = (newContent: MotivationLetterContent, activeKeyOverwrite?: string) => {
    const updatedContent = { ...allContent, [activeKeyOverwrite ?? activeKey]: newContent };
    localStorage.setItem(MotivationLetterKeys.motivationLetterPreviousData, JSON.stringify(updatedContent));
    localStorage.setItem(MotivationLetterKeys.lastKeyMotivationLetter, activeKeyOverwrite ?? activeKey);
    setAllContent(updatedContent);
    setAllKeys(Object.keys(updatedContent));
  };

  // editable content local state definition
  const [intro, setIntro] = useState<string>(allContent[activeKey].intro);
  const [title, setTitle] = useState<string>(allContent[activeKey].title);
  const [people, setPeople] = useState<string>(allContent[activeKey].people);
  const [content, setContent] = useState<string>(allContent[activeKey].content);
  const [outro, setOutro] = useState<string>(allContent[activeKey].outro);
  const [wishes, setWishes] = useState<string>(allContent[activeKey].wishes);
  const [city, setCity] = useState<string>(allContent[activeKey].city);
  const [intermediateKeyValue, setIntermediateKeyValue] = useState<string>(activeKey);

  const changeActiveKeyWrapper = (newActiveKey: string) => {
    changeLocalStateAndLocalStorage(allContent[activeKey], newActiveKey);
  };

  useEffect(() => {
    setIntro(allContent[activeKey].intro);
    setTitle(allContent[activeKey].title);
    setPeople(allContent[activeKey].people);
    setContent(allContent[activeKey].content);
    setOutro(allContent[activeKey].outro);
    setWishes(allContent[activeKey].wishes);
    setCity(allContent[activeKey].city);
    setIntermediateKeyValue(activeKey);
  }, [activeKey]);

  return (
    <div className="cv-content">
      <div id="select" style={{ display: 'flex', flexDirection: 'row', gap: 10, paddingBottom: 6 }}>
        <select
          value={activeKey}
          onChange={(k) => setActiveKey(k.target.value)}
          style={{
            border: 'none',
            background: '#f5f5f5',
            borderRadius: 7,
            padding: 2
          }}
        >
          {allKeys.map((v) => (
            <option value={v}>{v}</option>
          ))}
        </select>
        <input
          value={intermediateKeyValue}
          onBlur={() => changeActiveKeyWrapper(intermediateKeyValue)}
          onKeyDown={(e) => e.key === 'Enter' && changeActiveKeyWrapper(intermediateKeyValue)}
          onChange={(e) => setIntermediateKeyValue(e.target.value)}
          placeholder="Title"
        />
        <PDFDownloadLink
          document={<MotivationPDF motivationContent={allContent[activeKey]} />}
          fileName={getFilenameString('Motivation_Letter')}
        >
          <button
            style={{
              border: 'none',
              background: '#f5f5f5',
              borderRadius: 7,
              padding: '4px 8px',
              fontSize: 13,
              minHeight: 'unset',
              maxHeight: 'unset',
              filter: 'none',
              cursor: 'pointer'
            }}
          >
            download
          </button>
        </PDFDownloadLink>
      </div>
      <div id="myDrawer" className="drawer" style={{ left: showDrawer ? '0' : '-458px', fontFamily: 'montserrat' }}>
        Title
        <input
          type="text"
          value={title ?? undefined}
          onBlur={() => changeLocalStateAndLocalStorage({ ...allContent[activeKey], title })}
          onKeyDown={(e) => e.key === 'Enter' && changeLocalStateAndLocalStorage({ ...allContent[activeKey], title })}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        Intro
        <input
          type="text"
          value={intro ?? undefined}
          onBlur={() => changeLocalStateAndLocalStorage({ ...allContent[activeKey], intro })}
          onKeyDown={(e) => e.key === 'Enter' && changeLocalStateAndLocalStorage({ ...allContent[activeKey], intro })}
          onChange={(e) => setIntro(e.target.value)}
          placeholder="Intro"
        />
        People to Address
        <input
          type="text"
          value={people ?? undefined}
          onBlur={() => changeLocalStateAndLocalStorage({ ...allContent[activeKey], people })}
          onKeyDown={(e) => e.key === 'Enter' && changeLocalStateAndLocalStorage({ ...allContent[activeKey], people })}
          onChange={(e) => setPeople(e.target.value)}
          placeholder="People"
        />
        Content
        <textarea
          value={content ?? undefined}
          onBlur={() => changeLocalStateAndLocalStorage({ ...allContent[activeKey], content })}
          onKeyDown={(e) => e.key === 'Enter' && changeLocalStateAndLocalStorage({ ...allContent[activeKey], content })}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        Outro
        <input
          type="text"
          value={outro ?? undefined}
          onBlur={() => changeLocalStateAndLocalStorage({ ...allContent[activeKey], outro })}
          onKeyDown={(e) => e.key === 'Enter' && changeLocalStateAndLocalStorage({ ...allContent[activeKey], outro })}
          onChange={(e) => setOutro(e.target.value)}
          placeholder="Outro"
        />
        Salutations
        <input
          type="text"
          value={wishes ?? undefined}
          onBlur={() => changeLocalStateAndLocalStorage({ ...allContent[activeKey], wishes })}
          onKeyDown={(e) => e.key === 'Enter' && changeLocalStateAndLocalStorage({ ...allContent[activeKey], wishes })}
          onChange={(e) => setWishes(e.target.value)}
          placeholder="Wishes"
        />
        City
        <input
          type="text"
          value={city ?? undefined}
          onBlur={() => changeLocalStateAndLocalStorage({ ...allContent[activeKey], city })}
          onKeyDown={(e) => e.key === 'Enter' && changeLocalStateAndLocalStorage({ ...allContent[activeKey], city })}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
        />
        <button onClick={() => setShowDrawer(!showDrawer)}>
          {showDrawer ? 'Close Input Drawer' : 'Open Input Drawer'}
        </button>
      </div>
      <PDFViewer style={{ height: 'calc(100vh - 150px)' }}>
        <MotivationPDF motivationContent={allContent[activeKey]} />
      </PDFViewer>
    </div>
  );
};
