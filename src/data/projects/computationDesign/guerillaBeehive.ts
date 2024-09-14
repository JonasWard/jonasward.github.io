import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import keyImage from './assets/guerilla-beehive/keyImage.jpg';
import image1 from './assets/guerilla-beehive/BeesDetail.png';
import image2 from './assets/guerilla-beehive/Conceptueel - 1.png';
import image3 from './assets/guerilla-beehive/DetailBXL.jpg';
import image4 from './assets/guerilla-beehive/DetailHAMBURG.jpg';
import image5 from './assets/guerilla-beehive/Production.jpg';
import image6 from './assets/guerilla-beehive/SectionA.jpg';
import image7 from './assets/guerilla-beehive/SectionB.jpg';
import image8 from './assets/guerilla-beehive/SectionC.jpg';

const id = '2018-02';

const metaData: ProjectMetaData = {
  id,
  webstring: 'guerilla-beehive',
  name: 'Guerilla Beehive',
  projectType: ProjectCategory.Design,
  description: 'ecological awarness project through digital means',
  keyImage: keyImage,
  projectContext: ProjectContext.Professional,
  projectPartnerContext: ProjectPartnerContext.Client,
  keywords: [Keywords.Knitting, Keywords.Patterns],
  projectPartners: ['Annemarie Maes'],
};

export const guerillaBeehive: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(keyImage, metaData.name, 1821, 2119),
  projectContent: [
    createText(
      2,
      [
        'intelligent guerilla beehive',
        'The Intelligent Guerilla Beehive is a research project interfacing between art, biology and science. It discusses issues of sustainability and biodiversity, giving viewers a glimpse into Annemaries ongoing research on how to deal with the shrinking honeybee population. This makes the Intelligent Beehive a multifunctional project. On one hand it offers a safe refuge for honeybees living in an urban environment while also functioning as a bio-sensor, giving an indication of the air pollution around the beehive.',
      ],
      'This iteration of the IGB - in the end named Elbe Binnen - was commissioned as a public art project in Hamburg. Populated with a living bee colony it is installed outside the Golden Pavilion in the Entenweder park on the banks of the Elbe. The behavior and wellbeing of the bee colony will be monitored with a camera, heat, humidity and movement sensors of which data is streamed to the exhibition space in the Golden Pavilion. Also the bees foraging fields are being monitored.',
      'The final shape was conceived in collaboration with Annemarie. The body of the beehive consisted of massive spruce wood, containing an inner beehive, completely detached from the outer shell because of the need for a guaranteed waterproof and desalination buffer allowing for insulation and ventilation. Since the outer shell was robotically milled, there was the possibility to apply a pattern to the shell. Through an iterative process using different pattern strategies - trying out how well they were able to accomodate lichen growth, used as a bio air pollution indicator - the choice was made for a mesh based reaction diffusion logic. Finally for the support structure research done into spatial assemblies at the chair of GKR at the ETH Zürich was used to inform the intricate yet structurally and aesthetically optimized insect leg appearance.'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [image1, image2, image3, image4, image5, image6, image7, image8].map((i) => createImage(i, '©️J.W.')),
    },
  ],
};
