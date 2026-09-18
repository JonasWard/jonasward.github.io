// Drives the paper grain worker and hands the result to CSS as a data url.
//
// The tile is generated once per session and cached, so walking into a project
// and back does not pay for it again. Generation is best effort: if the browser
// has no worker, or anything throws, the cards keep their flat base colour.

import type { PaperTextureRequest, PaperTextureResponse } from './paperTexture.worker';

/** px of the tile. 256 keeps the cloud term's ~90px features from reading as a pattern. */
const TEXTURE_SIZE = 256;
/** css px of paper per texel; 1 matches the landing's scale */
const TEXTURE_SCALE = 1;
/** fraction of the landing's modulation to keep on a near-white card */
const TEXTURE_INTENSITY = 0.5;

let pending: Promise<string | null> | null = null;

// A blob url rather than a data url: encoding is asynchronous and off the main
// thread, and the css only carries a short handle instead of a few hundred
// kilobytes of base64 of incompressible noise.
const toObjectUrl = ({ size, pixels }: PaperTextureResponse): Promise<string | null> =>
  new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    if (!context) return resolve(null);

    context.putImageData(new ImageData(new Uint8ClampedArray(pixels), size, size), 0, 0);
    canvas.toBlob((blob) => resolve(blob ? URL.createObjectURL(blob) : null), 'image/png');
  });

const generate = (): Promise<string | null> =>
  new Promise((resolve) => {
    if (typeof Worker === 'undefined') return resolve(null);

    let worker: Worker;
    try {
      worker = new Worker(new URL('./paperTexture.worker.ts', import.meta.url), { type: 'module' });
    } catch (error) {
      console.error('could not start the paper texture worker:', error);
      return resolve(null);
    }

    const finish = (value: string | null) => {
      worker.terminate();
      resolve(value);
    };

    worker.onmessage = (event: MessageEvent<PaperTextureResponse>) => {
      toObjectUrl(event.data)
        .catch((error) => {
          console.error('could not paint the paper texture:', error);
          return null;
        })
        .then(finish);
    };

    worker.onerror = (event) => {
      console.error('the paper texture worker failed:', event.message);
      finish(null);
    };

    const request: PaperTextureRequest = {
      size: TEXTURE_SIZE,
      scale: TEXTURE_SCALE,
      intensity: TEXTURE_INTENSITY
    };
    worker.postMessage(request);
  });

/** the generated tile as a css `url(...)`, or null if it could not be made */
export const getPaperTexture = (): Promise<string | null> => {
  if (!pending) pending = generate().then((dataUrl) => (dataUrl ? `url(${dataUrl})` : null));
  return pending;
};

/**
 * Where a card starts reading the tile. The landing offsets the paper per slab
 * (`hashSeeded(seed, 10/11) * 2000.0` in the fragment shader) so no two slabs
 * show the same fibres; cards do the same, keyed by their stable id.
 */
export const paperOffsetFor = (key: string): string => {
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) | 0;
  const x = Math.abs(hash) % TEXTURE_SIZE;
  const y = Math.abs(Math.imul(hash, 2654435761)) % TEXTURE_SIZE;
  return `${-x}px ${-y}px`;
};
