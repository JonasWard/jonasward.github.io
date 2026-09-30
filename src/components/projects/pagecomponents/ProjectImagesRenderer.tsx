import { ProjectContentType } from '../../../types/projectContent/projectContentType';
import { ProjectImages } from '../../../types/projectContent/projectImages';
import { ResponsiveImg } from './ResponsiveImg';

export interface IProjectImages {
  content: ProjectImages;
}

// rendered widths, see .images & .image-grid in projectImage.css
const imagesSizes = 'min(100vw, 800px)';
const imageGridSizes = '(max-width: 650px) 100vw, min(50vw, 600px)';

export const ProjectImagesRenderer: React.FC<IProjectImages> = ({ content }) => {
  const isGrid = content.type === ProjectContentType.ImageGrid;
  const className = isGrid ? 'image-grid' : 'images';

  return (
    <div className={className}>
      {content.images.map((image, index) => (
        <div key={index} className={`${className}-content`}>
          <ResponsiveImg picture={image.picture} sizes={isGrid ? imageGridSizes : imagesSizes} alt={image.imageText ?? ''} />
          {image.imageText && (
            <div className={`font-${image.imageTextSize ?? 'small'} ${image.imageTextPosition ?? 'bottom'}-${image.imageTextAlignment ?? 'right'}`}>
              {image.imageText}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
