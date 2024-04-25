import { Flashcard } from '@/features/flashcards/types/card';
import { FieldValue } from '@/features/flashcards/types/fieldValue';
import { Template } from '@/features/flashcards/types/template';
import { Base } from '@/types/base';

export interface GeneratedFlashcard extends Base {
  fieldValues: FieldValue[];
  flashcards: Flashcard[];
  template: Template;
}
