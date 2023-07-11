import { BaseEntity } from '@/types';
import { SectionTypes } from './sectionEnums';
import { Channel } from '@/features/channels';

export interface CreateSection {
  name: string;
  type: SectionTypes;
}

export interface Section extends BaseEntity {
  name: string;
  type: SectionTypes;
  userId?: string;
  isSystem: boolean;
  channels: Channel[];
  emoji?: string;
}

export type UpdateSection = Partial<Section>;
