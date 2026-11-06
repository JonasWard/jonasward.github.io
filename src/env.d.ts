/// <reference types="astro/client" />

declare module '*?responsive' {
  const picture: import('vite-imagetools').Picture;
  export default picture;
}

// the same picture, but every variant encoded lossless, for images that don't survive lossy compression
declare module '*?responsive&lossless' {
  const picture: import('vite-imagetools').Picture;
  export default picture;
}

// lossless, but only in the small widths of a project card on the overview
declare module '*?responsive&lossless&card' {
  const picture: import('vite-imagetools').Picture;
  export default picture;
}

// a project's title image, the only kind shown wide enough to need the 2400px variant
declare module '*?responsive&hero' {
  const picture: import('vite-imagetools').Picture;
  export default picture;
}

declare module '*?responsive&lossless&hero' {
  const picture: import('vite-imagetools').Picture;
  export default picture;
}
