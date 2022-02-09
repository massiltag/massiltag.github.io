export interface Projects {
  projects: Project[];
}

export interface Project {
  preview: string;
  created_at: string;
  name: string;
  description: string;
}
