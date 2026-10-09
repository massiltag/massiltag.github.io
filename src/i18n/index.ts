import { en } from './en';
import { fr } from './fr';
import type { Content, Lang } from './types';

const content: Record<Lang, Content> = { fr, en };

export const getContent = (lang: Lang): Content => content[lang];

export const pathFor = (lang: Lang): string => (lang === 'en' ? '/' : '/fr/');

export const profile = {
  name: 'Massil Taguemout',
  email: 'massil@taguemout.com',
  linkedin: 'https://www.linkedin.com/in/mtag/',
  github: 'https://github.com/massiltag',
};
