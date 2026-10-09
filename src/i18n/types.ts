export type Lang = 'fr' | 'en';

export interface Mission {
  title: string;
  employer: string;
  date: string;
  /** May contain trusted inline HTML (<br>, <b>) */
  description: string;
  /** May contain trusted inline HTML (<b>, <ul>) */
  activities: string[];
  stack: string[];
}

export interface Job extends Mission {
  missions?: Mission[];
}

export interface Project {
  name: string;
  year: string;
  description: string;
  link?: string;
  linkKind?: 'github' | 'appstore';
  disabled?: boolean;
}

export interface Credential {
  title: string;
  issuer: string;
  year: string;
  description: string;
  modules?: string[];
}

export interface Content {
  meta: { title: string; description: string };
  nav: { about: string; experience: string; projects: string; education: string; contact: string };
  ui: {
    sound: string;
    soundOn: string;
    soundOff: string;
    scroll: string;
    details: string;
    viewCode: string;
    viewAppStore: string;
    otherLanguage: string;
    loading: string;
    skipToContent: string;
  };
  hero: { eyebrow: string; tagline: string };
  about: {
    label: string;
    title: string;
    paragraphs: string[];
    stats: { value: string; label: string }[];
    portraitAlt: string;
  };
  experience: { label: string; title: string; intro: string; jobs: Job[] };
  projects: { label: string; title: string; intro: string; items: Project[] };
  education: { label: string; title: string; degreesTitle: string; certificationsTitle: string; degrees: Credential[]; certifications: Credential[] };
  contact: { label: string; title: string; text: string; location: string };
  footer: { rights: string; built: string };
}
