import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import glass0 from './assets/glass/1 color cube22.jpg';
import glass1 from './assets/glass/1EuCe1YuqldFb7L0ayRgc5w0mOAaxKpOeEulgTmejlA.jpg';
import glass2 from './assets/glass/1Kg9arVLh7FENXsLSz3ppizm-gopLKY4ROqLiVFLNaQ.jpg';
import glass3 from './assets/glass/1MFfn8HkatqSRC5ZX2Xvw7huf810VjWDneartJyS3ig.jpg';
import glass4 from './assets/glass/1QrIbe2DOwxqtXsPkcEAQ2IzGc9AR1kUri3dKs37atA.png';
import glass5 from './assets/glass/1sHo5vQkOld6rX8hOAttLg5JZU0UP8Qps19peP4Q35Q.jpg';
import glass6 from './assets/glass/1SywT-hRIXc9OpuTwQOcR7oHQOByyQDE499wum_MWjg-1.jpg';
import glass7 from './assets/glass/1SywT-hRIXc9OpuTwQOcR7oHQOByyQDE499wum_MWjg.jpg';
import glass8 from './assets/glass/2 color cube22.jpg';
import glass9 from './assets/glass/3 color cube22.jpg';
import glass10 from './assets/glass/3 cubes.jpg';
import glass11 from './assets/glass/cocneptual-section.png';
import glass12 from './assets/glass/computation-diagram.png';
import glass13 from './assets/glass/CubeYellowBlueAltered.jpg';
import glass14 from './assets/glass/expression-dots.jpg';
import glass15 from './assets/glass/expression-gradient.jpg';
import glass16 from './assets/glass/expression-line.jpg';
import glass17 from './assets/glass/expression.jpg';
import glass18 from './assets/glass/farb center distance.jpg';
import glass19 from './assets/glass/frit.jpg';
import glass20 from './assets/glass/Gyroid2.png';
import glass21 from './assets/glass/Kiln.jpg';
import glass22 from './assets/glass/layering-0.jpg';
import glass23 from './assets/glass/layering-1.jpg';
import glass24 from './assets/glass/layering-2.jpg';
import glass25 from './assets/glass/layering-3.jpg';
import glass26 from './assets/glass/Noses-Overview.jpg';
import glass27 from './assets/glass/PLA-Drills.jpg';
import glass28 from './assets/glass/plan-tool.png';
import glass29 from './assets/glass/PostFusing.jpg';
import glass30 from './assets/glass/PreFusing.jpg';
import glass31 from './assets/glass/recycling-fine.jpg';
import glass32 from './assets/glass/recycling-hsvGrade.jpg';
import glass33 from './assets/glass/recycling-rough.jpg';
import glass34 from './assets/glass/rgb-base.png';
import glass35 from './assets/glass/rgb-computed.png';
import glass36 from './assets/glass/rgb-triangle.jpg';
import glass37 from './assets/glass/Screen Shot 2019-09-12 at 18.42.29.png';
import glass38 from './assets/glass/Screen Shot 2019-09-14 at 00.16.13.png';
import glass39 from './assets/glass/Screenshot 2024-10-29 at 23.23.10.jpg';
import glass40 from './assets/glass/Screenshot 2024-10-29 at 23.23.17.jpg';
import glass41 from './assets/glass/Screenshot 2024-10-29 at 23.23.24.jpg';
import glass42 from './assets/glass/Screenshot 2024-10-29 at 23.23.37.jpg';
import glass43 from './assets/glass/section-tool.png';
import glass44 from './assets/glass/simulation big triangle.jpg';
import glass45 from './assets/glass/squad blue.jpg';
import glass46 from './assets/glass/squad orange.jpg';
import glass47 from './assets/glass/tool-expression.jpg';
import glass48 from './assets/glass/ToolInContext.jpg';

const id = '2019-04';

const metaData: ProjectMetaData = {
  id,
  webstring: 'graded-glass',
  name: 'Graded Glass',
  projectType: ProjectCategory.Design,
  description: 'roboticly graded glass expressions',
  keyImage: glass5,
  projectContext: ProjectContext.Academic,
  projectPartnerContext: ProjectPartnerContext.Team,
  keywords: [Keywords.DigitalFabrication],
  projectPartners: ['Sophia Michopoulou', 'Rena Giesecke', 'Pietro Odaglia'],
};

export const gradedGlass: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(glass5, metaData.name, 2027, 2048),
  projectContent: [
    createText(
      2,
      [
        'graded glass',
        'Impact clay was a four-week design and build assignment investigating a novel fabrication process for highly viscous materials. The setup consists of a small-scale six-axis robotic arm manipulating an end-effector that allows to cut out projectiles of different sizes, position them, and press them into their respective shapes by linear pneumatic actuation. Through iterations of empiric testing, design simulation, and physical prototyping different typologies of the technique were explored.',
      ],
      'Colored glass in architecture has a long history, ranging from stained colored glass, to high performance glass with foil inlays and functional grading. The potential of glass to perform as a structural material and the need for sustainable construction materials has opened the door for rethinking the role of glass within architecture.',
      'However, commercial production methods of glass do not allow for color grading glass. Yet one artisanal production method - namely the fusing of glass - has the potential to be pushed past its traditional scope.',
      'The goal of this thesis was to develop a robotic tool that was able to grade colors with a certain accuracy in glass. The developed multi-property dispenser allows for the creation of volumetric designs that incorporate color and translucency gradients using a robotic arm as a 3D drawing machine.',
      'The end result was a fully-functional multi-granulate size dispenser with linear dispensing curve that allowed us to control the dispensing of multiple types of colored and uncolored glass. Different robotic path planning strategies were implemented as well in relationship to different nozzles. By variating the height of the production frame, rotation of the last joint, movement speed and different movement controls different aesthetics were achieved.',
      'Though the main goal of this thesis was to develop a tool to allow for continuous and discrete color grading, we also pushed the material side of the research. By proving that our tool and concept also worked with different types of glass, both high-end optical as simple recycled bottled glass. Also the effect of using different heat-curves on the final result and experimental yet risky mixing of different types of glass was attempted and led to some initial success.',
      'Since our project is dealing with a level of complexity which falls outside the scope of the traditional RGB color space multiple tools had to be developed to be able to visualize our designs. An RYB to RGB translator was developed, different interpolation strategies and a rudimentary strategy for visualizing different degrees of translucencies were explored.'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [glass0, glass1, glass2, glass3, glass4].map((i) => createImage(i, '©️J.W.')),
    },
    {
      type: ProjectContentType.ImageGrid,
      images: [
        glass6,
        glass7,
        glass8,
        glass9,
        glass10,
        glass11,
        glass12,
        glass13,
        glass14,
        glass15,
        glass16,
        glass17,
        glass18,
        glass19,
        glass20,
        glass21,
        glass22,
        glass23,
        glass24,
        glass25,
        glass26,
        glass27,
        glass28,
        glass29,
        glass30,
        glass31,
        glass32,
        glass33,
        glass34,
        glass35,
        glass36,
        glass37,
        glass38,
        glass39,
        glass40,
        glass41,
        glass42,
        glass43,
        glass44,
        glass45,
        glass46,
        glass47,
        glass48,
      ].map((i) => createImage(i, '©️J.W.')),
    },
  ],
};
