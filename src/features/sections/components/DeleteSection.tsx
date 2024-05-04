import { useStore } from '@/stores/RootStore';
import { Button } from '@/components/ui/Button';
import Modal from '@/layout/modal/Modal';
import { observer } from 'mobx-react-lite';

export type Props = { sectionId: string; name: string };

const DeleteSection = observer(({ sectionId, name }: Props) => {
  const { removeSectionApi } = useStore('sectionStore');
  const { closeModal } = useStore('modalStore');

  async function handleDelete() {
    await removeSectionApi(sectionId);
    closeModal();
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
          <Button className="w-28" onClick={closeModal}>
            Cancel
          </Button>
          <Button className="w-28" onClick={handleDelete} variant="destructive">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default DeleteSection;
