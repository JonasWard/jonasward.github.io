export type Info = {
  name: string;
  firstName: string;
  placeOfBirth?: string;
  citizenship: string;
  titles: string;
  dateOfBirth?: string;
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

export type ExperienceContent = {
  company: string;
  position: string;
  role: string;
  date: string;
  location: string;
  projects: List;
};

export type Experience = ExperienceContent[];

export type SkillContent = {
  header: string;
  subSkills: List;
};

export type ListContent = string | string[];
export type List = { [key: string]: ListContent };
export type NestedList = { [key: string]: List };

export type Skills = SkillContent[];

export type CVData = {
  cvName: string;
  tagline: string[];
  info: Info;
  education: Education;
  experience: Experience;
  skills: Skills;
  extraCurricular: List;
  pipeline?: { [key: string]: string };
};
