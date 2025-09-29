export interface WorkExperience {
  history: Work[];
}

export interface Work {
  title: string;
  employer: string;
  date: string;
  description: string;
  activities: string[];
  stack: string[];
  steps: WorkStep[];
}

export interface WorkStep {
  title: string;
  employer: string;
  date: string;
  description: string;
  activities: string[];
  stack: string[];
}