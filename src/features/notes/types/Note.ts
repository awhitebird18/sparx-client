export interface Note {
  uuid: string;
  title?: string;
  content?: string;
  createdBy: string;
  channelId: string;
  createdAt: Date;
  updatedAt?: Date;
  isPrivate: boolean;
}
