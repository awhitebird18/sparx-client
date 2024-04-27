import Modal from '@/layout/modal/Modal';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

export type RemoveChannelModalProps = { uuid: string };

const RemoveChannelModal = observer(({ uuid }: RemoveChannelModalProps) => {
  const { removeChannelApi, findChannelByUuid } = useStore('channelStore');
  const { closeModal } = useStore('modalStore');

  const handleRemoveField = async () => {
    await removeChannelApi(uuid);

    closeModal();
  };

  const channel = findChannelByUuid(uuid);
  if (!channel) return null;

  return (
    <Modal title={`Remove ${channel.name}?`}>
      <p className="mb-6 text-muted">Are you sure you would like to remove this node?</p>

      <div className="flex gap-4">
        <Button onClick={closeModal} variant="outline" className="ml-auto">
          Cancel
        </Button>
        <Button onClick={handleRemoveField} variant="destructive">
          Confirm
        </Button>
      </div>
    </Modal>
  );
});

export default RemoveChannelModal;
