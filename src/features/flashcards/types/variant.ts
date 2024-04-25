import { Base } from '@/types/base';
import { Field } from './field';

export interface Variant extends Base {
  title: string;
  templateId?: string;
  frontFields: Field[];
  backFields: Field[];
}
