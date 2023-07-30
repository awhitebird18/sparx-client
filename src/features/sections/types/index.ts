import { BaseEntity } from '@/types';
import { SectionTypes } from './sectionEnums';
import { Channel } from '@/features/channels';
import { SortBy } from '@/components/layout/sidebar/types';

export interface CreateSection {
  name: string;
}

export interface Section extends BaseEntity {
  name: string;
  type: SectionTypes;
  userId?: string;
  isSystem: boolean;
  isOpen: boolean;
  channels: Channel[];
  emoji?: string;
  uuid: string;
  orderIndex: number;
  sortBy: SortBy;
}

export type UpdateSection = Partial<Section>;
