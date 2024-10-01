import { livingOnTheEdge } from './architecture/livingOnTheEdge';
import { theCityIsArt } from './architecture/theCityIsArt';
import { vAnda } from './architecture/v&a';
import { guerillaBeehive } from './computationDesign/guerillaBeehive';
import { impactClay } from './computationDesign/impactClay';
import { patternMachine } from './computationDesign/patternMachine';
import { scarves } from './design/scarves';
import { smartBrick } from './computationDesign/smartBrick';
import { chocoladeChaud } from './software/chocoladeChaud';
import { lucernaeTurici } from './software/lucernaeTurici';
import { paraSlimShady } from './software/paraSlimShady';
import { coralBricks } from './design/rrreefs';
import { scarves2023 } from './design/scarves2023';
import { haasHausConfigurator } from './software/haashausconfigurator';
import { mundoA } from './architecture/mundoa';
import { lamps } from './architecture/lamps';
import { jokerweek } from './architecture/jokerweek';
import { concreteChoreography } from './architecture/concreteChoreography';
import { staufferStatic } from './software/staufferStatic';
import { frituurFuturist } from './architecture/frituurFuturist';

export const allProjects = [
  patternMachine,
  livingOnTheEdge,
  guerillaBeehive,
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
  haasHausConfigurator,
  mundoA,
  lamps,
  jokerweek,
  concreteChoreography,
  staufferStatic,
  frituurFuturist,
].sort((a, b) => -a.id.localeCompare(b.id));
