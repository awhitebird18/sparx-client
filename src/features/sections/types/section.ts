import { Base } from '@/types/base';
import { SortBy } from '../enums/sortBy';

export interface Section extends Base {
  name: string;
  isDefault: boolean;
  isOpen: boolean;
  emoji?: string;
  orderIndex: number;
  sortBy: SortBy;
  channelIds: string[];
}
