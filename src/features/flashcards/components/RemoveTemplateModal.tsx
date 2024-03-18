import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

const RemoveTemplateModal = ({ uuid }: { uuid: string }) => {
  const { removeTemplateApi } = useStore('flashcardStore');
  const { setActiveModal } = useStore('modalStore');

  const handleRemoveTemplate = () => {
    removeTemplateApi(uuid);
    setActiveModal(null);
  };

  const handleCancel = () => {
    setActiveModal(null);
  };

  return (
    <Modal title="Remove field?">
      <div className="space-y-6">
        <p>Are you sure you would like to remove this template?</p>

        <div className="flex gap-4 justify-end">
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleRemoveTemplate} variant="destructive">
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default observer(RemoveTemplateModal);
