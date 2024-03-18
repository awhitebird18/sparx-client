import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

const DeleteNote = ({ noteId }: { noteId: string }) => {
  const { setActiveModal } = useStore('modalStore');
  const { removeNote } = useStore('noteStore');

  const handleCancel = () => {
    setActiveModal(null);
  };

  const handleDelete = () => {
    removeNote(noteId);
    setActiveModal(null);
  };

  return (
    <Modal title="Confirm delete">
      <div className="flex flex-col gap-6 max-w-lg">
        <p>
          This action cannot be undone. This will permanently delete your account and remove your
          data from our servers.
        </p>
        <div className="ml-auto space-x-4">
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="destructive">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default observer(DeleteNote);
