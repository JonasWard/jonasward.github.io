import { livingOnTheEdge } from './architecture/livingOnTheEdge';
import { theCityIsArt } from './architecture/theCityIsArt';
import { patternMachine } from './computationDesign/patternMachine';
import { scarves } from './computationDesign/scarves';
import { smartBrick } from './computationDesign/smartBrick';
import { chocoladeChaud } from './design/chocoladeChaud';
import { coralBricks } from './design/rrreefs';
import { scarves2023 } from './design/scarves2023';

export const allProjects = [patternMachine, livingOnTheEdge, theCityIsArt, scarves, smartBrick, coralBricks, scarves2023, chocoladeChaud].sort(
  (a, b) => -a.id.localeCompare(b.id)
);
