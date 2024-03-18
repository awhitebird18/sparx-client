import { Base } from '@/types/base';
import { Field } from './Field';

export interface Variant extends Base {
  title: string;
  templateId?: string;
  frontFields: Field[];
  backFields: Field[];
}
