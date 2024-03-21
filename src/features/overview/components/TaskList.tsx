import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, ThreeDots } from 'react-bootstrap-icons';
import { useStore } from '@/stores/RootStore';
import dayjs from 'dayjs';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useNavigate } from 'react-router-dom';
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
  const { setCurrentChannelUuid } = useStore('channelStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

      const updatedTask = await taskApi.createTask({ ...task, workspaceId: currentWorkspaceId });
      setTasks(tasks.map((task) => (task.uuid === updatedTask.uuid ? updatedTask : task)));
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
    setDropdownOpen(false);
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
    setDropdownOpen(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickAction = async (task: TaskType) => {
    setCurrentChannelUuid(task.channelId);

    if (task.actionUrl) {
      navigate(task.actionUrl);
    }
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
          const { dueDate } = row.original;

          return <span className="">{dayjs(value ? value : row.createdAt).format('MMMM D')}</span>;
        },
      },
      // {
      //   Header: 'Action',
      //   id: 'action',
      //   Cell: ({ row }: { row: any }) => (
      //     <Button
      //       onClick={() => handleClickAction(row.original)}
      //       variant="outline-primary"
      //       className="bg-card"
      //       size="sm"
      //     >
      //       Start Task
      //     </Button>
      //   ),
      // },
      {
        Header: 'Status',
        accessor: 'isComplete',
        Cell: ({ value }: { value: any }) => (
          <Badge variant={`${value ? 'default' : 'outline'}`} className="w-24 h-6 items-center">
            {value ? 'Complete' : 'In progress'}
          </Badge>
        ),
      },
      {
        id: 'actions', // It's a good practice to give an ID for reference
        Cell: ({ row }: { row: any }) => {
          const { uuid } = row.original;

          return (
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger className="w-6">
                <ThreeDots />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => completeTask(uuid)}>
                  Toggle Complete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUpdateTask(row.original)}>
                  Update Task
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDeleteTask(uuid)}>
                  Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [completeTask, dropdownOpen, handleDeleteTask, handleUpdateTask],
  );

  return (
    <div className="card w-full space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-main">Tasks</h3>
        <Button onClick={createTask} size="icon" className="w-7 h-7">
          <Plus className="text-3xl" />
        </Button>
      </div>

      <div className="space-y-3">
        <Table
          columns={columns}
          data={tasks}
          headerClasses="h-16"
          rowClasses="h-16"
          isLoading={isLoading}
        />
        {!tasks.length && (
          <div className="flex flex-col gap-3 w-full items-center bg-card card rounded-xl p-6 border border-border shadow">
            <h3 className="text-main leading-none">No tasks to show.</h3>
            <p className="text-secondary mb-3 leading-none">
              Add tasks to keep track of your learning goals.
            </p>
            <Button size="sm" className="w-fit" onClick={createTask}>
              Add a new task
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
