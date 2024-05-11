import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { ArrowLeftCircle, Check2Circle, Pencil, ThreeDots, Trash } from 'react-bootstrap-icons';
import { useStore } from '@/stores/RootStore';
import { useTaskStore } from '../hooks/useTaskStore';
import { UpdateTask } from '../types/updateTask';
import { TaskData } from '../types/taskTableData';

type Props = {
  task: TaskData;
};

const TaskActionsDropdown = ({ task }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const { removeTaskApi, updateTaskApi, toggleTaskApi } = useTaskStore();
  const { setActiveModal } = useStore('modalStore');

  const toggleOpen = () => setOpen((prev) => !prev);

  const handleUpdateTask = async () => {
    setActiveModal({
      type: 'UpdateTask',
      payload: {
        task,
        onSubmit: (updateFields: UpdateTask) => updateTaskApi(task.uuid, updateFields),
      },
    });
    setOpen(false);
  };

  const handleDeleteTask = () => {
    setActiveModal({
      type: 'DeleteTask',
      payload: {
        task,
        onDelete: () => removeTaskApi(task.uuid),
      },
    });
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={toggleOpen}>
      <DropdownMenuTrigger
        className="justify-center items-center p-1"
        onClick={(e) => e.stopPropagation()}
      >
        <ThreeDots />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onClick={(e) => e.stopPropagation()}
        className="space-y-1 p-2"
      >
        <DropdownMenuItem onClick={() => toggleTaskApi(task.uuid)} className="gap-3">
          {task.isComplete ? (
            <>
              <ArrowLeftCircle size={16} /> Set as in progress
            </>
          ) : (
            <>
              <Check2Circle className="text-emerald-500" size={16} /> Set as Complete
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator className="mx-1" />
        <DropdownMenuItem onClick={handleUpdateTask} className="gap-3">
          <Pencil size={15} className="text-secondary" /> Update Task
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteTask} className="gap-3">
          <Trash size={15} className="text-secondary" /> Delete Task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskActionsDropdown;
