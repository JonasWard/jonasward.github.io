export type Info = {
  name: string;
  firstName: string;
  placeOfBirth: string;
  dateOfBirth: string;
  telephone: string;
  email: string;
  website: string;
  github: string;
  linkedin: string;
  addressLine1: string;
  addressLine2: string;
};

export type Education = {
  [key: string]: {
    name: string;
    place: string;
    date: string;
    description: string;
  };
};

export type Experience = {
  [key: string]: {
    company: string;
    position: string;
    role: string;
    date: string;
    location: string;
    projects: List;
  };
};

export type List = { [key: string]: string };
export type NestedList = { [key: string]: List };

export type Skills = { [key: string]: { [key: string]: List | NestedList } };

export type CVData = {
  info: Info;
  education: Education;
  experience: Experience;
  skills: Skills;
  extraCurricular: { [key: string]: string };
};
