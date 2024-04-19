import { useStore } from '@/stores/RootStore';

import { Button } from '@/components/ui/Button';
import Modal from '@/layout/modal/Modal';

export type DeleteSectionProps = { id: string; name: string };

const DeleteSection = ({ id, name }: DeleteSectionProps) => {
  const { removeSectionApi } = useStore('sectionStore');
  const { setActiveModal } = useStore('modalStore');

  async function handleDelete() {
    await removeSectionApi(id);

    setActiveModal(null);
  }

  function handleCancel() {
    setActiveModal(null);
  }

  return (
    <Modal title="Delete this section?">
      <div className="space-y-8 flex flex-col max-w-lg">
        <p>
          {`Conversations in ${name} will move back to the Channels and Direct messages sections
          in your sidebar.`}
        </p>
        <p>
          And don’t worry — you won’t be removed from any channels when you delete this section.
        </p>

        <div className="flex ml-auto gap-2">
          <Button className="w-28" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="w-28" onClick={handleDelete} variant="destructive">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteSection;
