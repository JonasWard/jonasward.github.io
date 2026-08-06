import { CVData } from 'src/types/cv/cvType';

export const CVContent: CVData = {
  cvName: 'CV-living-lab-hil',
  tagline: [
    'Computational Designer',
    'Architect bridging computational design, BIM workflows and software for circular construction.',
    'Rhino/Grasshopper, Python and interdisciplinary digital planning across research and practice.'
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
          'Browser-based SDF lamp configurator (R3F); multiple production releases.'
        ],
        'Elbe Bienen': [
          'https://jonasward.ch/#/project/guerilla-beehive',
          'Sensor-driven beehive design for AnneMarie Maes — Flemish government funded.'
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
          'Hochparterre Goldener Hase 2021 — 3D-printed clay reef modules; funded by WeMakeIt & ETH Library Lab.'
        ],
        'clay-online': ['https://jonasward.ch/clay-online/', 'Browser-based reef module configurator (babylon.js).']
      }
    },
    {
      company: 'B-Architecten',
      position: 'Junior Architect',
      role: 'Competitions, Design & Construction',
      date: 'May 2017 - September 2018',
      location: 'Antwerp, BE',
      projects: {
        'Mundo-A': [
          'https://jonasward.ch/#/project/mundo-a',
          'Planning and site management for CLT ecological office (ARC19 Architecture Award winner).'
        ],
        Pelikaanstraat: 'Masterplanning for high-rise development near Antwerpen Centraal.',
        Turnova: 'Masterplanning and heritage concept for brownfield high-rise in Turnhout.'
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
          'BIM/IFC data pipelines (ifcopenshell), mesh topology POCs (shapely) and QA of subcontractor geometry inputs.'
      }
    },
    {
      company: 'UGD',
      position: 'Consultant',
      role: 'POC & Software Development',
      date: 'March 2020 - March 2022',
      location: 'Konstanz, Germany',
      projects: {
        'Alcubond Facademaker': [
          'https://www.facademaker.alucobond.com/',
          "Shipped live 3D facade paneliser for Alucobond's CNC panels — parametric geometry to fabrication."
        ],
        'Digitale Augen': [
          'https://jonasward.ch/#/project/digitale-augen',
          'Perception analysis POC with Grasshopper/C# components, point clouds and computer vision; ported toward Unity/shaders.'
        ],
        INTEGRAL:
          'Acoustic panel planning tool using IFC/OFML data — prototyped in ghPython / RhinoCommon, delivered as .Net.'
      }
    },
    {
      company: 'circrete',
      position: 'Advisory Board Member',
      role: 'Tech Strategy',
      date: 'May 2025 - now',
      location: 'Copenhagen, Denmark (Remote)',
      projects: {
        'Digital Toolchain':
          'Advising concrete-reuse start-up on circular construction data pipelines, element matching and technical architecture.'
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
          "Sole engineer on MES / digital production platform for Switzerland's national timber showcase ESAF 2025 — bridging planning data and fabrication."
        ],
        'Stauffer Statics': [
          'https://jonasward.ch/#/project/stauffer-static',
          'Built and deployed cloud structural analysis tool for timber contractors (TypeScript, Google Cloud).'
        ],
        'Haas House Configurator': [
          'https://jonasward.ch/#/project/haas-haus-configurator',
          'Browser-based 2D/3D parametric house configurator from first commit to AWS production.'
        ],
        'Rewe co-co': [
          'https://www.red-dot.org/de/rewe-group',
          'Frontend on Red Dot Award-winning configurator (TypeScript/React, .Net, Google Cloud).'
        ]
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
      header: 'Computational Design',
      subSkills: {
        Design: [
          'Parametric Design',
          'Generative Methods',
          'Digital Fabrication',
          'Circular Construction',
          'Geometry Processing'
        ],
        CAD: ['Rhino', 'Grasshopper', 'Revit', 'ArchiCAD', 'AutoCAD', 'Blender'],
        Scripting: ['Python (ghPython)', 'C# (RhinoCommon)', 'TypeScript']
      }
    },
    {
      header: 'BIM & Digital Planning',
      subSkills: {
        Workflows: ['IFC exchange', 'BIM data QA', 'Interdisciplinary coordination', 'Git / GitHub'],
        Formats: ['IFC', 'CityGML', 'OFML', 'structured CAD databases']
      }
    },
    {
      header: 'Software & AI',
      subSkills: {
        Development: ['TypeScript / React', 'Python', 'Cloud (AWS, GCP, Azure)', 'Docker'],
        AI: ['OpenAI / Azure OpenAI APIs', 'applied ML (pytorch, tensorflow)', 'tooling for planning workflows'],
        Visualization: ['Three.js / R3F', 'babylon.js', 'Unity', 'GLSL', 'Figma']
      }
    }
  ],
  extraCurricular: {
    'AEC Hackathon - Copenhagen 2026': [
      'https://jonasward.ch/#/project/repurposed',
      'Prize: Best Solves a Big Problem — reuse platform with partial AI integration.'
    ],
    'AEC Hackathon - Copenhagen 2025': [
      'https://janinloui.github.io/Slab2Reuse/',
      'Prize: Best Mashup — Slab2Reuse / AEC Flow for complex architectural reuse datasets.'
    ],
    'AEC Hackathon - Zürich 2025': 'Prize: Most Potential for Start-Up — Projects Talking, CAM / ERP for timber.',
    'AEC Hackathon - Copenhagen 2024': 'Prize: Innovation — Open Detail, open LCA architectural detail database.',
    'url-safe-bitpacking': [
      'https://jonasward.ch/#/project/url-safe-bitpacker',
      'Open-source URL-safe bitpacking for complex parametric models.'
    ],
    open3D: 'Contributed geometry algorithms to an open-source TypeScript 3D library (Rhinoceros 3D API).',
    'craft talks UGD': '2020 – 2021 — Organised internal knowledge-sharing lectures for colleagues.'
  }
};
