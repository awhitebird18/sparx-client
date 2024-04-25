import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  ArrowLeftCircle,
  Check,
  Check2Circle,
  Pencil,
  Play,
  ThreeDots,
  Trash,
} from 'react-bootstrap-icons';
import { useStore } from '@/stores/RootStore';
import dayjs from 'dayjs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import Table from '@/components/ui/Table';
import taskApi from '@/features/tasks/api';
import { Badge } from '@/components/ui/Badge';
import { observer } from 'mobx-react-lite';
import { CreateTask } from '../types/createTask';
import { Task } from '../types/task';

const TaskList: React.FC = observer(() => {
  const { setActiveModal, closeModal } = useStore('modalStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  useEffect(() => {
    if (!currentWorkspaceId) return;

    const fn = async () => {
      const tasks = await taskApi.getTasks(currentWorkspaceId);

      setTasks(tasks);
      setIsLoading(false);
    };

    fn();
  }, [currentWorkspaceId]);

  const deleteTask = async (taskId: string) => {
    if (!currentWorkspaceId) return;

    await taskApi.removeTask(taskId, currentWorkspaceId);

    setTasks(tasks.filter((task) => task.uuid !== taskId));
    closeModal();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const completeTask = async (taskId: string) => {
    if (!currentWorkspaceId) return;
    await taskApi.toggleComplete(taskId, currentWorkspaceId);

    setTasks(
      tasks.map((task) =>
        task.uuid === taskId ? { ...task, isComplete: !task.isComplete } : task,
      ),
    );
  };

  const createTask = () => {
    const onSubmit = async (task: CreateTask) => {
      if (!currentWorkspaceId) return;

      const newTask = await taskApi.createTask({ ...task, workspaceId: currentWorkspaceId });

      setTasks((prev) => {
        const copy = [...prev];
        copy.push(newTask);
        return copy;
      });
    };

    setActiveModal({
      type: 'UpdateTask',
      payload: { onSubmit },
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUpdateTask = async (task: Task) => {
    const onSubmit = async (task: Task) => {
      if (!currentWorkspaceId) return;

      const updatedTask = await taskApi.updateTask(task.uuid, currentWorkspaceId, task);
      setTasks(tasks.map((task) => (task.uuid === updatedTask.uuid ? updatedTask : task)));
    };
    setActiveModal({
      type: 'UpdateTask',
      payload: { task: { ...task, dueDate: '03/08/2024' }, onSubmit },
    });

    setActiveDropdownId(null);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDeleteTask = (task: Task) => {
    setActiveModal({
      type: 'DeleteTask',
      payload: {
        task,
        onDelete: () => {
          deleteTask(task.uuid);
          closeModal();
        },
      },
    });

    setActiveDropdownId(null);
  };

  const columns: any = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ value }: { value: string }) => (
          <div className=" max-w-[7rem] truncate">
            <p className="items-center gap-3 text-main font-medium truncate text-sm">{value}</p>
          </div>
        ),
      },
      {
        Header: 'Due date',
        accessor: 'dueDate',
        Cell: ({ value }: { value: string }) => (
          <span className="text-sm">{dayjs(value).format('MMM D')}</span>
        ),
      },
      {
        Header: 'Updated on',
        accessor: 'updatedAt',
        Cell: ({ row, value }: { value: Date; row: any }) => {
          return (
            <span className="text-sm">{dayjs(value ? value : row.createdAt).format('MMM D')}</span>
          );
        },
      },

      {
        Header: 'Status',
        accessor: 'isComplete',
        Cell: ({ value }: { value: any }) => (
          <Badge variant={`${value ? 'success' : 'default'}`} className="w-6 h-6 p-0 items-center">
            {value ? <Check size={16} /> : <Play size={16} />}
          </Badge>
        ),
      },
      {
        id: 'actions',
        Cell: ({ row }: { row: any }) => {
          const { uuid, isComplete } = row.original;

          return (
            <DropdownMenu
              open={activeDropdownId === uuid}
              onOpenChange={() => setActiveDropdownId(activeDropdownId ? null : uuid)}
            >
              <DropdownMenuTrigger className="w-6" onClick={(e) => e.stopPropagation()}>
                <ThreeDots />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-fit"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <DropdownMenuItem
                  onClick={() => completeTask(uuid)}
                  className={`gap-3 h-9 pr-6 text-emerald-500 ${
                    isComplete ? 'text-primary' : 'text-emerald-500'
                  }`}
                >
                  {isComplete ? (
                    <>
                      <ArrowLeftCircle size={16} /> Set as in progress
                    </>
                  ) : (
                    <>
                      <Check2Circle className="text-emerald-500" size={16} /> Set as Complete
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleUpdateTask(row.original)}
                  className="gap-3 h-9 pr-6"
                >
                  <Pencil size={15} className="text-secondary" /> Update Task
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDeleteTask(uuid)} className="gap-3 h-9 pr-6">
                  <Trash size={15} className="text-secondary" /> Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [activeDropdownId, completeTask, handleDeleteTask, handleUpdateTask],
  );

  return (
    <div className="h-full card w-full space-y-4">
      <div className="flex justify-between items-center prose">
        <Button
          onClick={createTask}
          size="sm"
          className="h-8 rounded-md ml-auto"
          disabled={isLoading}
        >
          Add task
        </Button>
      </div>
      <Table
        columns={columns}
        data={tasks}
        isLoading={isLoading}
        emptyElement={
          <div className="flex flex-col gap-5 max-w-sm items-center justify-center prose py-6">
            <h3 className="text-center text-main text-xl">No tasks to show.</h3>
            <p className="text-center text-secondary flex-items-center">
              Add tasks to keep track of your learning goals.
            </p>
            <Button size="sm" className="w-fit" onClick={createTask}>
              Add a new task
            </Button>
          </div>
        }
      />
    </div>
  );
});

export default TaskList;
