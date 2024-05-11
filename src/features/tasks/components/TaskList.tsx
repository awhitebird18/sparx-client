import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTaskStore } from '../hooks/useTaskStore';
import useFetchTasks from '../hooks/useFetchTasks';
import TaskTable from './TaskTable';
import { useStore } from '@/stores/RootStore';
import TaskTableHeader from './TaskTableHeader';
import EmptyFallback from '@/components/EmptyFallback';
import HeaderContainer from '@/layout/sidePanel/HeaderContainer';
import SidePanelContainer from '@/layout/sidePanel/SidePanelContainer';
import SidePanelBody from '@/layout/sidePanel/SidePanelBody';

const TaskList: React.FC = observer(() => {
  const { createTaskApi, taskCount } = useTaskStore();
  const { setActiveModal } = useStore('modalStore');
  useFetchTasks();

  const handleOpenCreateTaskModal = () => {
    setActiveModal({
      type: 'UpdateTask',
      payload: { onSubmit: createTaskApi },
    });
  };

  return (
    <SidePanelContainer>
      <HeaderContainer
        title="Tasks"
        element={<TaskTableHeader onCreateTask={handleOpenCreateTaskModal} />}
      />

      <SidePanelBody>
        {taskCount ? (
          <TaskTable />
        ) : (
          <EmptyFallback
            title="No tasks Found."
            description="Add tasks to keep track of your learning goals."
          />
        )}
      </SidePanelBody>
    </SidePanelContainer>
  );
});

export default TaskList;
