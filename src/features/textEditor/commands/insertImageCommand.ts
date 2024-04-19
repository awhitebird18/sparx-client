import { LexicalCommand, createCommand } from 'lexical';
import { InsertImagePayload } from '../plugins/ImagePlugin';

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
  createCommand('INSERT_IMAGE_COMMAND');
