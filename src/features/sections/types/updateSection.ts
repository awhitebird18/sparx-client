import { SortBy } from '../enums/sortBy';

export interface UpdateSection {
  name?: string;
  isOpen?: boolean;
  channelIds?: string[];
  emoji?: string;
  orderIndex?: number;
  sortBy?: SortBy;
}
