import { Base } from '@/types/base';

export interface Workspace extends Base {
  name: string;
  imgUrl?: string;
  lastViewed: string;
  isPrivate: boolean;
  allowInvites: boolean;
}
