import * as design from './design';
import * as computationDesign from './computationDesign';
import * as architecture from './architecture';
import * as art from './art';
import * as lamps from './lamps';
import * as software from './software';
import * as urbanism from './urbanism';
import { ProjectData } from 'src/types/projectContent/projectData';

export const allProjects = [
  ...(Object.values(design) as unknown as ProjectData[]),
  ...(Object.values(computationDesign) as unknown as ProjectData[]),
  ...(Object.values(software) as unknown as ProjectData[]),
  ...(Object.values(art) as unknown as ProjectData[]),
  ...(Object.values(lamps) as unknown as ProjectData[]),
  ...(Object.values(architecture) as unknown as ProjectData[]),
  ...(Object.values(urbanism) as unknown as ProjectData[])
].sort((a, b) => -a.id.localeCompare(b.id));
