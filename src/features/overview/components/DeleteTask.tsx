import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/Button';

const DeleteTask = ({ task, onDelete }: { task: any; onDelete: any }) => {
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
