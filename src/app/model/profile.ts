export interface Profile {
  email: string;
  location: string;
  name: string;
  title: string;
  phone: string;
  avatar: string;
  education: Education[];
  about: string;
  socials: Social[];
}

export interface Education {
  title: string;
  year: string;
  meta: string;
}

export interface Social {
  name: string;
  link: string;
  icon: string;
}
