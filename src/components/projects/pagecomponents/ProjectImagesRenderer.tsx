import { ProjectContentType } from '../../../types/projectContent/projectContentType';
import { ProjectImages } from '../../../types/projectContent/projectImages';

export interface IProjectImages {
  content: ProjectImages;
}

export const ProjectImagesRenderer: React.FC<IProjectImages> = ({ content }) => {
  const className = content.type === ProjectContentType.ImageGrid ? 'image-grid' : 'images';

  return (
    <div className={className}>
      {content.images.map((image, index) => (
        <div key={index} className={`${className}-content justify-between`}>
          <img src={image.imageHref} alt='red-dot' />
          {image.imageText && (
            <div className={`font-${image.imageTextSize ?? 'small'} ${image.imageTextPosition ?? 'bottom'}-${image.imageTextAlignment ?? 'right'} `}>
              {image.imageText}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
