import { ProjectImage } from '../../../types/projectContent/projectImage';
import './projectImage.css';

interface type {
  className?: string;
  content: ProjectImage;
  isMainImage?: boolean;
  maxHeight?: number;
  maxWidth?: number;
}

const getHeightForMainImage = (projectImage: ProjectImage, isMainImage: boolean): number | undefined => {
  if (!isMainImage) return undefined;
  // get the window width and height, height is max 100svh, or ratio of the image * min(width of the window, 1200);
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const imageRatio = projectImage.imageHeigth! / projectImage.imageWidth!;
  const imageWidth = Math.min(windowWidth, 1200);
  const imageHeight = imageRatio * imageWidth;
  return Math.min(windowHeight, imageHeight);
};

export const ProjectImageRenderer: React.FC<type> = ({
  content,
  isMainImage = false,
  className,
  maxHeight,
  maxWidth
}) => {
  return (
    <div
      style={{ maxHeight, maxWidth }}
      className={`project-image ${isMainImage ? 'main-image' : ''} ${isMainImage ? 'fade-in' : ''} ${className ?? ''}`}
    >
      <img
        src={content.imageHref}
        alt={content.imageText ?? ''}
        style={{ height: maxHeight ?? getHeightForMainImage(content, isMainImage) }}
      />
      {content.imageText && (
        <div
          style={{ maxHeight: getHeightForMainImage(content, isMainImage) }}
          className={`font-${content.imageTextSize ?? (isMainImage ? 'large' : 'small')} ${
            content.imageTextPosition ?? (isMainImage ? 'center' : 'bottom')
          }-${content.imageTextAlignment ?? (isMainImage ? 'center' : 'right')}${
            content.imageTextColor ? ` ${content.imageTextColor}` : ''
          }`}
        >
          {content.imageText}
        </div>
      )}
    </div>
  );
};
