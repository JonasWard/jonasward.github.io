import { CVData } from 'src/types/cv/cvType';

export const CVContent: CVData = {
  cvName: 'CV-compact',
  tagline: [
    'Front-End Engineer',
    '5+ years shipping TypeScript & Python products from prototype to production.',
    '4x hackathon prize-winner.',
    'AEC-tech & sustainability across CH, DE, BE, DK.'
  ],
  info: {
    name: 'Van den Bulcke',
    firstName: 'Jonas Ward',
    titles: 'IR arch. MAS ETH',
    citizenship: 'Swiss B-permit (EU-citizen), Belgian, Brazilian',
    telephone: '+41 76 232 76 27',
    email: 'jonas@jonasward.ch',
    website: ['https://jonasward.ch', 'jonasward.ch'],
    github: ['https://github.com/jonasward', 'github.com/jonasward'],
    linkedin: ['https://linkedin.com/in/wardjonas', 'linkedin.com/in/wardjonas'],
    addressLine1: 'Mühlehalde 11, 8032, Zürich, Switzerland',
    addressLine2: 'Schoonmeersstraat 29, 9000, Gent, Belgium'
  },
  education: [
    {
      name: 'ETH Zürich',
      place: 'Zürich, Switzerland',
      date: '2018 - 2019',
      description: 'Master of Advanced Studies in Digital Fabrication'
    },
    {
      name: 'TUM',
      place: 'Munich, Germany',
      date: '2014 - 2015',
      description: 'Master of Science in Architecture and Urban Design'
    },
    {
      name: 'UGent',
      place: 'Ghent, Belgium',
      date: '2010 - 2015',
      description: 'Master of Science in Architecture and Engineering'
    }
  ],
  experience: [
    {
      company: 'Jonas Ward',
      position: 'self-employed',
      role: 'Design & Engineering',
      date: '2013 - now',
      location: 'Ghent, BE; Zürich, CH',
      projects: {
        'Lucerna Lecto': [
          'https://jonasward.ch/lucerna-lecto',
          '2024 - 2025 — Shipped browser-based SDF lamp configurator (R3F); multiple production releases.'
        ],
        'Elbe Bienen': [
          'https://jonasward.ch/#/project/guerilla-beehive',
          '2019 — Designed Flemish-government-funded sensor-driven beehive for Brussels-based artist Anne-marie Maes.'
        ]
      }
    },
    {
      company: 'rrreefs',
      position: 'Consultant',
      role: 'Design and Fabrication Strategy',
      date: 'September 2019 - 2022',
      location: 'Zürich, Switzerland',
      projects: {
        Modules: [
          'https://jonasward.ch/#/project/coral-bricks',
          'Engineered Hochparterre Goldener Hase 2021-winning 3D-printed clay reef modules — funded by WeMakeIt & ETH Library Lab. Permanent installation in San Andrea, Colombia.'
        ],
        'clay-online': [
          'https://jonasward.ch/clay-online/',
          'Shipped browser-based reef module configurator (babylon.js).'
        ]
      }
    },
    {
      company: 'UGD',
      position: 'Consultant',
      role: 'POC & Software Development',
      date: 'March 2020 - March 2022',
      location: 'Konstanz, Germany',
      projects: {
        'Haworth CoDesigner':
          'Delivered evolutionary-algorithm space planner for Haworth — 2D CAD kernel (JTS), space syntax algorithms, IR sensor integration. Hosted on Azure.',
        'Alcubond Facademaker': [
          'https://www.facademaker.alucobond.com/',
          "Shipped live 3D facade paneliser for Alucobond's CNC panels."
        ]
      }
    },
    {
      company: 'design-to-production',
      position: 'Consultant',
      role: 'FullStack Developer',
      date: 'April 2022 - now',
      location: 'Zürich, Switzerland',
      projects: {
        'Holzvision Max': [
          'https://holzvisionmax.ch/',
          "Sole engineer on MES platform for Switzerland's national timber showcase ESAF 2025 — live at holzvisionmax.ch."
        ],
        'Rewe co-co': [
          'https://www.red-dot.org/de/rewe-group',
          'Frontend on Red Dot Award-winning supermarket & vertical-farming configurator (TypeScript/React, .Net, Google Cloud).'
        ],
        'Stauffer Statics': [
          'https://jonasward.ch/#/project/stauffer-static',
          'Sole engineer: built and deployed cloud structural analysis tool for timber contractors (TypeScript, Google Cloud).'
        ],
        'Haas House Configurator': [
          'https://jonasward.ch/#/project/haas-haus-configurator',
          'Sole engineer: shipped browser-based 2D/3D house configurator from first commit to AWS production.'
        ]
      }
    },
    {
      company: 'circrete',
      position: 'Advisory Board Member',
      role: 'Tech Strategy',
      date: 'May 2025 - now',
      location: 'Copenhagen, Denmark (Remote)',
      projects: {
        'circretes Digital Toolchain':
          'Advising Copenhagen-based concrete-reuse start-up on technical strategy and data-pipeline architecture.'
      }
    }
  ],
  skills: [
    {
      header: 'soft',
      subSkills: {
        languages: ['Dutch C2', 'English C2', 'German C1', 'French B2']
      }
    },
    {
      header: 'programming languages',
      subSkills: {
        primary: ['TypeScript / JS (5+ yrs)', 'Python (4+ yrs)', 'C# (3+ yrs)']
      }
    },
    {
      header: 'frontend',
      subSkills: {
        react: ['React', 'Next.js', 'zustand', 'redux', 'react-router'],
        '3D / WebGL': ['Three.js / R3F', 'babylon.js', 'GLSL shaders', 'pixi.js'],
        styling: ['Tailwind', 'CSS / SCSS', 'MUI', 'antd']
      }
    },
    {
      header: 'backend',
      subSkills: {
        server: ['bun / Elysia', 'express', 'flask / django', 'springboot'],
        cloud: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'kubernetes'],
        database: ['mongodb', 'supabase', 'prisma', 'mysql']
      }
    },
    {
      header: 'data & ML',
      subSkills: {
        ML: ['pytorch', 'tensorflow', 'sklearn', 'openCV', 'pandas'],
        spatial: ['GDAL', 'GeoPandas', 'shapely', 'QGIS']
      }
    },
    {
      header: 'design',
      subSkills: {
        tools: ['Figma', 'Rhino / Grasshopper', 'Blender', 'InDesign', 'QGIS']
      }
    }
  ],
  extraCurricular: {
    'Green Tech Hackathon - Zürich 2025':
      'Built grid carbon intensity load balancer for scheduled jobs (cron / serverless).',
    'AEC Hackathon - Copenhagen 2025': [
      'https://janinloui.github.io/Slab2Reuse/',
      'Prize: Best Mashup — built AEC Flow, a data-vis UI POC for complex architectural datasets.'
    ],
    'AEC Hackathon - Zürich 2025':
      'Prize: Most Potential for Start-Up — built Projects Talking, a CAM / ERP tool for the timber industry.',
    'url-safe-bitpacking': [
      'https://jonasward.ch/#/project/url-safe-bitpacker',
      '2024 — Published open-source URL-safe bitpacking library for complex parametric models.'
    ],
    'AEC Hackathon - Copenhagen 2024':
      'Prize: Innovation — built Open Detail, an open LCA architectural detail database.',
    'AEC Hackathon - Zürich 2024': [
      'https://jonasward.ch/#/project/para-slim-shady',
      'Built Santini at Home — a parametric lamp configurator.'
    ],
    open3D: '2023 — Contributed geometry algorithms to an open-source TypeScript 3D library (Rhinoceros 3D API).'
  }
};
