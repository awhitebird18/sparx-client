import { ChannelType } from '@/features/channels/enums';

export interface DraggedItem {
  type: string;
  id: string;
  index: number;
  channelType: ChannelType;
  sectionId: string;
}
