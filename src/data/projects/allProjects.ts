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
import { urlSafeBitpacker } from './software/urlSafeBitpacker';
import { napoliSotterana } from './urbanism/napolitSotterana';
import { digitaleAugen } from './software/digitaleAugen';
import { kwatrecht } from './urbanism/kwatrecht';
import { gradedGlass } from './computationDesign/roboticGlass';
import { volumeStudies } from './art/volumeStudies';
import { sdfAsMeaning } from './art/sdfAsMeaning';
import { sdfVases } from './art/sdfVases';
import { chocoStudies } from './art/chocoStudies';
import { sdfLamps } from './art/sdfLamps';

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
  urlSafeBitpacker,
  napoliSotterana,
  digitaleAugen,
  kwatrecht,
  gradedGlass,
  volumeStudies,
  sdfAsMeaning,
  sdfVases,
  chocoStudies,
  sdfLamps
].sort((a, b) => -a.id.localeCompare(b.id));
