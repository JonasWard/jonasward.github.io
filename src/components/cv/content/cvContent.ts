import { CVData } from 'src/types/cv/cvType';

export const CVContent: CVData = {
  cvName: 'CV',
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
    citizenship: 'Swiss B-permit (EU-citizen), Belgian',
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
          '2024 - 2025 — Shipped browser-based SDF lamp configurator built with R3F; iterated to multiple production releases.'
        ],
        'SDF Scarves': [
          'https://jonasward.ch/#project/scarves',
          '2022 - 2024 — Designed and built a TPMS-based SDF pattern generator; produced and sold multiple scarf editions derived from its output.'
        ],
        'Sensing a Place': [
          'https://www.youtube.com/watch?v=tIDVZ1KbwcA&ab_channel=LaurinKilbert',
          '2022 — Delivered European Horizon 2020 Grant-funded in-situ clay 3D printing installation. Collaboration with Berlin-based artists Joana Schmitz & Leon Kilbert.'
        ],
        'Elbe Bienen': [
          'https://jonasward.ch/#project/guerilla-beehive',
          '2019 — Designed Flemish-government-funded sensor-driven beehive for Brussels-based artist Anne-marie Maes; fabricated in collaboration with Die Angewandte Wien.'
        ],
        'Frituur Futurist': [
          'https://jonasward.ch/#project/futurist',
          '2017 — CLT competition entry for an iconic frying house in Brussels — honorary mention. Collaboration with Jan Verstraete & Dominque Girolami.'
        ],
        Boekentoren: [
          'https://jonasward.ch/#project/lamps',
          "2017 — Designed and produced bedside-table lamp edition of UGent's 'Boekentoren' by Henry Van de Velde."
        ]
      }
    },
    {
      company: 'B-Architecten',
      position: 'Junior Architect',
      role: 'Competitions Design & Construction Management',
      date: 'May 2017 - September 2018',
      location: 'Antwerp, BE',
      projects: {
        Pelikaanstraat: 'Contributed to masterplan for mixed-use high-rise development near Antwerpen Centraal.',
        'Mundo-A': [
          'https://jonasward.ch/#project/mundo-a',
          'Led planning phase and construction site management for ARC19 Architecture Award-winning CLT office building.'
        ]
      }
    },
    {
      company: 'Archilyse',
      position: 'Employee',
      role: 'POCs and QA',
      date: 'October 2019 - March 2020',
      location: 'Zürich, Switzerland',
      projects: {
        'Swiss Dwelling Dataset':
          "Built Python POCs for IFC mesh topology correction (shapely, ifcopenshell); QA'd large-scale subcontractor datasets using pandas and numpy."
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
          'https://jonasward.ch/#project/coral-bricks',
          'Engineered Hochparterre Goldener Hase 2021-winning 3D-printed clay reef modules — funded by WeMakeIt crowdfunding and ETH Library Lab. Prototypes deployed to Maldives; permanent installation placed in San Andrea, Colombia.'
        ],
        'clay-online': [
          'https://jonasward.ch/clay-online/',
          'Shipped browser-based configurator for reef module customisation using babylon.js.'
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
        stoHome:
          'Built ML pipeline (LR, MLP, pix2pix, SVP) predicting wall-surface compositions from CityGML data and point cloud scans; deployed inference to web via tensorflowjs.',
        'Haworth CoDesigner':
          'Delivered evolutionary-algorithm space planner for Haworth — architected 2D CAD kernel (JTS), space syntax algorithms and anonymous IR sensor integration; hosted on Azure.',
        'Alcubond Facademaker': [
          'https://www.facademaker.alucobond.com/',
          "Shipped live 3D facade paneliser for Alucobond's CNC panels (facademaker.alucobond.com)."
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
          "Sole engineer on MES platform built for Switzerland's national timber showcase ESAF 2025 (TypeScript/React client, .Net backend, MongoDB, Google Cloud.)"
        ],
        'Rewe co-co': [
          'https://www.red-dot.org/de/rewe-group',
          'Contributed frontend on Red Dot Award-winning supermarket & vertical-farming configurator (TypeScript/React client, .Net backend, MongoDB, Google Cloud.)'
        ],
        'Stauffer Statics': [
          'https://jonasward.ch/#project/stauffer-static',
          'Sole engineer: designed, built and deployed cloud-based structural analysis tool for timber contractors end-to-end (TypeScript/React, MongoDB, client-side, Google Cloud.).'
        ],
        'Haas House Configurator': [
          'https://jonasward.ch/#project/haas-haus-configurator',
          'Maintainer: architected and shipped features for browser-based 2D/3D house configurator (TypeScript, client-side).'
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
      header: 'web dev',
      subSkills: {
        ['programming languages']: ['.ts', '.js', 'python', 'wasm (C#, rust)', 'java'],
        dev: ['bun', 'npm', 'yarn', 'conda', 'docker', 'vite', 'turbo'],
        backend: ['bun', 'Elysia', 'express', 'springboot', 'flask', 'django'],
        'CI/CD': ['azure pipeline', 'gitlab', 'bitbucket'],
        devOps: ['AWS', 'azure', 'kubernetes', 'Google Cloud', 'GitHub', 'Docker'],
        ai: ['OpenAi API', 'AzureOpenAI', 'tensorflowjs', 'onnxjs (pytorch)'],
        database: ['mongodb', 'firebase', 'supabase', 'prisma', 'mysql'],
        react: ['zustand', 'react-router', 'redux', 'next.js', 'react-pdf'],
        webGL: ['glsl', 'threejs', 'R3F', 'babylonjs', 'pixi.js', 'svg'],
        styling: ['css', 'sass', 'tailwind', 'scss', 'MUI', 'antd', 'bootstrap'],
        java: ['spring boot', 'JTS', 'gradle', 'openCV', 'AWT', 'processing'],
        other: ['leaflet', 'IFCjs', 'axios']
      }
    },
    {
      header: '.py',
      subSkills: {
        ml: ['numpy', 'pandas', 'scipy', 'matplotlib', 'openCV', 'sklearn', 'tensorflow', 'pytorch'],
        geography: ['GDAL', 'GeoPython', 'GeoPandas', 'shapely', 'qgis scripting'],
        geometry: ['blender', 'Rhino/Grasshopper', 'processing', 'ifcOpenShell', 'shapely', 'cgal (bindings)']
      }
    },
    {
      header: 'other',
      subSkills: {
        '#c': ['Unity', 'Rhino/Grasshopper', 'mono', 'WPF'],
        rust: ['wasm', 'wgpu', 'leptos'],
        other: ['go', 'julia', 'GCode', 'UR-script']
      }
    },
    {
      header: 'software',
      subSkills: {
        'code-editors': ['VSCode', 'JetBrains', 'VisualStudio', 'Jupyter / Colab'],
        'development-tools': ['git', 'bash', 'MongoDB Compass', 'docker', 'github', 'gitlab'],
        markup: ['InDesign', 'Illustrator / Inkscape', 'Photoshop', 'iWork / Office', 'Midjourney', 'Figma', 'Sketch'],
        'urban planning': ['QGIS', 'maptiler', 'AutoCAD'],
        caad: ['Rhinoceros 3D / Grasshopper', 'Revit', 'ArchiCAD', 'AutoCAD', 'Blender']
      }
    },
    {
      header: 'soft',
      subSkills: {
        languages: ['Dutch - C2', 'English - C2', 'German - C1', 'French - B2']
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
      'https://jonasward.ch/#project/url-safe-bitpacker',
      '2024 — Published open-source URL-safe bitpacking library for complex parametric models.'
    ],
    'AEC Hackathon - Copenhagen 2024':
      'Prize: Innovation — built Open Detail, an open LCA architectural detail database.',
    'AEC Hackathon - Zürich 2024': [
      'https://jonasward.ch/#project/para-slim-shady',
      'Built Santini at Home — a parametric lamp configurator.'
    ],
    'Hackathon Kosmos Klee': '2023 — Built art-as-a-message-board installation.',
    open3D: '2023 — Contributed geometry algorithms to an open-source TypeScript 3D library (Rhinoceros 3D API).',
    'jokerweek - BOX office': '2015 — Coordinated bachelor workshop week; headed scenography.',
    'design DLK - lunch lectures':
      "2014 - 2015 — Organised lecture series introducing students to their teachers' work.",
    'DLK - after hour student events': '2010 - 2015 — Organised student events and social occasions.'
  },
  pipeline: {
    Kunsthaus: 'Bedside table lamp of the "Kunsthaus" in Zurich by Karl Moser',
    Frauenkirche: 'Bedside table lamp of the "Frauenkirche" in Zurich by Hans Auer',
    Belfort: 'Bedside table lamp of the Belfry of Ghent by Arthur Verhaegen',
    MAS: 'Bedside table lamp of Antwerp\'s anthropological museum the "Museum aan de Stroom" by Neutelings Riedijk Architecten',
    Anitkabir:
      'Bedside table lamp of the mausoleum of Mustafa Kemal Ataturk in Ankara by Emin Halid Onat and Ahmet Orhan Arda',
    'Quadrato della Civilta':
      'Bedside table lamp of the "Square Colosseum" in Rome by Giovanni Guerrini, Ernesto Bruno La Padula and Mario Romano',
    'ETH Hauptgebäude': '2023 — Bedside table lamp of the "ETH Hauptgebäude" in Zurich by Gottfried Semper',
    Julierturm: '2023 — Bedside table lamp of the "Julier Tower" in the Swiss Alps by Giovanni Netzer'
  }
};
