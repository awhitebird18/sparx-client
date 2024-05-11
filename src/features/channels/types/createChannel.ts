export interface CreateChannel {
  name: string;
  isPrivate?: boolean;
  isDefault?: boolean;
  x?: number;
  y?: number;
  parentChannelId?: string;
}
