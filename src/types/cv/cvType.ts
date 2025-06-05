export type Info = {
  name: string;
  firstName: string;
  placeOfBirth: string;
  citizenship: string;
  titles: string;
  dateOfBirth: string;
  telephone: string;
  email: string;
  website: [string, string];
  github: [string, string];
  linkedin: [string, string];
  addressLine1: string;
  addressLine2: string;
};

export type Education = {
  name: string;
  place: string;
  date: string;
  description: string;
}[];

export type Experience = {
  company: string;
  position: string;
  role: string;
  date: string;
  location: string;
  projects: { [key: string]: string | [string, string] };
}[];

export type List = { [key: string]: string | [string, string] } | string[];
export type NestedList = { [key: string]: List };

export type Skills = { [key: string]: { [key: string]: List | NestedList } };

export type CVData = {
  tagline: string[];
  info: Info;
  education: Education;
  experience: Experience;
  skills: Skills;
  extraCurricular: { [key: string]: string | [string, string] };
  pipeline?: { [key: string]: string };
};
