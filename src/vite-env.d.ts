/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

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
