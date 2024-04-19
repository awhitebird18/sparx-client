import Modal from '@/layout/modal/Modal';
import { Button } from '@/components/ui/Button';

type Props = { task: any; onDelete: (id: any) => void };

const DeleteTask = ({ onDelete }: Props) => {
  return (
    <Modal title={`Delete task?`}>
      <div className="flex flex-col space-y-8 w-80">
        <p>Once deleted, there is no going back.</p>

        <Button variant="destructive" onClick={onDelete} className="ml-auto">
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteTask;
