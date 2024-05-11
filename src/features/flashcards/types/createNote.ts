import { FieldValue } from './fieldValue';

export interface CreateNote {
  templateId: string;
  fieldValues: FieldValue[];
  currentChannelId: string;
  workspaceId: string;
}
