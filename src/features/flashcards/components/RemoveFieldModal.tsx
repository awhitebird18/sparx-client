import Modal from '@/layout/modal/Modal';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

export type RemoveFieldModalProps = { uuid: string };

const RemoveFieldModal = observer(({ uuid }: RemoveFieldModalProps) => {
  const { removeFieldApi } = useStore('flashcardStore');
  const { closeModal } = useStore('modalStore');

  const handleRemoveField = () => {
    removeFieldApi(uuid);
    closeModal();
  };

  return (
    <Modal title="Remove field?">
      <p className="mb-2 text-muted">Are you sure you would like to remove this field?</p>

      <div className="flex gap-4 ml-auto">
        <Button onClick={closeModal} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleRemoveField} variant="destructive">
          Confirm
        </Button>
      </div>
    </Modal>
  );
});

export default RemoveFieldModal;
