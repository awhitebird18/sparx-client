import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTaskStore } from '../hooks/useTaskStore';
import useFetchTasks from '../hooks/useFetchTasks';
import TaskTable from './TaskTable';
import { useStore } from '@/stores/RootStore';
import TaskTableHeader from './TaskTableHeader';
import EmptyFallback from '@/components/EmptyFallback';

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
    <div className="overflow-hidden h-full">
      <div className=" flex justify-between items-center prose dark:prose-invert p-5 mb-3">
        <h3>Tasks</h3>
        <TaskTableHeader onCreateTask={handleOpenCreateTaskModal} />
      </div>
      <div className="px-5 overflow-auto h-full">
        {taskCount ? (
          <TaskTable />
        ) : (
          <EmptyFallback
            title="No tasks Found."
            description="Add tasks to keep track of your learning goals."
          />
        )}
      </div>
    </div>
  );
});

export default TaskList;
