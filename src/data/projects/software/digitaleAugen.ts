import { ProjectPartnerContext } from '../../../types/keywords/projectPartnerContext';
import { ProjectContext } from '../../../types/keywords/projectContext';
import { ProjectMetaData } from '../../../types/projectContent/projectMetaData';
import { ProjectCategory } from '../../../types/keywords/categoryTypes';
import { ProjectData } from '../../../types/projectContent/projectData';
import { createImage, createText, createTitleImage } from '../../../utils/projectconstructor';
import { Keywords } from '../../../types/keywords/keywords';
import { ProjectContentType } from '../../../types/projectContent/projectContentType';
import { Technologies } from '../../../types/keywords/technologies';

import siteHoveringHeighlighting from './assets/digitaleAugen/siteHoveringHeighlighting.jpg';
import abstractionImage1 from './assets/digitaleAugen/abstractionImage-1.jpg';
import abstractionImage2 from './assets/digitaleAugen/abstractionImage-2.jpg';
import abstractionImage3 from './assets/digitaleAugen/abstractionImage-3.jpg';
import expressionism1 from './assets/digitaleAugen/expressionism-1.jpg';
import expressionism2 from './assets/digitaleAugen/expressionism-2.jpg';
import expressionism3 from './assets/digitaleAugen/expressionism-3.jpg';
import expressionism4 from './assets/digitaleAugen/expressionism-4.jpg';
import mondriaan0 from './assets/digitaleAugen/mondriaan-0.jpg';
import mondriaan1 from './assets/digitaleAugen/mondriaan-1.jpg';
import mondriaan2 from './assets/digitaleAugen/mondriaan-2.jpg';
import mondriaan3 from './assets/digitaleAugen/mondriaan-3.jpg';
import onlySource from './assets/digitaleAugen/onlySource.jpg';
import onlySource1 from './assets/digitaleAugen/onlySource-1.jpg';
import onlySource2 from './assets/digitaleAugen/onlySource-2.jpg';
import onlySource3 from './assets/digitaleAugen/onlySource-3.jpg';
import onlySource4 from './assets/digitaleAugen/onlySource-4.jpg';
import onlySource5 from './assets/digitaleAugen/onlySource-5.jpg';
import onlySource6 from './assets/digitaleAugen/onlySource-6.jpg';
import onlySource7 from './assets/digitaleAugen/onlySource-7.jpg';
import onlySource8 from './assets/digitaleAugen/onlySource-8.jpg';
import onlySource9 from './assets/digitaleAugen/onlySource-9.jpg';
import onlySource10 from './assets/digitaleAugen/onlySource-10.jpg';
import onlySource11 from './assets/digitaleAugen/onlySource-11.jpg';
import onlySource12 from './assets/digitaleAugen/onlySource-12.jpg';
import onlySource13 from './assets/digitaleAugen/onlySource-13.jpg';
import onlySource14 from './assets/digitaleAugen/onlySource-14.jpg';
import onlySource15 from './assets/digitaleAugen/onlySource-15.jpg';
import onlySource16 from './assets/digitaleAugen/onlySource-16.jpg';
import onlySource17 from './assets/digitaleAugen/onlySource-17.jpg';
import rebuildAnalysis1 from './assets/digitaleAugen/rebuildAnalysis-1.jpg';
import rebuildAnalysis2 from './assets/digitaleAugen/rebuildAnalysis-2.jpg';
import shillerAnalysis1 from './assets/digitaleAugen/shillerAnalysis-1.jpg';
import shillerAnalysis2 from './assets/digitaleAugen/shillerAnalysis-2.jpg';
import shillerAnalysis3 from './assets/digitaleAugen/shillerAnalysis-3.jpg';
import shillerAnalysis4 from './assets/digitaleAugen/shillerAnalysis-4.jpg';
import shillerAnalysis5 from './assets/digitaleAugen/shillerAnalysis-5.jpg';
import shillerAnalysis6 from './assets/digitaleAugen/shillerAnalysis-6.jpg';
import shillerAnalysis7 from './assets/digitaleAugen/shillerAnalysis-7.jpg';
import shillerAnalysis8 from './assets/digitaleAugen/shillerAnalysis-8.jpg';
import shillerAnalysis9 from './assets/digitaleAugen/shillerAnalysis-9.jpg';
import shillerAnalysis10 from './assets/digitaleAugen/shillerAnalysis-10.jpg';
import shillerAnalysis11 from './assets/digitaleAugen/shillerAnalysis-11.jpg';
import shillerAnalysis12 from './assets/digitaleAugen/shillerAnalysis-12.jpg';
import shillerAnalysis13 from './assets/digitaleAugen/shillerAnalysis-13.jpg';
import shillerAnalysis14 from './assets/digitaleAugen/shillerAnalysis-14.jpg';
import shillerAnalysis15 from './assets/digitaleAugen/shillerAnalysis-15.jpg';
import shillerAnalysis16 from './assets/digitaleAugen/shillerAnalysis-16.jpg';
import shillerAnalysis17 from './assets/digitaleAugen/shillerAnalysis-17.jpg';
import shillerAnalysis18 from './assets/digitaleAugen/shillerAnalysis-18.jpg';
import shillerSource from './assets/digitaleAugen/shillerSource.jpg';
import shopAnalysis0 from './assets/digitaleAugen/shopAnalysis-0.jpg';
import shopAnalysis1 from './assets/digitaleAugen/shopAnalysis-1.jpg';
import shopAnalysis2 from './assets/digitaleAugen/shopAnalysis-2.jpg';
import shopAnalysis3 from './assets/digitaleAugen/shopAnalysis-3.jpg';
import shopAnalysis4 from './assets/digitaleAugen/shopAnalysis-4.jpg';

const id = '2021-02';

const metaData: ProjectMetaData = {
  id,
  webstring: 'digitale-augen',
  name: 'Digitale Augen',
  projectType: ProjectCategory.Software,
  description: 'POC project for quantifying the perception of window storefronts',
  keyImage: undefined,
  projectContext: ProjectContext.Professional,
  projectPartnerContext: ProjectPartnerContext.Team,
  keywords: [Keywords.Frontend, Keywords.Development, Technologies.Rhino, Technologies.DotNet],
  projectPartners: ['Alessandro Mac-Nelly', 'Julian Pelludat', 'Oliver Fritz', 'Stephan Peyer', 'Rogier Leegwater'],
};

export const digitaleAugen: ProjectData = {
  id,
  metaData,
  projectImage: createTitleImage(shillerAnalysis1, metaData.name, 1026, 1368),
  projectContent: [
    createText(
      2,
      [
        'simulated perception',
        'Through the years computer algorithms have become better and better at understanding image data. Though most of the algorithms until now have been used to solve very specific problems like object detection or helping with cleaning up images. All of these algorithms form their own interpretation of reality though, not that unsimilar to how our eyes and brain forms theirs.',
      ],
      'The goal of this project is to be able to generate heatmaps of various architectural situations, in a first stage focusing specifically on showrooms of shops. Because of the complexity of the topic this POC project falls apart into three subdomains. A pure geometric analysis of visibility - done using shader like geometrical calculations with grasshopper components -, a computer vision part trying to use different algorithms used for object detection as well as in image editing software packages and finally an urban analysis tool for assessing spatial quality to be able to simulate movement patterns.'
    ),
    {
      type: ProjectContentType.ImageGrid,
      images: [rebuildAnalysis1, rebuildAnalysis2].map((i) => createImage(i, '©️ J.W.')),
    },
    createText(1, [
      '3D analysis: viewing as light-source',
      'A first step was a simple geometrical analysis. Which surfaces are more clearly visible than others.',
    ]),
    {
      type: ProjectContentType.ImageGrid,
      images: [shopAnalysis0, shopAnalysis1, shopAnalysis2, shopAnalysis3, shopAnalysis4].map((i) => createImage(i, '©️ J.W.')),
    },
    createText(1, [
      'Expressionism',
      'Ofcourse human perception is more complex than just the interaction with volumes. The first people to use the understanding of the human perception were the Expressionists. They pushed the boundaries of our ability to recognise certain objecst by progressively more abstract paintings.',
    ]),
    {
      type: ProjectContentType.ImageGrid,
      images: [abstractionImage1, abstractionImage2, abstractionImage3].map((i) => createImage(i, '©️ J.W.')),
    },
    createText(1, ['Piet Mondriaan', 'Perhaps the most succesful Expressionist was Piet Mondriaan with his tree series.']),
    {
      type: ProjectContentType.ImageGrid,
      images: [mondriaan0, mondriaan1, mondriaan2, mondriaan3].map((i) => createImage(i, '©️ J.W.')),
    },
    createText(1, ['Science', 'In parallel to the artists, people also started enganging with the topic from a science perspective.']),
    {
      type: ProjectContentType.ImageGrid,
      images: [expressionism2, expressionism3, expressionism4, expressionism1].map((i) => createImage(i, '©️ J.W.')),
    },
    createText(1, [
      'Age of the Internet',
      'Lastly, in the age of the internet the whole field became a lot easier to measuere. Just following the mouse pointer allowed to create detailed heatmaps, allowing UX designers to see which areas of the site were the most watched and interacted with.',
    ]),
    createImage(siteHoveringHeighlighting, '©️ J.W.'),
    createText(1, [
      'Schiele',
      'The goal then was to see how far this research could be pushed from the screen into 3d space. Starting of with an art piece by Egon Schiele.',
    ]),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        shillerSource,
        shillerAnalysis1,
        shillerAnalysis2,
        shillerAnalysis3,
        shillerAnalysis4,
        shillerAnalysis5,
        shillerAnalysis6,
        shillerAnalysis7,
        shillerAnalysis8,
        shillerAnalysis9,
        shillerAnalysis10,
        shillerAnalysis11,
        shillerAnalysis12,
        shillerAnalysis13,
        shillerAnalysis14,
        shillerAnalysis15,
        shillerAnalysis16,
        shillerAnalysis17,
        shillerAnalysis18,
      ].map((i) => createImage(i, '©️ J.W.')),
    },
    createText(1, [
      'Storfronts',
      'The same tools allowed us to create an inverse visualization of the site giving us a clear perspective on how storefornts were percieved by passerbys.',
    ]),
    {
      type: ProjectContentType.ImageGrid,
      images: [
        onlySource,
        onlySource1,
        onlySource2,
        onlySource3,
        onlySource4,
        onlySource5,
        onlySource6,
        onlySource7,
        onlySource8,
        onlySource9,
        onlySource10,
        onlySource11,
        onlySource12,
        onlySource13,
        onlySource14,
        onlySource15,
        onlySource16,
        onlySource17,
      ].map((i) => createImage(i, '©️ J.W.')),
    },
  ],
};
