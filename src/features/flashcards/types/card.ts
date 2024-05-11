import { Base } from '@/types/base';

export interface Flashcard extends Base {
  frontValues: string[];
  backValues: string[];
  createdBy: string;
  easeFactor: number;
  repetitions: number;
  nextReviewDate: string;
}
