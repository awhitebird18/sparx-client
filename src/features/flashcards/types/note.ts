import { Flashcard } from './card';
import { FieldValue } from './fieldValue';

export type Note = {
  templateId: string;
  fieldValues: FieldValue[];
  flashcards: Flashcard;
};
