import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

const RemoveVariantModal = ({ uuid }: { uuid: string }) => {
  const { removeVariantApi } = useStore('flashcardStore');
  const { closeModal } = useStore('modalStore');

  const handleRemoveTemplate = () => {
    removeVariantApi(uuid);
    closeModal();
  };

  return (
    <Modal title="Remove variant?">
      <div className="space-y-6">
        <p>Are you sure you would like to remove this variant?</p>

        <div className="flex gap-4 justify-end">
          <Button onClick={closeModal} variant="outline">
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

export default observer(RemoveVariantModal);
