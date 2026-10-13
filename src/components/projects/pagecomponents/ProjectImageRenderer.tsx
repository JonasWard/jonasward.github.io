import { ProjectImage } from '../../../types/projectContent/projectImage';
import './projectImage.css';
import { ResponsiveImg } from './ResponsiveImg';

interface type {
  className?: string;
  content: ProjectImage;
  isMainImage?: boolean;
  maxHeight?: number;
  maxWidth?: number;
}

// rendered widths: the hero spans the project layout (--global-max-width), content images are capped in projectImage.css
const mainImageSizes = 'min(100vw, 1200px)';
const contentImageSizes = 'min(100vw, 800px)';

const getHeightForMainImage = (projectImage: ProjectImage, isMainImage: boolean): number | undefined => {
  if (!isMainImage) return undefined;
  // get the window width and height, height is max 100svh, or ratio of the image * min(width of the window, 1200);
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const imageRatio = projectImage.picture.img.h / projectImage.picture.img.w;
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
  const style = { maxHeight: content.maxImageHeight ?? maxHeight, maxWidth: content.maxImageWidth ?? maxWidth };
  const classes = `project-image ${isMainImage ? 'main-image' : ''} ${isMainImage ? 'fade-in' : ''} ${className ?? ''}`;
  const children = (
    <>
      <ResponsiveImg
        picture={content.picture}
        sizes={isMainImage ? mainImageSizes : contentImageSizes}
        eager={isMainImage}
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
    </>
  );

  return content.href ? (
    <a href={content.href} style={style} className={`${classes} image-link`}>
      {children}
    </a>
  ) : (
    <div style={style} className={classes}>
      {children}
    </div>
  );
};
