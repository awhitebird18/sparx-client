import { Base } from '@/types/base';
import { SortBy } from '@/components/layout/sidebar/enums';
import { ChannelType } from '@/features/channels/enums';

export interface Section extends Base {
  name: string;
  type: ChannelType;
  isSystem: boolean;
  isOpen: boolean;
  channelIds: string[];
  emoji?: string;
  orderIndex: number;
  sortBy: SortBy;
}
