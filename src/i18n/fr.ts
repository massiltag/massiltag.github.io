import type { Content } from './types';

export const fr: Content = {
  meta: {
    title: 'Massil Taguemout - Consultant Ingénieur IT',
    description:
      'Massil Taguemout, Consultant Ingénieur IT fullstack Java / Angular à Paris. Transformation digitale dans l’assurance et la banque.',
  },
  nav: {
    about: 'Profil',
    experience: 'Parcours',
    projects: 'Projets',
    education: 'Formation',
    contact: 'Contact',
  },
  ui: {
    sound: 'Son',
    soundOn: 'Activer le son d’ambiance',
    soundOff: 'Couper le son d’ambiance',
    scroll: 'Défiler',
    details: 'Missions & réalisations',
    viewCode: 'Code source',
    viewAppStore: 'App Store',
    otherLanguage: 'Switch to English',
    loading: 'Chargement',
    skipToContent: 'Aller au contenu',
  },
  hero: {
    eyebrow: 'Consultant Ingénieur IT — Paris',
    tagline: 'Je conçois et construis des solutions digitales qui allient performance technique et impact business.',
  },
  about: {
    label: 'Profil',
    title: 'Rigueur technique, <em>vision business</em>.',
    paragraphs: [
      'Consultant IT chez CGI France (Paris Financial Services) depuis 2022, Lead Developer.',
      'J’interviens sur l’ensemble du cycle de vie des systèmes, de la spécification et de la conception jusqu’à la mise en œuvre, en intégrant l’IA dès l’amont.',
      'À l’aise aussi bien sur le fond technique que sur la compréhension des besoins métier, je transforme ces besoins en spécifications claires et en solutions concrètes. Référent des pratiques d’IA appliquées au développement.',
      'Diplômé du Master MIAGE de l’Université Paris 1 Panthéon-Sorbonne et de Sorbonne Université.',
    ],
    stats: [
      { value: '7', label: 'années d’expérience' },
      { value: '5', label: 'grands comptes' },
      { value: 'Bac+5', label: 'Master MIAGE' },
    ],
    portraitAlt: 'Portrait de Massil Taguemout',
  },
  experience: {
    label: 'Parcours',
    title: 'Expérience <em>professionnelle</em>',
    intro: 'Assurance, banque, énergie : des systèmes d’information critiques, modernisés de l’intérieur.',
    jobs: [
      {
        title: 'Consultant IT',
        employer: 'CGI France',
        date: 'Depuis octobre 2022',
        description:
          'Consultant IT chez CGI France, intervenant auprès de grands acteurs du secteur de l’assurance dans leur transformation digitale à travers la modernisation des systèmes d’information et le développement de solutions innovantes.<br>En complément des missions clients, implication chez CGI sur plusieurs axes : management de la performance des collaborateurs, recrutement et revue du processus d’évaluation des candidats, tutorat de stagiaires, veille technologique et accompagnement sur l’IA générative.',
        activities: [],
        stack: [],
        missions: [
          {
            title: 'Lead Developer, Conception et Spécification augmentées par l’IA',
            employer: 'Allianz Trade',
            date: 'Depuis octobre 2025',
            description:
              'Allianz Trade, filiale du groupe Allianz, est le leader mondial de l’assurance-crédit et un spécialiste reconnu de la caution, du recouvrement, du crédit commercial structuré et du risque politique. Son siège est à Paris et il est présent dans plus de 40 pays.<br>Au sein de son activité Surety (caution), j’interviens sur Avalis, la plateforme de gestion des contrats de caution du périmètre Surety.',
            activities: [
              '<b>IAM to UM</b> : migration de la plateforme d’autorisations d’Avalis.',
              '<b>DOM Facility Creation</b> : digitalisation du parcours de création de facilités de caution, de la demande jusqu’à la facilité signée.',
              '<b>Spec-driven development</b> : rédaction des spécifications fonctionnelles et techniques du projet DOM Facility Creation, devenues la source unique de vérité pour la conception et l’implémentation.',
              '<b>SDLC intégrant l’IA</b> : conception d’un système complet avec l’IA impliquée dès le début du cycle de vie, et pas seulement au stade du code. Application de l’IA sur l’ensemble du SDLC tel que défini au niveau Groupe : analyse, cadrage, spécification, conception et développement.',
              '<b>Intent engineering</b> : traduction des besoins métier en intentions précises et structurées, exécutables aussi bien par l’équipe que par les outils d’IA. Création des fichiers de contexte et d’instructions projet utilisés avec Claude Code.',
              '<b>Leadership technique en amont</b> : animation de task forces de cadrage avec architectes, développeurs, designers et parties prenantes métier. Définition du périmètre MVP, chiffrage et restitution au Product Owner et au Project Manager.',
              '<b>Référent pratiques IA chez Allianz Technology</b> : définition et diffusion des bonnes pratiques de développement assisté par l’IA auprès des équipes.',
            ],
            stack: ['Claude Code', 'MCP', 'CLAUDE.md', 'Docs-first API design', 'Java', 'Node.js', 'Angular', 'AWS Lambda', 'S3', 'DynamoDB', 'RDS', 'PostgreSQL'],
          },
          {
            title: 'Développeur Fullstack Web & Mobile',
            employer: 'Generali France',
            date: 'Avril 2024 — Septembre 2025',
            description:
              'Avec près de deux siècles d’histoire et une implantation mondiale, Generali s’impose comme un acteur majeur de l’assurance.<br>Fondé en 1831 et implanté dans plus de 50 pays, Generali accompagne des dizaines de millions de clients particuliers, professionnels et entreprises à travers des solutions complètes en assurance vie, santé, prévoyance, retraite et dommages.<br>En France, Generali occupe une place centrale sur le marché et investit fortement dans l’innovation digitale afin de simplifier les parcours prospects, enrichir l’expérience client et moderniser ses plateformes en ligne.<br>Intégré au sein du département PDI (Plateformes Digitales & Indemnisations) de Generali, qui pilote la transformation digitale des parcours prospects et clients ainsi que l’évolution des plateformes en ligne. J’intervenais au sein des trois squads du département, aux missions complémentaires : PVD, ECG et SPU.',
            activities: [
              '<b>Équipe PVD (Parcours de Vente Digitaux)</b> : En charge de la digitalisation du parcours prospects/avant-vente. Son rôle est de fluidifier l’acquisition et la conversion commerciale à travers des espaces en ligne modernes : Espace Prospect, simulateurs, E-Signature, le suivi des leads et l’intégration avec les canaux partenaires.<br>Projets menés : <ul><li>Maintenance et évolution continue des parcours Simulateur Fast Quote (SFQ) ;</li><li>Maintenance et évolution du service d’E-Signature en interface avec DocuSign ;</li><li>Rebranding de l’Espace Prospect à la suite de l’acquisition de La Médicale ;</li><li>Digitalisation du parcours d’indemnisation santé (accident de la circulation).</li></ul>',
              '<b>Équipe ECG (Espace Client Generali)</b> : Dédiée à l’expérience client post-adhésion, avec pour objectif de renforcer l’autonomie et la satisfaction des assurés. Elle développe et enrichit les fonctionnalités de l’espace client : consultation et gestion des contrats, arbitrages, sinistres, paiement en ligne… pour réduire les frictions et digitaliser la gestion des contrats.<br>Projets menés : <ul><li>Développement du parcours d’arbitrage sur les contrats Retraite (PER), renforçant l’autonomie des clients et réduisant le recours aux conseillers ;</li><li>Mise en place du paiement en ligne pour les clients hors prélèvement automatique, facilitant la collecte et le suivi des encaissements ;</li><li>Gestion des contrats arrivés à terme, permettant aux clients d’effectuer des opérations sur leurs contrats à terme directement en ligne ;</li><li>Développement de nouvelles fonctionnalités de gestion en libre-service sur l’Espace Client (gestion contractuelle, profil client, parcours digitaux) afin d’améliorer l’expérience utilisateur et réduire les appels au support.</li></ul>',
              '<b>Équipe SPU (Sites Publics)</b> : Responsable des plateformes web ouvertes au grand public, garantissant leur disponibilité, conformité et évolutivité. Elle maintient et fait évoluer des sites stratégiques comme Generali.fr ou EFAR, contribuant à la visibilité de Generali et à la qualité de son image digitale.<br>Projets menés : <ul><li>Maintenance et évolutions d’EFAR (Ensemble Face aux Risques) : plateforme digitale gratuite et accessible aux particuliers qui permet de réaliser un diagnostic personnalisé de l’exposition aux risques naturels (inondations, sécheresse, feux de forêt, séismes…) et technologiques (accidents industriels, risque nucléaire), à partir d’une simple adresse.</li></ul>',
              'Conception, développement et maintenance d’applications Spring Boot / Angular.',
              'Développement de composants réutilisables (librairie React mobile, modules Angular) pour harmoniser l’expérience utilisateur.',
              'Intégration de solutions tierces : FranceConnect, DocuSign, Axepta.',
              'Suivi de la qualité logicielle avec SonarQube, rédaction de tests unitaires, adoption de bonnes pratiques clean code.',
              'Rédaction de spécifications techniques détaillées et participation aux ateliers de conception avec les équipes d’architecture.',
              'Contribution aux phases de recette fonctionnelle et technique, gestion des retours et correctifs.',
              'Optimisation et migration des bases de données avec Liquibase.',
              'Support et maintenance corrective et évolutive des applications en production.',
              'Framework Agile Scrum : participation active aux instances, animation et interaction directe avec les Product Owners, UX/UI designers et équipes de test.',
            ],
            stack: ['Java 17', 'Spring Boot', 'Angular 19', 'Capacitor', 'RxJS / NgXs Store', 'JUnit', 'PostgreSQL', 'Liquibase', 'Maven', 'Docker', 'Azure DevOps', 'ArgoCD', 'SonarQube', 'Git', 'npm', 'Agile', 'Jira', 'Confluence'],
          },
          {
            title: 'Consultant Lead Technico-Fonctionnel',
            employer: 'MGEN — Mutuelle Générale de l’Éducation Nationale',
            date: 'Octobre 2022 — Avril 2024',
            description:
              'Acteur majeur de la protection sociale et première mutuelle de la fonction publique, la MGEN (Mutuelle Générale de l’Éducation Nationale) propose des offres de santé et de prévoyance adaptées aux besoins de ses adhérents, ainsi que des solutions d’épargne, de retraite, d’assurance immobilier, de voyage et de protection juridique.<br>Pour répondre aux enjeux de la réforme de la Protection Sociale Complémentaire, entrant dans le cadre de la loi de transformation de la fonction publique de 2019, la MGEN a opté pour l’emploi d’Activ’ Infinite, un progiciel assurance développé par l’éditeur de logiciels CEGEDIM, comme solution cœur pour la gestion de ses contrats collectifs et a confié à CGI la responsabilité d’intégrer le produit dans son système d’information.',
            activities: [
              'Encadrement d’une équipe de développeurs, formation des nouveaux arrivants et accompagnement dans la montée en compétences techniques et méthodologiques.',
              'Coordination entre l’équipe de développement et le client : animation des échanges, clarification des besoins et suivi de la bonne compréhension des enjeux métiers.',
              'Spécification fonctionnelle détaillée des besoins en collaboration étroite avec les équipes client pour garantir l’adéquation entre les processus métiers et les solutions techniques développées.',
              'Développement des connecteurs permettant l’interfaçage entre le SI MGEN et le progiciel Activ’ Infinite (microservices synchrones REST et asynchrones Kafka).',
              'Développement d’un système de suivi des événements et gestion des rejets métier avec IHM Angular.',
              'Rédaction de tests unitaires et maintien de la qualité du code (SonarQube).',
              'Rédaction de spécifications techniques détaillées.',
              'Garant de la satisfaction client : centralisation, analyse et arbitrage des retours pour assurer la cohérence entre les besoins métier et les solutions techniques, tout en fédérant l’équipe autour des objectifs communs.',
              'Coordination technique avec les équipes client pour la spécification et la validation des contrats d’interface.',
              'Assistance aux tests End-to-End.',
              'Support aux équipes de développement client.',
            ],
            stack: ['Java 11', 'Angular', 'Spring Boot', 'API REST', 'Kafka', 'JUnit', 'JavaScript', 'TypeScript', 'Bootstrap', 'PostgreSQL', 'Maven', 'SonarQube', 'GitLab Pipelines', 'Git', 'npm', 'Postman', 'Apigee', 'HP ALM Quality Center', 'Jira'],
          },
        ],
      },
      {
        title: 'Ingénieur d’Études et Développement',
        employer: 'LCL',
        date: 'Septembre 2020 — Septembre 2022',
        description:
          'Le Crédit Lyonnais, filiale du groupe Crédit Agricole SA et connue sous l’appellation LCL, est une banque française fondée à Lyon en 1863. Elle est considérée comme l’un des trois piliers de l’industrie bancaire française, avec BNP Paribas et Société Générale.<br>LCL possède un framework interne de développement conçu par l’entreprise, basé sur Spring et maintenu par l’équipe Framework dont j’étais membre. L’équipe fonctionne en support aux développeurs LCL mais aussi en projet, notamment sur le développement du portail des conseillers en agence.',
        activities: [
          'Conception et développement d’applications fullstack Spring Boot / Angular.',
          'Correction et évolution des applications métier.',
          'Refontes intégrales de JSP/Servlet vers Spring Boot / Angular.',
          'Écriture de tests unitaires.',
          'Rédaction de documentation technique.',
          'Migration des projets vers Angular 13.',
          'Activité de support de niveau 2 aux développeurs Java/Web LCL.',
          'Veille technologique.',
        ],
        stack: ['Java 8/11', 'Spring Boot', 'JUnit', 'JavaScript', 'TypeScript', 'Angular', 'Bootstrap', 'jQuery', 'MongoDB', 'PostgreSQL', 'Maven', 'SonarQube', 'Jenkins', 'Git', 'npm', 'Agile'],
      },
      {
        title: 'Développeur Fullstack',
        employer: 'GRTgaz',
        date: 'Octobre 2019 — Août 2020',
        description:
          'GRTgaz, filiale du groupe ENGIE, est l’un des deux gestionnaires de réseau de transport de gaz en France. Pour faire face à la fin du support d’Oracle Utilities Application Framework, socle applicatif principal des applications métier GRTgaz, l’entreprise s’est lancée dans la refonte intégrale et progressive de son système d’information vente avec une organisation agile et une pile applicative innovante : le programme RIO (Refonte du SI de l’Offre).',
        activities: [
          'Refonte d’applications métier en Spring Boot / Angular.',
          'Développement d’une application de suivi des incidents en production.',
          'Mise en place d’une stratégie d’API Management avec la solution Apigee.',
          'Veille technologique.',
        ],
        stack: ['Java 11', 'Spring Boot', 'JavaScript', 'TypeScript', 'Angular', 'Maven', 'Git', 'npm', 'Agile', 'Amazon Web Services', 'RESTful API Design', 'Jira', 'Confluence'],
      },
    ],
  },
  projects: {
    label: 'Projets',
    title: 'Projets <em>personnels</em>',
    intro: 'Ce que je construis quand personne ne me le demande.',
    items: [
      {
        name: 'Seven Suppers',
        year: '2026',
        description:
          'Application iOS de planification de repas publiée sur l’App Store : menus de la semaine construits à partir d’une bibliothèque de recettes personnelle, génération automatique de la liste de courses, fonctionnement hors ligne, sans compte ni tracking. Disponible sur iPhone, iPad, Mac et Apple Vision Pro.',
        link: 'https://apps.apple.com/fr/app/seven-suppers/id6782202597',
        linkKind: 'appstore',
      },
      {
        name: 'Melmi',
        year: '2024',
        description:
          'Application web d’organisation d’événements de groupe : création d’événements partageables par lien, saisie des disponibilités sur un calendrier interactif et calcul automatique des meilleurs créneaux communs. Environnement : Python, Flask, SQLAlchemy, jQuery, FullCalendar.',
        link: 'https://github.com/massiltag/melmi',
        linkKind: 'github',
        disabled: true,
      },
      {
        name: 'Ce portfolio',
        year: '2026',
        description:
          'Le site que vous parcourez : une expérience bilingue construite avec Astro, un circuit imprimé qui se construit au fil du scroll (Canvas 2D), des animations GSAP et un son d’ambiance synthétisé en direct via la Web Audio API.',
        link: 'https://github.com/massiltag/massiltag.github.io',
        linkKind: 'github',
      },
      {
        name: 'Travvie',
        year: '2022',
        description:
          'Développement d’une application mobile complète d’organisation de voyages. Environnement : Spring Boot, Angular + Capacitor, MongoDB, Bitbucket Pipelines, Jira/Confluence.',
      },
      {
        name: 'Entrepreneuriat',
        year: '2022',
        description:
          'Projet de création d’entreprise dans des conditions réelles. En tutorat avec l’entreprise PIVOD et l’association MIAGE Entrepreneurs.',
      },
      {
        name: 'InfoCovid',
        year: '2021',
        description:
          'Développement d’une application web fullstack pour la surveillance des indicateurs liés à la COVID-19 et intégration d’un modèle de prévisions. Angular 11 + Angular Material, Spring Boot 2.4, MongoDB, Maven, JUnit.',
        link: 'https://github.com/massiltag/infocovid',
        linkKind: 'github',
        disabled: true,
      },
      {
        name: 'Infogare',
        year: '2021',
        description:
          'Conception d’un système d’information voyageur à l’aide des différents frameworks de la spécification Jakarta EE (JPA, JAXB, CDI, JMS, JAX-RS — Jersey).',
        link: 'https://github.com/massiltag/sncf-infogare',
        linkKind: 'github',
        disabled: true,
      },
      {
        name: 'Microsoft Malware Prediction',
        year: '2020',
        description:
          'Défi d’IA organisé par Microsoft : prédire la probabilité qu’une machine Windows soit infectée par diverses familles de logiciels malveillants en fonction de ses différentes propriétés et de sa configuration.',
        link: 'https://github.com/massiltag/Microsoft-Malware-Prediction',
        linkKind: 'github',
        disabled: true,
      },
      {
        name: 'CSV-Indexer',
        year: '2020',
        description: 'Indexeur de CSV réalisé en Java, implémentation de différents types d’index et étude de la performance.',
        disabled: true,
      },
      {
        name: 'iOS Weather App',
        year: '2020',
        description: 'Projet d’introduction à la programmation avec Swift : application météo iOS.',
        link: 'https://github.com/massiltag/ios-weather-app',
        linkKind: 'github',
        disabled: true,
      },
      {
        name: 'Application de gestion d’un magasin',
        year: '2019',
        description:
          'Conception d’une application de bureau en Java pour la gestion d’un magasin. Intégration de plusieurs fonctionnalités (achat, vente, inventaire, statistiques…). Interface graphique avec Java Swing.',
        link: 'https://github.com/massiltag/Magasin',
        linkKind: 'github',
        disabled: true,
      },
    ],
  },
  education: {
    label: 'Formation',
    title: 'Diplômes & <em>certifications</em>',
    degreesTitle: 'Diplômes',
    certificationsTitle: 'Certifications',
    degrees: [
      {
        title: 'Master Information Knowledge, Systems Engineering and Management',
        issuer: 'Université Paris 1 Panthéon-Sorbonne — Bac+5',
        year: '2022',
        description: 'Master MIAGE (Méthodes Informatiques Appliquées à la Gestion des Entreprises), M2 entièrement dispensé en anglais.',
        modules: ['Frameworks et composants métier', 'Architecture logicielle et web', 'Bases de données NoSQL', 'Cloud et Pervasive Computing', 'Sécurité des SI', 'Génie logiciel avancé', 'Ingénierie de processus métier', 'Ingénierie des exigences', 'Business Intelligence', 'Architecture d’entreprise (ESOA)', 'Process Mining', 'Gestion de projet avancée', 'Veille technologique'],
      },
      {
        title: 'Licence Générale en Informatique',
        issuer: 'Sorbonne Université — Bac+3',
        year: '2020',
        description: 'Licence 3 parcours DANT (Développement d’Applications — Nouvelles Technologies) effectuée en alternance chez GRTgaz.',
        modules: ['Algorithmique', 'Programmation objet (Java)', 'Programmation fonctionnelle', 'Bases de données relationnelles', 'Génie logiciel', 'Frameworks de développement web', 'Systèmes d’exploitation et programmation système', 'Réseaux', 'Data Science et Machine Learning', 'Gestion de projet'],
      },
    ],
    certifications: [
      {
        title: 'Professional Scrum Master I (PSM I)',
        issuer: 'Scrum.org',
        year: '2023',
        description: 'Atteste d’une solide maîtrise des principes Scrum et de l’aptitude à guider efficacement les équipes agiles vers le succès des projets, favorisant la collaboration et l’adaptabilité.',
      },
      {
        title: 'TOEIC — 960 / 990',
        issuer: 'ETS',
        year: '2021',
        description: 'Test standardisé d’évaluation des compétences en anglais en contexte professionnel international : compréhension orale et écrite.',
      },
    ],
  },
  contact: {
    label: 'Contact',
    title: 'Construisons quelque chose <em>d’exceptionnel</em>.',
    text: 'Un projet, une mission ou simplement une question : je réponds personnellement à chaque message.',
    location: 'Paris, France',
  },
  footer: {
    rights: 'Tous droits réservés.',
    built: 'Conçu et développé par Massil Taguemout.',
  },
};
