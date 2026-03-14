import React from 'react';
import { ProjectText } from '../../../types/projectContent/projectText';
import './projectContent.css';

export const ProjectTextRenderer: React.FC<{ content: ProjectText }> = ({ content }) => (
  <div className={`text-block columns-${content.maxColumnCount}`}>
    {content.content.map((content, index) =>
      Array.isArray(content) ? (
        <React.Fragment key={index}>
          <h2>{content[0]}</h2>
          <p>{content[1]}</p>
        </React.Fragment>
      ) : (
        <p key={index}>{content}</p>
      )
    )}
  </div>
);
