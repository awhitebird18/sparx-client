import { Channel, ChannelSubscription, ChannelUnread } from '@/features/channels/types';
import { UserPreferences } from '@/features/preferences/types';
import { Section } from '@/features/sections/types';
import { UserStatus } from '@/features/userStatus/types';
import { User } from '@/features/users/types';
import { Workspace } from '@/features/workspaces/types/workspace';
import { WorkspaceDetails } from '@/features/workspaces/types/workspaceDetails';
import { axios } from '@/lib/axios';
import { handleApiError } from '@/utils/handleApiError';

type FullReturnValue = {
  currentUser: User;
  users: User[];
  userPreferences: UserPreferences;
  sections: Section[];
  channels: Channel[];
  channelUnreads: ChannelUnread[];
  userStatuses: UserStatus[];
  workspaces: Workspace[];
  userWorkspaces: WorkspaceDetails[];
  channelSubscriptions: ChannelSubscription[];
};

type AlternativeReturnValue = { users: User[]; currentUser: User };

type MinimalExpectedType = {
  currentUser?: User;
  users?: User[];
};

export function isFullReturnValue(value: MinimalExpectedType): value is FullReturnValue {
  return value && 'workspaces' in value;
}

export const verify = async (): Promise<FullReturnValue | AlternativeReturnValue> => {
  try {
    const { data } = await axios.get('/auth/client-boot');

    return data;
  } catch (err) {
    return handleApiError(err);
  }
};
