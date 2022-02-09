export interface WorkExperience {
  work: Work[];
}

export interface Work {
  date: string;
  title: string;
  description: string;
  stack: string[];
}
