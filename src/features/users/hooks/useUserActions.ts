import { useCallback } from 'react';
import { useStore } from '@/stores/RootStore';

function useUserActions() {
  const { setCurrentUserProfileId, updateWorkspaceUserApi } = useStore('userStore');
  const { leaveWorkspaceApi, currentWorkspaceId } = useStore('workspaceStore');
  const { setMainPanel } = useStore('mainPanelStore');

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
