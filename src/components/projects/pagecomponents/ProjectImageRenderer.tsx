import { ProjectImage } from '../../../types/projectContent/projectImage';
import './projectImage.css';

interface IProjectImageRendererProps {
  className?: string;
  content: ProjectImage;
  isMainImage?: boolean;
}

export const ProjectImageRenderer: React.FC<IProjectImageRendererProps> = ({ content, isMainImage = false, className }) => {
  return (
    <div className={`project-image ${isMainImage ? 'main-image' : ''} ${isMainImage ? 'fade-in' : ''} ${className ?? ''}`}>
      <img src={content.imageHref} alt='red-dot' />
      {content.imageText && (
        <div
          className={`font-${content.imageTextSize ?? isMainImage ? 'large' : 'small'} ${content.imageTextPosition ?? isMainImage ? 'center' : 'bottom'}-${
            content.imageTextAlignment ?? isMainImage ? 'center' : 'right'
          } `}
        >
          {content.imageText}
        </div>
      )}
    </div>
  );
};
