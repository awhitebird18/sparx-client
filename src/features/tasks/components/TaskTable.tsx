import React from 'react';
import dayjs from 'dayjs';
import Table from '@/components/ui/Table';
import TaskActionsDropdown from './TaskActionsDropdown';
import { Column } from 'react-table';
import { Task } from '../types/task';
import { TaskData } from '../types/taskTableData';
import { useTaskStore } from '../hooks/useTaskStore';
import { observer } from 'mobx-react-lite';
import { Checkbox } from '@/components/ui/Checkbox';
import { Badge } from '@/components/ui/Badge';

const TaskTable = observer(() => {
  const { isLoading, tasks, toggleTaskApi } = useTaskStore();

  const columns: Column<TaskData>[] = React.useMemo(
    () => [
      {
        accessor: 'isComplete',
        Cell: ({ row, value }: { row: { original: TaskData }; value: boolean }) => {
          const task = row.original;

          return (
            <Checkbox
              checked={value}
              onClick={() => {
                toggleTaskApi(task.uuid);
              }}
              className="w-4 h-4 mt-1.5"
            />
          );
        },
        width: 60,
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ row, value }: { row: { original: TaskData }; value: string }) => {
          const task = row.original;

          return (
            <p
              className={`${
                task.isComplete && 'line-through'
              } text-main font-medium truncate text-sm`}
            >
              {value}
            </p>
          );
        },
        width: 200,
      },
      {
        Header: 'Type',
        accessor: 'type',
        Cell: ({ value }: { value: string }) => {
          return <Badge className="rounded-md">{value}</Badge>;
        },
        width: 120,
      },
      {
        Header: 'Due',
        accessor: 'dueDate',
        Cell: ({ value }: { value: string }) => (
          <span className="text-sm text-main">{dayjs(value).format('MMM D')}</span>
        ),
        width: 120,
      },

      {
        id: 'actions',
        Cell: ({ row }: { row: { original: TaskData } }) => {
          const task = row.original;
          return <TaskActionsDropdown task={task} />;
        },
        width: 60,
      },
    ],
    [toggleTaskApi],
  );

  return <Table<Task, TaskData> columns={columns} data={tasks} isLoading={isLoading} />;
});

export default TaskTable;
