import { Base } from '@/types/base';

export interface Note extends Base {
  title?: string;
  isPrivate: boolean;
  content?: string;
  createdBy: string;
}
