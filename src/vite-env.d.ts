/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*?responsive' {
  const picture: import('vite-imagetools').Picture;
  export default picture;
}

// screenshots: text stays sharp when the variants are compressed lossless
declare module '*?responsive&lossless' {
  const picture: import('vite-imagetools').Picture;
  export default picture;
}
