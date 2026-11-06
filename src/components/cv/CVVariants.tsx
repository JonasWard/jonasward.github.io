import { CV } from './CV';
import { ProjectRoutes } from '../../types/navigation/projectroutes';
import { CVContent as CVContentCompact } from 'src/data/cv/cvContentCompact';
import { CVContent as CVContentMax } from 'src/data/cv/cvContentMax';
import { CVContent as CVContentProductDesigner } from 'src/data/cv/cvContentProductDesigner';
import { CVContent as CVContentLivingLabHil } from 'src/data/cv/cvContentLivingLabHil';
import cvLongerQrCode from 'src/assets/cv-longer.png';
import cvMaxQrCode from 'src/assets/cv-max.png';
import cvProductDesignerQrCode from 'src/assets/cv-product-designer.png';
import cvLivingLabHilQrCode from 'src/assets/cv-living-lab-hil.png';
import cvCompactQrCode from 'src/assets/cv.png';

// all cv variants live in one module so they (and @react-pdf/renderer) are split into a single lazily loaded chunk

export const CVCompact: React.FC = () => <CV data={CVContentCompact} route={ProjectRoutes.CV} qrCode={cvCompactQrCode} />;

export const CVProductDesigner: React.FC = () => (
  <CV data={CVContentProductDesigner} route={ProjectRoutes.CVProductDesigner} qrCode={cvProductDesignerQrCode} />
);

export const CVLivingLabHil: React.FC = () => (
  <CV data={CVContentLivingLabHil} route={ProjectRoutes.CVLivingLabHil} qrCode={cvLivingLabHilQrCode} />
);

export const CVLonger: React.FC = () => <CV data={CVContentMax} route={ProjectRoutes.CVLonger} qrCode={cvLongerQrCode} />;

export const CVMax: React.FC = () => <CV data={CVContentMax} route={ProjectRoutes.CVMax} qrCode={cvMaxQrCode} />;
