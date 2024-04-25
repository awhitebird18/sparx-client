import { Base } from '@/types/base';
import { SortBy } from '@/layout/sidebar/enums';

export interface Section extends Base {
  name: string;
  isDefault: boolean;
  isOpen: boolean;
  emoji?: string;
  orderIndex: number;
  sortBy: SortBy;
  channelIds: string[];
}
