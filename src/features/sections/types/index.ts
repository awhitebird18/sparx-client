import { SectionTypes } from './sectionEnums';

export interface CreateSection {
  name: string;
  type: SectionTypes;
}

export interface Section extends CreateSection {
  uuid: string;
  userId?: string;
  isSystem?: boolean;
}

export type UpdateSection = Partial<Section>;
