import { CVData } from 'src/types/cv/cvType';

export const CVContent: CVData = {
  tagline: [
    'Web developer — making the world a greener place.',
    '5 years of full-stack, 10 years creative problem-solving.'
  ],
  info: {
    name: 'Van den Bulcke',
    firstName: 'Jonas Ward',
    titles: 'IR arch. MAS ETH',
    citizenship: ' Swiss B-permit (EU-citizen), Belgian, Brazilian',
    placeOfBirth: 'Rio de Janeiro, Brazil',
    dateOfBirth: '08.12.1991',
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
      role: 'Design',
      date: '2013 - now',
      location: 'Ghent, BE; Zürich, CH',
      projects: {
        'Lucerna Lecto': [
          'https://jonasward.ch/lucerna-lecto',
          '2024 - 2025 - configurable lamp shades with SDFs. Multiple iterations exists. Build with R3F'
        ],
        'SDF Scarves': [
          'https://jonasward.ch/#project/scarves',
          '2022 - 2024 - series of SDF based scarves, design informed by overlaying and scaling different TPMSs with one another, patterns generated using a browser based pattern generator'
        ],
        'Sensing a Place': [
          'https://www.youtube.com/watch?v=tIDVZ1KbwcA&ab_channel=LaurinKilbert',
          '2022 - in-situ 3d printing of clay using the material of the site, design informed by hearing, feeling, seeing. In collaboration with Berlin based artists Joana Schmitz & Leon Kilbert. Funded by an European Horizon 2020 Grant.'
        ],
        'Elbe Bienen': [
          'https://jonasward.ch/#project/guerilla-beehive',
          '2019 - 21st century beehive blending biology, informatics to help curb mass starvation due to air pollution. Design made for Brussels based artist Anne- marie Maes, funded through Hamburg Machine. In collaboration with Die Angewandte Wien. Funded by Flemish Government and Hamburg Stadskuratorerin.'
        ],
        'Frituur Futurist': [
          'https://jonasward.ch/#project/futurist',
          '2017 - Competion on the Frietkot in Brussels for a new iconic frying house for Brussels, sending in an out of CLT constructed proposal inspired by Expo ‘58 Philips pavilion and the typical Belgian "Frietzak". Collaboration with Jan Verstraete & Dominque Girolami - honorary mention.'
        ],
        Boekentoren: [
          'https://jonasward.ch/#project/lamps',
          '2017 - Bedsidetable lamp of the UGent \'s central library tower the "Boekentoren" by Henry Van de Velde'
        ]
      }
    },
    {
      company: 'B-Architecten',
      position: 'Junior Architect',
      role: 'Competions Design & Construction Management',
      date: 'May 2017 - September 2018',
      location: 'Antwerp, BE',
      projects: {
        Pelikaanstraat: 'masterplanning project for high rise development in the area of Antwerpen Centraal',
        'Mundo-A': [
          'https://jonasward.ch/#project/mundo-a',
          'planningphase and construction site manage- ment for ecological office building constructed out of CLT (ARC19 Architecture Award, winner)'
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
          'Proptech KPI & Digitization, Building POCs for solving topological issues in mesh divisions with shapely, IFC handling using ifcopenshell. QA of data inputed by subcontracters. QA with pandas, numpy'
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
          '3d printed clay structures that function as preservative art. They help keeping corals thriving despite rising ocean temperatures and acidification. Test in maldives, real prototype will be installed in San Andrea, Colombia summer 2021. Funded by crowdfunding on WeMakeIt & ETH Library Lab. - Awarded with the Hochparterre Golder Hase 2021'
        ],
        'clay-online': ['https://jonasward.ch/clay-online/', 'Web configurator for the modules brick using babylon.js.']
      }
    },
    {
      company: 'UGD',
      position: 'Consultant',
      role: 'POC & Software Development',
      date: 'March 2020 - March 2022 ',
      location: 'Konstanz, Germany',
      projects: {
        stoHome:
          'POC using CityGML datasets, point cloud scans and pictures with machine learning models (such as LR, MLP, pix2pix, SVP) for accurately reading and predicting wall surface area compositions of houses in the context of UGDs remodelling tool stoHome. Prototyping with python, trained models used on web with tensorflowjs.',
        'Haworth CoDesigner':
          'Evolutionary Algorithm based automatic planning tool for American furniture company Haworth. Built a minimal CAD kernel using the JTS framework for a cloud based 2D drawing tool.',
        'Alcubond Facademaker': [
          'https://www.facademaker.alucobond.com/',
          "Panelizer visualisation tool for 3A's Alcubond CNC'ed and folded panels"
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
          'MES for the timber industry, developed in the context of "Max der Muni" being developed for the ESAF 2025 by the "Säntis Innovations Cluster Holz"'
        ],
        'Rewe co-co': [
          'https://www.red-dot.org/de/rewe-group',
          'a web based supermarket and vertical farming configurator, team project, .Net backend, typescript backend, hosted on Google Cloud.'
        ],
        'Stauffer Statics': [
          'https://jonasward.ch/#project/stauffer-static',
          'a cloud-based static analysis tool for timber contractors. Typescript project. Responsible from start to finish, Hosted on Google Cloud'
        ],
        'Haas House Configurator': [
          'https://jonasward.ch/#project/haas-haus-configurator',
          'a cloud-based application that allows prospective clients to give shape to their dream house using a 2D/3D editor directly in their webbrowser. Typescript client side project, Hosted on AWS.'
        ]
      }
    },
    {
      company: 'circrete',
      position: 'Advisory Board Member',
      role: 'Tech Strategy',
      date: 'May 2025 - now',
      location: 'Copenhagen, Denmarkt (Remote)',
      projects: {
        'Circretes Digital Toolchain':
          'Circrete is a Copenhagen based Start-up focusing on re-use of concrete elements. My role is developing the technical toolchain, from testing to populating data.'
      }
    }
  ],
  skills: {
    soft: {
      languages: ['Dutch - C2', 'English - C2', 'German - C1', 'French - B2']
    },
    'web dev': {
      languages: ['.ts', '.js', 'python', 'wasm (C#, rust)', 'java'],
      dev: ['bun', 'npm', 'yarn', 'conda', 'docker', 'vite', 'turbo'],
      backend: ['bun', 'Elysia', 'express', 'springboot', 'flask', 'django'],
      'CI/CD': ['azure pipeline', 'gitlab', 'bitbucket'],
      devOps: ['AWS', 'azure', 'kubernetes', 'Google Cloud', 'GitHub', 'Docker'],
      ai: ['OpenAi API', 'AzureOpenAPI', 'tensorflowjs', 'onnxjs (pytorch)'],
      database: ['mongodb', 'firebase', 'supabase', 'prisma', 'mysql'],
      react: ['zustand', 'react-router', 'redux', 'next.js', 'react-pdf'],
      webGL: ['glsl', 'threejs', 'R3F', 'babylonjs', 'pixi.js', 'svg'],
      styling: ['css', 'sass', 'tailwind', 'scss', 'MUI', 'antd', 'bootstrap'],
      java: ['spring boot, JTS, gradle, openCV, AWT, processing'],
      other: ['leaflet', 'IFCjs', 'axios']
    },
    '.py': {
      ml: ['numpy', 'pandas', 'scipy', 'matplotlib', 'openCV', 'sklearn', 'tensorflow', 'pytorch'],
      geography: ['GDAL', 'GeoPython', 'GeoPandas', 'shapely', 'qgis scripting'],
      geometry: [
        'blender',
        'Rhino/Grasshopper',
        'processing',
        'ifcOpenShell',
        'shapely',
        'cgal (bindings)',
        'processing'
      ]
    },
    more: {
      '#c': ['Unity, Rhino/Grasshopper, mono, WPF'],
      rust: ['wasm, wgpu, leptos'],
      other: ['go, julia, GCode, UR-script']
    },
    software: {
      'code-editors': ['VSCode', 'JetBrains', 'VisualStudio', 'Jupyter / Colab'],
      'development-tools': ['git', 'bash', 'MongoDB compass', 'docker', 'github', 'gitlab'],
      markup: [
        'InDesign',
        'Illustrator / Inkscape',
        'Photoshop',
        'iWork / Office / google suite',
        'Midjourney',
        'Figma',
        'Sketch'
      ],
      'urban planning': ['QGIS', 'maptiler', 'AutoCAD'],
      caad: ['Rhinoceros 3D / Grasshopper', 'Revit', 'ArchiCAD', 'AutoCAD', 'Blender']
    }
  },
  extraCurricular: {
    'Green Tech Hackathon - Zürich 2025': 'Grid Carbon Intensity Load Balancing for cron jobs',
    'AEC Hackathon - Copenhagen 2025': [
      'https://janinloui.github.io/Slab2Reuse/',
      'AEC Flow - UI POC for complex data visualisation in AEC - Price: Best Mashup'
    ],
    'AEC Hackathon - Zürich 2025':
      'Projects Talking - CAM ERP for the Timber industry - Price: Most Potential for a Start-Up',
    'url-safe-bitpacking': [
      'https://jonasward.ch/#project/url-safe-bitpacker',
      '2024 - open source bitpacking library for complicated parametric models'
    ],
    'AEC Hackathon - Copenhagen 2024': 'Open Detail (LCA detail database) - Price: Innovation',
    'AEC Hackathon - Zürich 2024': [
      'https://jonasward.ch/#project/para-slim-shady',
      'Santini at home Lamp Configurator'
    ],
    'Hackathon Kosmos Klee': '2023 - Art as a message board',
    open3D: '2023 - Contributed to a typescript open source 3D geometry library based on the Rhinoceros 3D syntax',
    'jokerweek - BOX office':
      '2015 - Workshop week organised for bachelor students - coordination & head of scenography',
    'design DLK - lunch lectures':
      '2014 - 2015 - Organizer of lunch lectures introducing students to the work of their teachers',
    'DLK - after hour student event': ' 2010 - 2015 - Organizer of many drinks, parties and social occasions'
  },
  pipeline: {
    Kunsthaus: 'Bedsidetable lamp of the "Kunsthaus" in Zürich by Karl Moser',
    Frauenkirche: 'Bedsidetable lamp of the "Frauenkirche" in Zürich by Hans Auer',
    Belfort: 'Bedsidetable lamp of the Belfry of Ghent by Arthur Verhaegen',
    MAS: '2018 - Bedsidetable lamp of Antwerp\'s antropological museum the "Museum aan de Stroom" by Neutelings Riedyck Architecten',
    Anitkabir:
      '2018 - Bedsidetable lamp of the mausoleum of Mustafa Kemal Atatürk in Ankara by Emin Halid Onat and Ahmet Orhan Arda',
    'Quadrato della Civilta':
      '2018 - Bedsidetable lamp of the "Square Colosseum" in Rome by Giovanni Guerrini, Ernesto Bruno La Padula and Mario Romano',
    'ETH Hauptgebäude': '2023 - Bedsidetable lamp of the "ETH Hauptgebäude" in Zürich by Gottfried Semper',
    Julierturm: '2023 - Bedsidetable lamp of the "Julier Tower" in the Swiss Alps by Giovanni Netzer'
  }
};
