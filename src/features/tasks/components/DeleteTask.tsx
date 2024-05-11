import Modal from '@/layout/modal/Modal';
import { Button } from '@/components/ui/Button';
import { Task } from '../types/task';

export type Props = { task: Task; onDelete: () => void };

const DeleteTask = ({ onDelete }: Props) => (
  <Modal title={`Delete task?`} className="flex flex-col space-y-8 w-80">
    <p>Once deleted, there is no going back.</p>

    <Button variant="destructive" onClick={onDelete} className="ml-auto">
      Confirm
    </Button>
  </Modal>
);

export default DeleteTask;
