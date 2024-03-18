import { CompletionStatus } from '@/features/channels/enums/completionStatus';

export interface SubscriptionDetails {
  userId: string;
  status: CompletionStatus;
  isAdmin: boolean;
}
