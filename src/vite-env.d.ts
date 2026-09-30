/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*?responsive' {
  const picture: import('vite-imagetools').Picture;
  export default picture;
}
