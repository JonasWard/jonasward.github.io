import { CSSProperties, useState } from 'react';
import { ResponsivePicture } from '../../../types/projectContent/projectImage';
import './responsiveImg.css';

interface IResponsiveImg {
  picture: ResponsivePicture;
  // the rendered width of the image, lets the browser pick the smallest fitting variant
  sizes: string;
  alt: string;
  // above the fold images (e.g. the project hero) load immediately and with priority
  eager?: boolean;
  className?: string;
  style?: CSSProperties;
}

// width & height reserve the image's aspect ratio box before any bytes arrive, so loading doesn't move the layout
export const ResponsiveImg: React.FC<IResponsiveImg> = ({ picture, sizes, alt, eager = false, className, style }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      ref={(img) => {
        // cached images can finish before react attaches onLoad
        if (img?.complete && !loaded) setLoaded(true);
      }}
      src={picture.img.src}
      srcSet={picture.sources.webp}
      sizes={sizes}
      width={picture.img.w}
      height={picture.img.h}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      // react 18 doesn't know the camelCase prop yet
      {...{ fetchpriority: eager ? 'high' : 'auto' }}
      alt={alt}
      onLoad={() => setLoaded(true)}
      className={`responsive-img${loaded ? ' loaded' : ''}${className ? ` ${className}` : ''}`}
      style={style}
    />
  );
};
