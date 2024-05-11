import Modal from '@/layout/modal/Modal';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

export type RemoveTemplateModalProps = { uuid: string };

const RemoveTemplateModal = observer(({ uuid }: RemoveTemplateModalProps) => {
  const { removeTemplateApi } = useStore('flashcardStore');
  const { closeModal } = useStore('modalStore');

  const handleRemoveTemplate = () => {
    removeTemplateApi(uuid);
    closeModal();
  };

  return (
    <Modal title="Remove field?" className="space-y-6">
      <p>Are you sure you would like to remove this template?</p>

      <div className="flex gap-4 justify-end">
        <Button onClick={closeModal} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleRemoveTemplate} variant="destructive">
          Submit
        </Button>
      </div>
    </Modal>
  );
});

export default RemoveTemplateModal;
