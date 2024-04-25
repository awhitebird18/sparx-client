import { SortBy } from '@/layout/sidebar/enums';

export interface UpdateSection {
  name?: string;
  isOpen?: boolean;
  channelIds?: string[];
  emoji?: string;
  orderIndex?: number;
  sortBy?: SortBy;
}
