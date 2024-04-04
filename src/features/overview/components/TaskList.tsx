import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  ArrowLeftCircle,
  Check2Circle,
  Pencil,
  Plus,
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
import taskApi from '@/features/overview/api';
import { Badge } from '@/components/ui/Badge';

interface TaskType {
  uuid: string;
  name: string;
  isComplete: boolean;
  dueDate: string;
  actionUrl: string;
  channelId: string;
}

const TaskList: React.FC = () => {
  const { setActiveModal } = useStore('modalStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  useEffect(() => {
    if (!currentWorkspaceId) return;

    const fn = async () => {
      const minimumLoadingTimePromise = new Promise((resolve) => setTimeout(resolve, 400));

      const [tasks] = await Promise.all([
        taskApi.getTasks(currentWorkspaceId),
        minimumLoadingTimePromise,
      ]);

      setTasks(tasks);
      setIsLoading(false);
    };

    fn();
  }, [currentWorkspaceId]);

  const deleteTask = async (taskId: string) => {
    if (!currentWorkspaceId) return;

    await taskApi.removeTask(taskId, currentWorkspaceId);

    setTasks(tasks.filter((task) => task.uuid !== taskId));
    setActiveModal(null);
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
    const onSubmit = async (task: any) => {
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
  const handleUpdateTask = async (task: TaskType) => {
    const onSubmit = async (task: any) => {
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
  const handleDeleteTask = (task: TaskType) => {
    setActiveModal({
      type: 'DeleteTask',
      payload: {
        task,
        onDelete: () => {
          deleteTask(task.uuid);
          setActiveModal(null);
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
          <span className="flex items-center gap-3 text-main font-medium">{value}</span>
        ),
      },
      {
        Header: 'Due date',
        accessor: 'dueDate',
        Cell: ({ value }: { value: string }) => (
          <span className="">{dayjs(value).format('MMMM D')}</span>
        ),
      },
      {
        Header: 'Updated on',
        accessor: 'updatedAt',
        Cell: ({ row, value }: { value: Date; row: any }) => {
          return <span className="">{dayjs(value ? value : row.createdAt).format('MMMM D')}</span>;
        },
      },

      {
        Header: 'Status',
        accessor: 'isComplete',
        Cell: ({ value }: { value: any }) => (
          <Badge variant={`${value ? 'success' : 'default'}`} className="w-24 h-6 items-center">
            {value ? 'Complete' : 'In progress'}
          </Badge>
        ),
      },
      {
        id: 'actions', // It's a good practice to give an ID for reference
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
    <div className="flex flex-col card w-full gap-3 h-full overflow-hidden">
      <div className="flex justify-between items-center prose">
        <h3 className="text-main">Tasks</h3>
        <Button
          onClick={createTask}
          size="icon"
          className="w-7 h-7 rounded-md"
          disabled={isLoading}
        >
          <Plus className="text-3xl" />
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
};

export default TaskList;
