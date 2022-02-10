export interface Profile {
  email: string;
  location: string;
  name: string;
  title: string;
  phone: string;
  avatar: string;
  degrees: Degree[];
  about: string;
  socials: Social[];
}

export interface Degree {
  title: string;
  year: string;
  data: string;
  content: string[];
  img: string;
}

export interface Social {
  name: string;
  link: string;
  icon: string;
}
