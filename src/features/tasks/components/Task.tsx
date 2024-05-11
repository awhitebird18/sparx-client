import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { ThreeDots } from 'react-bootstrap-icons';
import { Task as TaskType } from '../types/task';
import { useTaskStore } from '../hooks/useTaskStore';

interface Props {
  task: TaskType;
}

const Task: React.FC<Props> = observer(({ task }) => {
  const { setActiveModal } = useStore('modalStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { updateTaskApi, removeTaskApi } = useTaskStore();

  const handleShowUpdateTaskModal = () => {
    setActiveModal({
      type: 'UpdateTask',
      payload: { task, onSubmit: (name: string) => updateTaskApi(task.uuid, { name }) },
    });
    setDropdownOpen(false);
  };

  const handleShowRemoveTaskModal = () => {
    setActiveModal({
      type: 'DeleteTask',
      payload: { task, onDelete: () => removeTaskApi(task.uuid) },
    });
    setDropdownOpen(false);
  };

  return (
    <div className="flex gap-4 justify-between items-start">
      <div className="flex gap-6">
        <Checkbox
          onChange={() => updateTaskApi(task.uuid, { isComplete: !task.isComplete })}
          checked={task.isComplete}
          className="h-4 w-4 border-main mt-0.5"
        />

        <div className="prose">
          <h3
            style={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}
            className="text-main text-lg font-medium leading-none"
          >
            {task.name}
          </h3>
          <p className="text-muted">Due today</p>
        </div>

        <Button variant="outline-primary" className="bg-card" size="sm">
          Start Task
        </Button>
      </div>

      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger>
          <ThreeDots />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={handleShowUpdateTaskModal}>Update Task</DropdownMenuItem>
          <DropdownMenuItem onClick={handleShowRemoveTaskModal}>Delete Task</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});

export default Task;
