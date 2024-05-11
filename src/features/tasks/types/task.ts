import { Base } from '@/types/base';

export interface Task extends Base {
  dueDate: string;
  isComplete: boolean;
  name: string;
}
