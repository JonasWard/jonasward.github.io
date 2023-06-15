import { Keywords, ProjectContext, ProjectPartnerContext, ProjectType } from '../../enums';

export type ProjectMetaData = {
  id: string;
  webstring: string;
  name: string;
  projectType: ProjectType;
  description: string;
  keyImage?: string;
  keywords: Keywords[];
  projectContext: ProjectContext;
  projectPartnerContext: ProjectPartnerContext;
  projectParners: string[];
};

export type ProjectData = {
  id: string;
  metaData: ProjectMetaData;
  projectCard: React.ReactNode;
  projectPage: React.ReactNode;
  projectPageImage: string;
};
