import type { ResponsivePicture } from '../types/projectContent/projectImage';
import { attrs, cls } from './html';

/** a url, or an image module object of a build tool that turns plain image imports into `{ src, width, height }` */
type ImageSource = string | { src: string };

/** the url of an image import, whatever shape the build tool gave it */
export const imageUrl = (source: ImageSource): string => (typeof source === 'string' ? source : source.src);

export type ImgOptions = {
  // the rendered width of the image, lets the browser pick the smallest fitting variant
  sizes: string;
  alt: string;
  // above the fold images (e.g. the project hero) load immediately and with priority
  eager?: boolean;
  className?: string;
};

// width & height reserve the image's aspect ratio box before any bytes arrive, so loading doesn't move the layout.
// `.responsive-img` gets `loaded` from the fade-in script once the image is there (see responsiveImg.css)
export const responsiveImg = (picture: ResponsivePicture, { sizes, alt, eager = false, className }: ImgOptions) =>
  `<img${attrs({
    src: imageUrl(picture.img.src as ImageSource),
    srcset: picture.sources.webp,
    sizes: picture.sources.webp ? sizes : undefined,
    width: picture.img.w,
    height: picture.img.h,
    loading: eager ? 'eager' : 'lazy',
    decoding: 'async',
    fetchpriority: eager ? 'high' : 'auto',
    alt,
    class: cls('responsive-img', className)
  })}>`;
