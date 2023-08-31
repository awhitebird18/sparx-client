import { useStore } from '@/stores/RootStore';

import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/Button';

import { Channel } from '../types';

const ConfirmChannelChangeModal = ({ channel }: { channel: Channel }) => {
  const { updateChannelApi } = useStore('channelStore');
  const { setActiveModal } = useStore('modalStore');

  const handleUpdateChannel = async () => {
    await updateChannelApi(channel.uuid, { isPrivate: true });

    setActiveModal(null);
  };

  const handleCancel = () => {
    setActiveModal(null);
  };

  return (
    <Modal title="Change to a private channel?">
      <div className="flex flex-col">
        <p>
          {`Are you sure you want to make ${channel.name.toUpperCase()} into a private channel?`}{' '}
        </p>
        <p className="mb-10">Once a channel is made private, it cannot be made public.</p>

        <div className="flex gap-2 justify-end">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button variant="destructive" onClick={handleUpdateChannel}>
            Change to Private
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmChannelChangeModal;
