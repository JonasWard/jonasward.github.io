import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectContentType } from 'src/types/projectContent/projectContentType';

import permeke from './assets/living-on-the-edge/Constant_Permeke.webp';
import tuymans from './assets/living-on-the-edge/tuymans.webp';
import leonAugustin from './assets/living-on-the-edge/Léon_Augustin-Lhermitte.webp';
import projectImage from './assets/living-on-the-edge/SiteModel.jpg';
import brueghelKinderen from './assets/living-on-the-edge/children-s-games-1560.webp';

import schema from './assets/living-on-the-edge/Schema.webp';
import evolutie from './assets/living-on-the-edge/Evolutie.webp';
import nywf from './assets/living-on-the-edge/NYWF-9-64-Belgium.webp';
import print83 from './assets/living-on-the-edge/Print_83.webp';

import nolliNu from './assets/living-on-the-edge/NolliNu.webp';
import brueghelTriumph from './assets/living-on-the-edge/Pieter_Brueghel_The_Triumph_of_Death.webp';
import jacobIsaakszVanRuisdael from './assets/living-on-the-edge/Jacob_Isaaksz_van_Ruisdael.webp';
import alterNordfriedhofMuenchen from './assets/living-on-the-edge/Alter_Nordfriedhof_Muenchen-1.webp';

import compositieBeeldAxisRas from './assets/living-on-the-edge/CompositieBeeldAxisRas.webp';

import graven from './assets/living-on-the-edge/Graven.webp';
import conceptSectionFinal from './assets/living-on-the-edge/ConceptSectionFinal.webp';
import sectionsWhole from './assets/living-on-the-edge/SectionsWhole.webp';

import conceptD from './assets/living-on-the-edge/CocneptD.webp';
import conceptA from './assets/living-on-the-edge/ConcepA.webp';
import conceptB from './assets/living-on-the-edge/ConceptB.webp';
import conceptC from './assets/living-on-the-edge/ConceptC.webp';
import conceptE from './assets/living-on-the-edge/ConceptE.webp';

import currentSchemeTotal from './assets/living-on-the-edge/CurrentSchemeTotal.webp';
import nolliOntwerp from './assets/living-on-the-edge/NolliOntwerp300.webp';

import presA from './assets/living-on-the-edge/pres_a.webp';
import presB from './assets/living-on-the-edge/pres_b.webp';
import presC from './assets/living-on-the-edge/pres_c.webp';
import presD from './assets/living-on-the-edge/pres_d.webp';
import presE from './assets/living-on-the-edge/pres_e.webp';
import presF from './assets/living-on-the-edge/pres_f.webp';
import presG from './assets/living-on-the-edge/pres_g.webp';
import presH from './assets/living-on-the-edge/pres_h.webp';
import presI from './assets/living-on-the-edge/pres_i.webp';
import presJ from './assets/living-on-the-edge/pres_j.webp';
import presK from './assets/living-on-the-edge/pres_k.webp';
import presL from './assets/living-on-the-edge/pres_l.webp';
import presM from './assets/living-on-the-edge/pres_m.webp';
import presN from './assets/living-on-the-edge/pres_n.webp';

const id = '2017-01';

const metaData: ProjectMetaData = {
  id,
  webstring: 'living-on-the-edge',
  name: 'Living on the Edge',
  projectType: ProjectCategory.Architecture,
  description: 'Living on the Edge - Mass-housingproject for the Living and the Dead',
  keyImage: undefined,
  projectContext: ProjectContext.Academic,
  projectPartnerContext: ProjectPartnerContext.Solo
};

export const livingOnTheEdge: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(projectImage, metaData.name, 2943, 3890),
  projectContent: [
    createText(
      2,
      [
        'UGent Urban Design Master Thesis',
        'In it’s infancy this thesis had a program, but not a site. The initial goal was to develop a contemporary prototype for a  "Typical Flemish Village". Though the lack of a site and a clear way to reduce the village conceptually to an architectural generating concept kept the thesis in limbo for a long time.'
      ],
      'It became apparent that the goal of developing a standardised approach was all but impossible. Rather than one particular typology there’s, at best, a range of typologies which fit the bill of what a typical Flemish Village is supposed to be.',
      'But even then, arguably the concept of a typical Flemish Village only exists in the mind of city-dwellers. In practice there’s next to no difference anymore between living in the suburbs or a village. And this has arguably been the case since the late 19the century.'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        createImage(tuymans, 'Luc Tuymans - Vlaams Dorp'),
        createImage(permeke, 'Constant Permeke - De Oogst'),
        createImage(leonAugustin, "Léon Augustin - L'hermitte"),
        createImage(brueghelKinderen, 'Pieter Bruegel - Kinderspelen'),
        createImage(nywf, "New York's 1964 Worldfair - Little Flanders")
      ]
    },
    createText(
      2,
      [
        'Gent, Mariakerke',
        'Even though the thesis was getting to a certain level of conceptual depth the whole architectural aspect of it was still clouded in open questions.'
      ],
      'For a long time it seemed as if vagueness was a goal rather than a problem. Even after a semester long periode of trial and error, the project was still stuck at an analytical stage.',
      'An impasse was reached, a decision had to be made. Instead of continuing to flog a dead horse a new direction was chosen.',
      'Therefore a specific site was picked and a scale specified.',
      'The village became pretty much a sidetrack. Besides the scale of the project, as good as all programmatic ideas concerning the village were dropped.'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        createImage(evolutie, 'Urban Sprawl Gent'),
        createImage(schema, 'Radial-concentric Scheme'),
        createImage(print83, 'Mariakerke')
      ]
    },
    createText(2, [
      'Westerbegraafplaats Gent',
      'The new project became extremely site-specific. Situated on the borderlands of the 19th and 20th century sprawls in the middle of a residential area and next to a burial site, a relational extrapolation of the existing situation seemed an interesting approach to take.'
    ]),
    createImage(nolliNu, 'Nolli Map of Westerbegraafplaats Gent'),
    createText(
      2,
      ['The urban cemetery', 'A new typology was in need of some contextualisation'],
      'While linking these two topics might seem contradictory at first glance there is a lot of overlap in how the two typologies developed during the 20th century in Belgium. More importantly though, a decade into the 21th century, both the suburbs and the cemeteries are dealing with a (severe) identity crises.',
      'Changing social, economical and functional conditions have rendered the current approach to housing of both the dead and the living obsolete. Though it’s wrong to dismiss all the decisions leading up to the materialisation of these typologies as utterly useless or irrelevant. Therefore a conceptual analyses of these two typologies forms the foundation of the project.',
      'By mapping the inherent qualities and faults, the historical frame in which they were realised and some projects I was able to distill a set of, conceptual, rules. Using these a housing project on a graveyard became conceivable and, dare I say, even qualitative.'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        createImage(brueghelTriumph, 'Pieter Bruegel - The Triumph of Death'),
        createImage(alterNordfriedhofMuenchen, 'Alter Nordfriedhof Muenchen'),
        createImage(jacobIsaakszVanRuisdael, 'Jacob Isaaksz van Ruisdael')
      ]
    },
    createImage(compositieBeeldAxisRas, 'Different Cemeteries all at the Same Scale', 1200, 1200),
    createText(2, [
      'Conceptualisation',
      'The play itself started with the introduction to the site, again in two acts, from the perspective of both the living and the dead. The second act is the conceptualisation of the program and setting up the basic framework for the final act.'
    ]),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        createImage(graven, 'Chronological Developments of Graves Sketch'),
        createImage(conceptSectionFinal, 'Sketch of Housing Organisation Concept'),
        createImage(sectionsWhole, 'Practical Conceptualisation of the Sections')
      ]
    },
    createImage(conceptA, 'Form-Mass Plan Site', 2000, 1200),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        createImage(conceptD, 'Condensing Buildings'),
        createImage(conceptB, 'Piazza del Popolo Trident - Rome'),
        createImage(conceptC, "Asplund's Reichskanserei - Stockholm"),
        createImage(conceptE, 'Zelena Hora - Zdar nad Sazavou')
      ]
    },
    createImage(currentSchemeTotal, 'Scheme Total', 1200, 1200),
    createImage(nolliOntwerp, 'Nolli Ontwerp 300', 2000, 1200),
    createText(
      2,
      [
        'Architecture',
        'The last act was the architecture in itself. Here the conceptual abstractness was cleansed through architecture, though mostly in plan.'
      ],
      'Most of the material was namely threedimensional. Although I put a lot of effort in the actual development of the storyline, I spent probably twice as much time on the actual content.'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [presA, presB, presC, presD, presE, presF, presG, presH, presI, presJ, presK, presL, presM].map((i) =>
        createImage(i, '© J.W.')
      )
    }
  ]
};
