import { Button } from '@/components/ui/Button';
import { useTaskStore } from '../hooks/useTaskStore';
import { observer } from 'mobx-react-lite';

type Props = {
  onCreateTask: () => void;
};

const TaskTableHeader = observer(({ onCreateTask }: Props) => {
  const { isLoading } = useTaskStore();
  return (
    <div className="flex justify-between items-center prose">
      <Button onClick={onCreateTask} className="w-full" size="sm" disabled={isLoading}>
        Add task
      </Button>
    </div>
  );
});

export default TaskTableHeader;
