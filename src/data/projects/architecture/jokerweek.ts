import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { ProjectData } from '../../../types/projectContent/projectData';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';

import keyImage from './assets/jokerweek/1.OpeningPresentationOnTheFirstDay.jpg';
import jokerweek1 from './assets/jokerweek/0.TheCalmBeforeTheStorm.jpg';
import jokerweek2 from './assets/jokerweek/5.TheOldSchoolBuilding.jpg';
import jokerweek3 from './assets/jokerweek/jokerweek-2015_16809953620_o.jpg';
import jokerweek4 from './assets/jokerweek/jokerweek-2015_16971888186_o.jpg';
import jokerweek5 from './assets/jokerweek/5.TheOldSchoolBuilding2.jpg';
import jokerweek6 from './assets/jokerweek/jokerweek-2015_17020376252_o.jpg';
import jokerweek7 from './assets/jokerweek/jokerweek-2015_16399464974_o.jpg';
import jokerweek8 from './assets/jokerweek/jokerweek-2015_16834288910_o.jpg';
import jokerweek9 from './assets/jokerweek/jokerweek-2015_16836174319_o.jpg';

const id = '2015-02';

const metaData: ProjectMetaData = {
  id,
  webstring: 'jokerweek',
  name: 'Jokerweek',
  projectType: ProjectCategory.Design,
  description: 'Jokerweek 2015 - box office',
  keyImage: keyImage,
  projectContext: ProjectContext.Academic,
  projectPartnerContext: ProjectPartnerContext.Team,
};

const maxColumnCount = 2;

export const jokerweek: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(keyImage, metaData.name, 1333, 2000),
  projectContent: [
    createText(
      maxColumnCount,
      [
        'box office',
        'Every year the Department of Architecture and Urban Planning at the University of Ghent organizes a vertical seminar week around a certain topic relevant in contemporary architecture. The practical organization is in the hands of the last year students. All the Department’s students can participate. This time it was our turn to roll up our sleeves and get our hands dirty...',
      ],
      'My role in this whole ‘endeavor’ was coordinating the design and the realization of the scenography. With a team of 8 people we stitched, cut and drilled over the course of a week 400 pillows (filled with foam instead of more traditional feathers for a more comfortable sitting experience - to compensate for the lack of chairs in many locations), 500 meters of textile for the boxes used by the students working on the interior (and as projection screens), 92 2.5 meter beams used for the carrying structure of the boxes, 2 km of rope carrying the bearing structure, 1200 square meter of floor covering (in the area used for the construction of the exterior) and set-up two bar areas filled with “comfy” living room furniture.',
      'The theme this year was the (changing) office cultures in architecture firms. Ranging from icons of the past like Le Corbusier to modern enfant-terribles like Frank Gehry and even an imaginary one in Howard Roarke from An Rand’s The Fountainhead, we composed a list of 20 architecture offices.',
      'The exercise we gave them was to interpret what they had learned and materialize the architect office. For every office there was a group that worked on the internal functioning of the office (the interior) and a group that focused on how the firm represented itself to the rest of the world (the exterior).',
      'To accomplish this arduous conceptual task the students were given copious amounts of cardboard, which they could (mis)use to their own liking. Those working on the exterior worked in another location than those working on the interior, in a completely different setting.',
      'As you might have noticed in none of the pictures so far there’s any furniture. We intentionally got rid of it all, instead we offered the students a comfy, but sturdy, pillow. If the students believed they needed a chair? They should make one themselves!',
      'Lay-out of the space containing those working on the Interior with all the boxes layed-out. The grid had to be turned in such a way that the emergency exits were clearly visible. Together with the rather complex roof structure and the plasticity of the robes we ended up using grasshopper to model the lengths of the different robes necessary to keep every individual box up. In total there were 23 boxes.'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [jokerweek1, jokerweek2, jokerweek3, jokerweek4, jokerweek5, jokerweek6, jokerweek7, jokerweek8, jokerweek9].map((image) =>
        createImage(image, '©️ J.W.')
      ),
    },
  ],
};
