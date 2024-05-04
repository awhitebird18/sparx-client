import { useCallback, useEffect } from 'react';
import { useStore } from '@/stores/RootStore';
import { Privileges } from '../enums/privileges';

function useUserActions() {
  const {
    setIsLoading,
    setCurrentUserProfileId,
    updateWorkspaceUserApi,
    fetchChannelUserIdsApi,
    setPrivilegesFilter,
    setSearchValue,
  } = useStore('userStore');
  const { leaveWorkspaceApi, currentWorkspaceId } = useStore('workspaceStore');
  const { setMainPanel } = useStore('mainPanelStore');
  const { currentChannelId } = useStore('channelStore');

  useEffect(() => {
    if (!currentChannelId) return;
    const fetchUsers = async () => {
      setIsLoading(true);
      await fetchChannelUserIdsApi(currentChannelId);
      setIsLoading(false);
    };

    fetchUsers();
    return () => {
      setIsLoading(false);
      setPrivilegesFilter(Privileges.ALL);
      setSearchValue('');
    };
  }, [currentChannelId, fetchChannelUserIdsApi, setPrivilegesFilter, setSearchValue, setIsLoading]);

  const handleViewUserProfile = useCallback(
    (userId: string) => {
      setCurrentUserProfileId(userId);
      setMainPanel({ type: 'profile' });
    },
    [setCurrentUserProfileId, setMainPanel],
  );

  const handleSetAdmin = useCallback(
    async (userId: string, isAdmin: boolean) => {
      await updateWorkspaceUserApi(userId, { isAdmin });
    },
    [updateWorkspaceUserApi],
  );

  const handleRemoveFromWorkspace = useCallback(
    async (userId: string) => {
      if (!currentWorkspaceId) return;
      await leaveWorkspaceApi(userId, currentWorkspaceId);
    },
    [leaveWorkspaceApi, currentWorkspaceId],
  );

  return { handleViewUserProfile, handleSetAdmin, handleRemoveFromWorkspace };
}

export default useUserActions;
