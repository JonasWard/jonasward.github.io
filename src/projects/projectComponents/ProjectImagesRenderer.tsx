import { ProjectImages } from '../../types/projectContent/projectImages';
import { ProjectImageRenderer } from './ProjectImageRenderer';

export interface IProjectImages {
  content: ProjectImages;
}

export const ProjectImagesRenderer: React.FC<IProjectImages> = ({ content }) => {
  return (
    <div>
      {content.images.map((image) => (
        <ProjectImageRenderer key={image.imageHref} content={image} />
      ))}
    </div>
  );
};
