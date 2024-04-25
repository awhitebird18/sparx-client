import { Base } from '@/types/base';

export interface WorkspaceDetails extends Base {
  bio?: string;
  goal?: string;
  isAdmin: boolean;
  isFirstLogin: boolean;
  lastViewed: string;
  location: string;
  streakCount: number;
  website?: string;
  workspaceId: string;
}
