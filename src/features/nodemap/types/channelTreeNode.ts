import { Channel } from '@/features/channels/types';

export interface ChannelTreeNode {
  channel: Channel;
  children: ChannelTreeNode[];
}
