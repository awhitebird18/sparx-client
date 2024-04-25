import Modal from '@/layout/modal/Modal';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

export type DeleteNoteProps = { noteId: string };

const DeleteNote = observer(({ noteId }: DeleteNoteProps) => {
  const { closeModal } = useStore('modalStore');
  const { removeNote } = useStore('noteStore');

  const handleDelete = () => {
    removeNote(noteId);
    closeModal();
  };

  return (
    <Modal title="Confirm delete">
      <div className="flex flex-col gap-6 max-w-lg">
        <p>
          This action cannot be undone. This will permanently delete your account and remove your
          data from our servers.
        </p>
        <div className="ml-auto space-x-4">
          <Button onClick={closeModal} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="destructive">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default DeleteNote;
