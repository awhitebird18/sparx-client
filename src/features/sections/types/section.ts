import { Base } from '@/types/base';
import { SectionTypes } from '../enums/sectionsType';
import { SortBy } from '@/components/layout/sidebar/enums';

export interface Section extends Base {
  name: string;
  type: SectionTypes;
  isSystem: boolean;
  isOpen: boolean;
  channelIds: string[];
  emoji?: string;
  orderIndex: number;
  sortBy: SortBy;
}
