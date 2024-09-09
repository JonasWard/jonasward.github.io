import { livingOnTheEdge } from './architecture/livingOnTheEdge';
import { theCityIsArt } from './architecture/theCityIsArt';
import { vAnda } from './architecture/v&a';
import { impactClay } from './computationDesign/impactClay';
import { patternMachine } from './computationDesign/patternMachine';
import { scarves } from './computationDesign/scarves';
import { smartBrick } from './computationDesign/smartBrick';
import { chocoladeChaud } from './design/chocoladeChaud';
import { lucernaeTurici } from './design/lucernaeTurici';
import { paraSlimShady } from './design/paraSlimShady';
import { coralBricks } from './design/rrreefs';
import { scarves2023 } from './design/scarves2023';

export const allProjects = [
  patternMachine,
  livingOnTheEdge,
  theCityIsArt,
  impactClay,
  vAnda,
  scarves,
  smartBrick,
  coralBricks,
  scarves2023,
  chocoladeChaud,
  lucernaeTurici,
  paraSlimShady,
].sort((a, b) => -a.id.localeCompare(b.id));
