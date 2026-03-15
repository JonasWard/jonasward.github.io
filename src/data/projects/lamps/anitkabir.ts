import { ProjectCategory } from 'src/types/keywords/categoryTypes';
import { Keywords } from 'src/types/keywords/keywords';
import { ProjectContext } from 'src/types/keywords/projectContext';
import { ProjectPartnerContext } from 'src/types/keywords/projectPartnerContext';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';
import { ProjectData } from 'src/types/projectContent/projectData';
import { ProjectMetaData } from 'src/types/projectContent/projectMetaData';
import { createTitleImage, createImage, createTextImage } from 'src/utils/projectconstructor';

const id = '2018-02';

import lampsAntikabirLogo from './assets/antikabirLogo.png';
import lampsAntikabir1 from './assets/Voor.jpg';
import lampsAntikabir2 from './assets/Zij.jpg';
import lampsAntikabir3 from './assets/Perspectief 2.jpg';
import lampsAntikabir4 from './assets/Perspectief.jpg';

const metaData: ProjectMetaData = {
  id,
  webstring: 'anitkabir',
  name: 'Anitkabir',
  projectType: ProjectCategory.Lamps,
  description: 'Lamp Design for the Mausoleum of Mustafa Kemal Atatürk',
  keyImage: lampsAntikabir4,
  projectContext: ProjectContext.Professional,
  projectPartnerContext: ProjectPartnerContext.Solo,
  keywords: [Keywords.LaserCutting, Keywords.Product]
};

export const anitkabir: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(lampsAntikabir4, metaData.name, 2048, 2048),
  projectContent: [
    createTextImage(
      lampsAntikabirLogo,
      `Every country has it's architectural masterpieces but few realisations from the 20th century are as symbolic as the Anıtkabir. The final resting ground of one of the greatest modernisers of the Interbellum period: Mustafa Kemal Ataturk. It's as fascinating as it is ironic that this building is of near religious importance to the modern Turkish identity. Ataturk - famous for introducing a seculare and democratic alternative to the Ottoman Sultanate - couldn't have wished for a finer burial ground, overlooking the by him instated new capitol of Ankara.`,
      'Anıtkabir'
    ),
    {
      type: ProjectContentType.Text,
      content: [
        `Every country has it's architectural masterpieces but few realisations from the 20th century are as symbolic as the Anıtkabir. The final resting ground of one of the greatest modernisers of the Interbellum period: Mustafa Kemal Ataturk. It's as fascinating as it is ironic that this building is of near religious importance to the modern Turkish identity. Ataturk - famous for introducing a seculare and democratic alternative to the Ottoman Sultanate - couldn't have wished for a finer burial ground, overlooking the by him instated new capitol of Ankara.`
      ],
      maxColumnCount: 1
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [lampsAntikabir1, lampsAntikabir2, lampsAntikabir3, lampsAntikabir4].map((i) => createImage(i, '© J.W.'))
    }
  ]
};
