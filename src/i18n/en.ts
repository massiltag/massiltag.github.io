import type { Content } from './types';

export const en: Content = {
  meta: {
    title: 'Massil Taguemout - IT Consultant Engineer',
    description:
      'Massil Taguemout, fullstack Java / Angular IT Consultant Engineer based in Paris. Digital transformation for insurance and banking.',
  },
  nav: {
    about: 'Profile',
    experience: 'Career',
    projects: 'Projects',
    education: 'Education',
    contact: 'Contact',
  },
  ui: {
    sound: 'Sound',
    soundOn: 'Turn ambient sound on',
    soundOff: 'Turn ambient sound off',
    scroll: 'Scroll',
    details: 'Responsibilities & achievements',
    viewCode: 'Source code',
    viewAppStore: 'App Store',
    otherLanguage: 'Passer en français',
    loading: 'Loading',
    skipToContent: 'Skip to content',
  },
  hero: {
    eyebrow: 'IT Consultant Engineer — Paris',
    tagline: 'I design and build digital solutions that combine technical performance with business impact.',
  },
  about: {
    label: 'Profile',
    title: 'Engineering rigor, <em>business sense</em>.',
    paragraphs: [
      'IT Consultant at CGI France (Paris Financial Services) since 2022, Lead Developer.',
      'I work across the full system lifecycle, from specification and design through to implementation, integrating AI from the earliest stages.',
      'Comfortable on both the technical side and the understanding of business needs, I turn those needs into clear specifications and concrete solutions. Referent for AI practices applied to software development.',
      'Graduate of the MIAGE Master’s program at Université Paris 1 Panthéon-Sorbonne and of Sorbonne Université.',
    ],
    stats: [
      { value: '7', label: 'years of experience' },
      { value: '5', label: 'major accounts' },
      { value: 'MSc', label: 'Master’s degree, MIAGE' },
    ],
    portraitAlt: 'Portrait of Massil Taguemout',
  },
  experience: {
    label: 'Career',
    title: 'Professional <em>experience</em>',
    intro: 'Insurance, banking, energy: business-critical information systems, modernized from the inside.',
    jobs: [
      {
        title: 'IT Consultant',
        employer: 'CGI France',
        date: 'Since October 2022',
        description:
          'IT Consultant at CGI France, working with major insurance companies on their digital transformation by modernizing their information systems and building innovative solutions.<br>Alongside client missions, I am involved at CGI in several areas: employee performance management, recruiting and reviewing the candidate assessment process, mentoring interns, technology watch and generative AI enablement.',
        activities: [],
        stack: [],
        missions: [
          {
            title: 'Lead Developer, AI-Augmented Design & Specification',
            employer: 'Allianz Trade',
            date: 'Since October 2025',
            description:
              'Allianz Trade, part of the Allianz Group, is the global leader in trade credit insurance and a recognized specialist in surety, collections, structured trade credit and political risk, headquartered in Paris and present in over 40 countries.<br>Within its Surety business, I work on Avalis, the platform that manages surety contracts across the Surety perimeter.',
            activities: [
              '<b>IAM to UM</b>: migration of Avalis’s authorization platform.',
              '<b>DOM Facility Creation</b>: digitalization of the surety facility workflow, from request to a signed facility.',
              '<b>Spec-driven development</b>: authored the functional and technical specifications for the DOM Facility Creation project, then used them as the single source of truth for design and implementation.',
              '<b>AI-integrated SDLC</b>: designed a full system with AI involved from the very start of the lifecycle, not only at the coding stage. Applied AI across the full SDLC as defined at Group level: analysis, scoping, specification, design, and development.',
              '<b>Intent engineering</b>: translated business needs into precise, structured intent that both the team and AI tooling can execute against. Built the project context and instruction files used with Claude Code.',
              '<b>Upstream technical leadership</b>: led scoping task forces with architects, developers, designers, and business stakeholders. Defined the MVP scope, costed the work, and presented the outcomes to the Product Owner and Project Manager.',
              '<b>AI practices referent at Allianz Technology</b>: defining and spreading good practices for AI-assisted development across teams.',
            ],
            stack: ['Claude Code', 'MCP', 'CLAUDE.md', 'Docs-first API design', 'Java', 'Node.js', 'Angular', 'AWS Lambda', 'S3', 'DynamoDB', 'RDS', 'PostgreSQL'],
          },
          {
            title: 'Fullstack Web & Mobile Developer',
            employer: 'Generali France',
            date: 'April 2024 — September 2025',
            description:
              'With nearly two centuries of history and a global footprint, Generali is a major player in insurance.<br>Founded in 1831 and present in more than 50 countries, Generali serves tens of millions of individual, professional and corporate customers with comprehensive life, health, protection, retirement and property & casualty solutions.<br>In France, Generali holds a central position in the market and invests heavily in digital innovation to simplify prospect journeys, enrich the customer experience and modernize its online platforms.<br>I was part of Generali’s PDI department (Digital Platforms & Claims), which drives the digital transformation of prospect and customer journeys and the evolution of the online platforms. I worked across the department’s three squads, each with a complementary mission: PVD, ECG and SPU.',
            activities: [
              '<b>PVD team (Digital Sales Journeys)</b>: In charge of digitizing the prospect / pre-sales journey. Its role is to streamline acquisition and sales conversion through modern online spaces: Prospect Space, quote simulators, e-signature, lead tracking and integration with partner channels.<br>Projects delivered: <ul><li>Continuous maintenance and evolution of the Simulateur Fast Quote (SFQ) journeys;</li><li>Maintenance and evolution of the e-signature service integrated with DocuSign;</li><li>Rebranding of the Prospect Space following the acquisition of La Médicale;</li><li>Digitization of the health claims journey (road traffic accidents).</li></ul>',
              '<b>ECG team (Generali Customer Space)</b>: Dedicated to the post-subscription customer experience, with the goal of increasing policyholders’ autonomy and satisfaction. It builds and enriches the customer space features: viewing and managing contracts, fund switches, claims, online payment… to reduce friction and digitize contract management.<br>Projects delivered: <ul><li>Development of the fund switch journey for retirement savings contracts (PER), increasing customer autonomy and reducing reliance on advisors;</li><li>Online payment for customers not on direct debit, making collection and payment tracking easier;</li><li>Management of matured contracts, letting customers carry out operations on them directly online;</li><li>New self-service features in the Customer Space (contract management, customer profile, digital journeys) to improve the user experience and reduce support calls.</li></ul>',
              '<b>SPU team (Public Websites)</b>: Responsible for the public-facing web platforms, ensuring their availability, compliance and scalability. It maintains and evolves strategic sites such as Generali.fr and EFAR, contributing to Generali’s visibility and the quality of its digital image.<br>Projects delivered: <ul><li>Maintenance and evolution of EFAR (Ensemble Face aux Risques): a free public platform that gives individuals a personalized assessment of their exposure to natural hazards (floods, drought, wildfires, earthquakes…) and technological hazards (industrial accidents, nuclear risk) from a simple address.</li></ul>',
              'Design, development and maintenance of Spring Boot / Angular applications.',
              'Development of reusable components (React mobile library, Angular modules) to harmonize the user experience.',
              'Integration of third-party solutions: FranceConnect, DocuSign, Axepta.',
              'Software quality monitoring with SonarQube, unit testing, clean code best practices.',
              'Writing detailed technical specifications and taking part in design workshops with the architecture teams.',
              'Contributing to functional and technical acceptance testing, handling feedback and fixes.',
              'Database optimization and migrations with Liquibase.',
              'Corrective and evolutive maintenance and support of production applications.',
              'Agile Scrum framework: active participation in ceremonies, facilitation and direct collaboration with Product Owners, UX/UI designers and QA teams.',
            ],
            stack: ['Java 17', 'Spring Boot', 'Angular 19', 'Capacitor', 'RxJS / NgXs Store', 'JUnit', 'PostgreSQL', 'Liquibase', 'Maven', 'Docker', 'Azure DevOps', 'ArgoCD', 'SonarQube', 'Git', 'npm', 'Agile', 'Jira', 'Confluence'],
          },
          {
            title: 'Technical & Functional Lead Consultant',
            employer: 'MGEN — Mutuelle Générale de l’Éducation Nationale',
            date: 'October 2022 — April 2024',
            description:
              'A major player in social protection and the leading mutual insurer for French public servants, MGEN (Mutuelle Générale de l’Éducation Nationale) offers health and protection plans tailored to its members, along with savings, retirement, home, travel and legal protection products.<br>To address the reform of supplementary social protection introduced by the 2019 French civil service transformation law, MGEN chose Activ’ Infinite, an insurance software package developed by CEGEDIM, as the core solution for managing its group contracts, and entrusted CGI with integrating the product into its information system.',
            activities: [
              'Leading a team of developers, onboarding newcomers and supporting their technical and methodological growth.',
              'Coordinating between the development team and the client: running discussions, clarifying requirements and making sure business stakes were well understood.',
              'Writing detailed functional specifications in close collaboration with the client teams to align business processes with the technical solutions delivered.',
              'Developing the connectors between MGEN’s information system and the Activ’ Infinite package (synchronous REST and asynchronous Kafka microservices).',
              'Building an event tracking and business rejection handling system with an Angular UI.',
              'Writing unit tests and maintaining code quality (SonarQube).',
              'Writing detailed technical specifications.',
              'Owning client satisfaction: gathering, analyzing and arbitrating feedback to keep business needs and technical solutions consistent, while rallying the team around shared goals.',
              'Technical coordination with the client teams to specify and validate interface contracts.',
              'Supporting end-to-end testing.',
              'Supporting the client’s development teams.',
            ],
            stack: ['Java 11', 'Angular', 'Spring Boot', 'REST API', 'Kafka', 'JUnit', 'JavaScript', 'TypeScript', 'Bootstrap', 'PostgreSQL', 'Maven', 'SonarQube', 'GitLab Pipelines', 'Git', 'npm', 'Postman', 'Apigee', 'HP ALM Quality Center', 'Jira'],
          },
        ],
      },
      {
        title: 'Software Engineer',
        employer: 'LCL',
        date: 'September 2020 — September 2022',
        description:
          'Le Crédit Lyonnais, a subsidiary of Crédit Agricole SA known as LCL, is a French bank founded in Lyon in 1863. It is considered one of the three pillars of the French banking industry, alongside BNP Paribas and Société Générale.<br>LCL has its own in-house development framework, built on Spring and maintained by the Framework team I was part of. The team supports LCL developers and also runs projects, notably the development of the branch advisors’ portal.',
        activities: [
          'Design and development of fullstack Spring Boot / Angular applications.',
          'Fixes and enhancements to business applications.',
          'Complete rewrites from JSP/Servlet to Spring Boot / Angular.',
          'Writing unit tests.',
          'Writing technical documentation.',
          'Migrating projects to Angular 13.',
          'Level 2 support for LCL’s Java/web developers.',
          'Technology watch.',
        ],
        stack: ['Java 8/11', 'Spring Boot', 'JUnit', 'JavaScript', 'TypeScript', 'Angular', 'Bootstrap', 'jQuery', 'MongoDB', 'PostgreSQL', 'Maven', 'SonarQube', 'Jenkins', 'Git', 'npm', 'Agile'],
      },
      {
        title: 'Fullstack Developer',
        employer: 'GRTgaz',
        date: 'October 2019 — August 2020',
        description:
          'GRTgaz, a subsidiary of the ENGIE group, is one of the two gas transmission system operators in France. Facing the end of support for Oracle Utilities Application Framework, the foundation of its business applications, the company launched a complete, progressive rebuild of its sales information system with an agile organization and a modern technology stack: the RIO program.',
        activities: [
          'Rebuilding business applications with Spring Boot / Angular.',
          'Developing an application to track production incidents.',
          'Setting up an API Management strategy with Apigee.',
          'Technology watch.',
        ],
        stack: ['Java 11', 'Spring Boot', 'JavaScript', 'TypeScript', 'Angular', 'Maven', 'Git', 'npm', 'Agile', 'Amazon Web Services', 'RESTful API Design', 'Jira', 'Confluence'],
      },
    ],
  },
  projects: {
    label: 'Projects',
    title: 'Personal <em>projects</em>',
    intro: 'What I build when nobody asks me to.',
    items: [
      {
        name: 'Seven Suppers',
        year: '2026',
        description:
          'An iOS meal planning app published on the App Store: weekly menus built from a personal recipe library, automatic shopping list generation, works offline, no account and no tracking. Available on iPhone, iPad, Mac and Apple Vision Pro.',
        link: 'https://apps.apple.com/app/seven-suppers/id6782202597',
        linkKind: 'appstore',
      },
      {
        name: 'Melmi',
        year: '2024',
        description:
          'A web app for organizing group events: events shared by link, availability entered on an interactive calendar, and automatic computation of the best common time slots. Stack: Python, Flask, SQLAlchemy, jQuery, FullCalendar.',
        link: 'https://github.com/massiltag/melmi',
        linkKind: 'github',
      },
      {
        name: 'This portfolio',
        year: '2026',
        description:
          'The site you are browsing: a bilingual experience built with Astro, a printed circuit that builds itself as you scroll (Canvas 2D), GSAP animations and ambient sound synthesized live with the Web Audio API.',
        link: 'https://github.com/massiltag/massiltag.github.io',
        linkKind: 'github',
      },
      {
        name: 'Travvie',
        year: '2022',
        description:
          'Development of a complete mobile app for organizing trips. Stack: Spring Boot, Angular + Capacitor, MongoDB, Bitbucket Pipelines, Jira/Confluence.',
      },
      {
        name: 'Entrepreneurship',
        year: '2022',
        description:
          'A company creation project in real-world conditions, mentored by the company PIVOD and the MIAGE Entrepreneurs association.',
      },
      {
        name: 'InfoCovid',
        year: '2021',
        description:
          'A fullstack web app for monitoring COVID-19 indicators, with an integrated forecasting model. Angular 11 + Angular Material, Spring Boot 2.4, MongoDB, Maven, JUnit.',
        link: 'https://github.com/massiltag/infocovid',
        linkKind: 'github',
        disabled: true,
      },
      {
        name: 'Infogare',
        year: '2021',
        description:
          'A passenger information system built with the frameworks of the Jakarta EE specification (JPA, JAXB, CDI, JMS, JAX-RS — Jersey).',
        link: 'https://github.com/massiltag/sncf-infogare',
        linkKind: 'github',
        disabled: true,
      },
      {
        name: 'Microsoft Malware Prediction',
        year: '2020',
        description:
          'An AI challenge organized by Microsoft: predicting the probability that a Windows machine gets infected by various malware families based on its properties and configuration.',
        link: 'https://github.com/massiltag/Microsoft-Malware-Prediction',
        linkKind: 'github',
        disabled: true,
      },
      {
        name: 'CSV-Indexer',
        year: '2020',
        description: 'A CSV indexer written in Java, implementing several index types and studying their performance.',
        disabled: true,
      },
      {
        name: 'iOS Weather App',
        year: '2020',
        description: 'An introduction to programming with Swift: an iOS weather app.',
        link: 'https://github.com/massiltag/ios-weather-app',
        linkKind: 'github',
        disabled: true,
      },
      {
        name: 'Store management application',
        year: '2019',
        description:
          'A Java desktop application for managing a store, with several features (purchases, sales, inventory, statistics…) and a Java Swing interface.',
        link: 'https://github.com/massiltag/Magasin',
        linkKind: 'github',
        disabled: true,
      },
    ],
  },
  education: {
    label: 'Education',
    title: 'Degrees & <em>certifications</em>',
    degreesTitle: 'Degrees',
    certificationsTitle: 'Certifications',
    degrees: [
      {
        title: 'Master’s in Information Knowledge, Systems Engineering and Management',
        issuer: 'Université Paris 1 Panthéon-Sorbonne — 5-year degree',
        year: '2022',
        description: 'MIAGE Master’s degree (Computer Methods Applied to Business Management), second year taught entirely in English.',
        modules: ['Business frameworks and components', 'Software and web architecture', 'NoSQL databases', 'Cloud and pervasive computing', 'Information systems security', 'Advanced software engineering', 'Business process engineering', 'Requirements engineering', 'Business Intelligence', 'Enterprise architecture (ESOA)', 'Process mining', 'Advanced project management', 'Technology watch'],
      },
      {
        title: 'Bachelor’s degree in Computer Science',
        issuer: 'Sorbonne Université — 3-year degree',
        year: '2020',
        description: 'Final year in the DANT track (Application Development — New Technologies), completed as a work-study program at GRTgaz.',
        modules: ['Algorithms', 'Object-oriented programming (Java)', 'Functional programming', 'Relational databases', 'Software engineering', 'Web development frameworks', 'Operating systems and system programming', 'Networks', 'Data Science and Machine Learning', 'Project management'],
      },
    ],
    certifications: [
      {
        title: 'Professional Scrum Master I (PSM I)',
        issuer: 'Scrum.org',
        year: '2023',
        description: 'Demonstrates a solid command of Scrum principles and the ability to guide agile teams effectively toward successful delivery, fostering collaboration and adaptability.',
      },
      {
        title: 'TOEIC — 960 / 990',
        issuer: 'ETS',
        year: '2021',
        description: 'A standardized test of English proficiency in an international professional context: listening and reading comprehension.',
      },
    ],
  },
  contact: {
    label: 'Contact',
    title: 'Let’s build something <em>exceptional</em>.',
    text: 'A project, a mission or simply a question: I personally answer every message.',
    location: 'Paris, France',
  },
  footer: {
    rights: 'All rights reserved.',
    built: 'Designed and built by Massil Taguemout.',
  },
};
