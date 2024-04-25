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
import { useNavigate } from 'react-router-dom';

interface Props {
  task: {
    id: number;
    text: string;
    isComplete: boolean;
    dueDate: string;
    actionUrl: string;
    channelId: string;
  };
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
  dueDate: string;
}

const Task: React.FC<Props> = observer(({ task, onDelete, onComplete }) => {
  const { setActiveModal } = useStore('modalStore');
  const { setCurrentChannelUuid } = useStore('channelStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleUpdateTask = () => {
    setActiveModal({ type: 'UpdateTask', payload: { task: { ...task, dueDate: '03/08/2024' } } });
    setDropdownOpen(false);
  };

  const handleDeleteTask = () => {
    setActiveModal({ type: 'DeleteTask', payload: { task, onDelete } });
    setDropdownOpen(false);
  };

  const handleClickAction = () => {
    if (task.channelId) {
      setCurrentChannelUuid(task.channelId);
    }

    if (task.actionUrl) {
      navigate(task.actionUrl);
    }
  };

  return (
    <div className="flex gap-4 justify-between items-start">
      <div className="flex gap-6">
        <Checkbox
          onChange={() => onComplete(task.id)}
          checked={task.isComplete}
          className="h-4 w-4 border-main mt-0.5"
        />

        <div className="prose">
          <h3
            style={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}
            className="text-main text-lg font-medium leading-none"
          >
            {task.text}
          </h3>
          <p className="text-muted">Due today</p>
        </div>

        <Button onClick={handleClickAction} variant="outline-primary" className="bg-card" size="sm">
          Start Task
        </Button>
      </div>

      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger>
          <ThreeDots />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={() => handleUpdateTask()}>Update Task</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDeleteTask()}>Delete Task</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});

export default Task;
