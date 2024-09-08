import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { createImage, createText } from '../../../utils/projectconstructor';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import keyImage from './assets/v&a/VA_Hello_Robot_51.jpg';
import keyImage2 from './assets/v&a/VA_Hello_Robot_64.jpg';
import stresstest1 from './assets/v&a/start_stressTest.jpg';
import stresstest2 from './assets/v&a/30h_stressTest.jpg';
import va1 from './assets/v&a/Side_a.jpg';
import va2 from './assets/v&a/Side_b.jpg';
import assemblyLogic from './assets/v&a/ikea-sketch.png';
import models from './assets/v&a/Picture Models.jpg';
import joint2 from './assets/v&a/Different Profiles.jpg';
import joint3 from './assets/v&a/DoubleReciprocal 1.jpg';
import joint4 from './assets/v&a/DoubleReciprocal 3.jpg';
import joint5 from './assets/v&a/DragonCurve A 3.jpg';
import joint6 from './assets/v&a/DragonCurve B 2.jpg';
import joint7 from './assets/v&a/DragonCurve B 3.jpg';
import joint8 from './assets/v&a/FabricationSetup.jpg';
import joint9 from './assets/v&a/Growth A 1.jpg';
import joint10 from './assets/v&a/Growth A 2.jpg';
import joint11 from './assets/v&a/Grwoth B 1.jpg';
import joint13 from './assets/v&a/model_a_b.jpg';
import joint14 from './assets/v&a/model_a_c.jpg';
import joint15 from './assets/v&a/model_a.jpg';
import joint19 from './assets/v&a/Single-TripleJoint C 2.jpg';
import joint20 from './assets/v&a/Single-TripleJoint D.jpg';
import joint21 from './assets/v&a/Single-TripleJoint E.jpg';
import joint23 from './assets/v&a/TripleJoint Stack IncreasedLever.jpg';
import joint24 from './assets/v&a/TripleJoint Stack OriginalLever.jpg';
import joint25 from './assets/v&a/TripleJoint Stack Single.jpg';
import joint28 from './assets/v&a/Y-joint A.jpg';
import joint29 from './assets/v&a/Y-joint B 1.jpg';
import joint30 from './assets/v&a/Y-joint D 1.jpg';
import joint31 from './assets/v&a/Y-joint D 2.jpg';
import joint32 from './assets/v&a/Y-joint E.jpg';
import joint33 from './assets/v&a/Y-joint F 1.jpg';
import joint34 from './assets/v&a/Y-joint F 2.jpg';
import joint35 from './assets/v&a/Zollinger 1.jpg';
import joint36 from './assets/v&a/Zollinger 2.jpg';

const id = '2019-02';

const metaData: ProjectMetaData = {
  id,
  webstring: 'v-and-a',
  name: 'Up Sticks',
  projectType: ProjectCategory.Architecture,
  description: 'MAS ETH dfab 2019, GKR Pavillion',
  keyImage: keyImage,
  projectContext: ProjectContext.Academic,
  projectPartnerContext: ProjectPartnerContext.Team,
};

const maxColumnCount = 1;

export const vAnda: ProjectData = {
  id,
  metaData,
  projectImage: createImage(keyImage, 'Up Sticks'),
  projectContent: [
    createText(
      maxColumnCount,
      [
        'Timber dowel assemblies is a new timber construction method, where short slats are held in space and locked by wood dowels. Spatially complex, the process takes full advantage of the potential for cooperative multi-robotic fabrication and human-machine collaboration. The unique setup of two robotic arms suspended from a gantry allows a robot to drill holes for the dowels at a defined angle in the pre-fabrication station, while the other robotic arm picked and positioned the timber slat in space. Taking advantage of the hygroscopic behavior of wood, the dowels are pre-dried in an oven to facilitate their manual insertion into the pre-drilled holes. Robotic placing is highly precise, while human dowel insertion allows a relatively small tolerance of manual adjustment, whose cooperation takes advantage of both sides. Once moisture of the dowel is applied, the volumetric expansion maximizes the frictional force between dowels and slats making any additional nails, glue or screws obsolete.',
        'timber assemblies',
      ],
      [
        'Working our way up from 1-1 detail testing, surface propagation to a full fledged, room filling, museum exhibit for the Hello Robot exposition in the V&A Dundee.',
        undefined,
      ]
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        keyImage2,
        models,
        va1,
        va2,
        stresstest1,
        stresstest2,
        joint2,
        joint3,
        joint4,
        joint5,
        joint6,
        joint7,
        joint8,
        joint9,
        joint10,
        joint11,
        assemblyLogic,
        joint13,
        joint14,
        joint15,
        joint19,
        joint20,
        joint21,
        joint23,
        joint24,
        joint25,
        joint28,
        joint29,
        joint30,
        joint31,
        joint32,
        joint33,
        joint34,
        joint35,
        joint36,
      ].map((image) => createImage(image, '©️ J.W.')),
    },
  ],
};
