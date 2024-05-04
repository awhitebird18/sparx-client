import { useEffect } from 'react';
import { useTaskStore } from './useTaskStore';
import { useStore } from '@/stores/RootStore';

const useFetchTasks = () => {
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { fetchTasksApi } = useTaskStore();

  useEffect(() => {
    if (!currentWorkspaceId) return;

    const fetchData = async () => {
      await fetchTasksApi(currentWorkspaceId);
    };
    fetchData();
  }, [currentWorkspaceId, fetchTasksApi]);
};

export default useFetchTasks;
