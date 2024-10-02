import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { Technologies } from '../../../types/keywords/technologies';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import imageCortile from './assets/napoliSotterana/imageCortile.jpg';
import imageDecumani from './assets/napoliSotterana/imageDecumani.jpg';
import imageMonastery from './assets/napoliSotterana/imageMonastery.jpg';
import mapDucaDiNoja from './assets/napoliSotterana/mapDucaDiNoja.jpg';
import mapIleDansLesIlos from './assets/napoliSotterana/mapIleDansLesIlos.jpg';
import mapIntervention from './assets/napoliSotterana/mapIntervention.jpg';

const id = '2014-02';

const metaData: ProjectMetaData = {
  id,
  webstring: 'napoli-pianoterra',
  name: 'Napoli Pianoterra',
  projectType: ProjectCategory.Urbanism,
  description: 'First experiments for an online chocolate bar configurator',
  keyImage: mapIleDansLesIlos,
  projectContext: ProjectContext.Academic,
  projectPartnerContext: ProjectPartnerContext.Team,
  keywords: [Keywords.Workshop, Technologies.QGis, Technologies.Photoshop, Technologies.AutoCAD],
  projectPartners: ['Dirk De Meyer', 'David Schmitz'],
};

export const napoliSotterana: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(mapIleDansLesIlos, metaData.name, 1484, 2048),
  projectContent: [
    createText(2, [
      'palimpsestuous napels',
      'Modern-day Napoli is a rather illegible maze of canyonesque streets. With this comes a huge lack of qualitative and accessible public spaces. However, when you take a closer look at the form mass plan of Napoli you can really distinguish some very large patios within the blocks.',
    ]),
    {
      type: ProjectContentType.ImageGrid,
      images: [createImage(imageCortile, 'Cortile in Napoli'), createImage(imageMonastery, 'View of Monastery Courtyard in the inner city')],
    },
    createImage(imageDecumani, 'View on the Decumani'),
    createText(
      2,
      'Is it at all possible to make these spaces part of the public domain? What happens when you start opening existing doors? Or can you create a secondary circulation scheme by just making a few holes in some walls? To visualize this I drew two maps. The first one is an up-to-date version of the Duca Di Noja (Napolitan Nolli Plan). This already sheds a wholly different light on the city. What seems to be impenetrable housing blocks actually manifest a sponge-like porosity. However, this map in itself doesn’t tell the whole story. What happens if you start coloring all the directly connected private and semi-private spaces is a similar fashion as you would color a world map? It clearly shows how interlinked the interiors of the blocks actually already are. On many occasions these internal passageways are already connected to streets on either side of the block, though just not publicly accessible.'
    ),
    createImage(mapDucaDiNoja, 'Modern Duca Di Noja Map'),
    createImage(mapIleDansLesIlos, 'Les Iles dans les Ilots Map'),
    createText(
      1,
      'The final map is a simple proof of concept to show how you can create a whole secondary circulation scheme with very limited interventions by interpreting the two maps.'
    ),
    createImage(mapIntervention, '©️ J.W.'),
  ],
};
