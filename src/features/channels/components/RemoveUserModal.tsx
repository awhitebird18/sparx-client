import { useStore } from '@/stores/RootStore';

import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/Button';

import { Channel } from '@/features/channels/types';
import { User } from '@/features/users/types/user';

type RemoveUserModalProps = {
  channel: Channel;
  user: User;
};

const RemoveUserModal = ({ channel, user }: RemoveUserModalProps) => {
  const { setActiveModal } = useStore('modalStore');
  const { removeUserFromChannelApi } = useStore('channelStore');

  const handleCancel = () => {
    setActiveModal(null);
  };

  const handleConfirmRemoveUser = async () => {
    await removeUserFromChannelApi(channel.uuid, user.uuid);

    setActiveModal(null);
  };

  return (
    <Modal title={`Remove ${user.firstName} ${user.lastName} from ${channel.name}?`}>
      <>
        <p className="w-full">
          This person will no longer have access to the channel and can only rejoin by invitation.
        </p>

        <div className="flex gap-3 justify-end">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button variant="destructive" onClick={handleConfirmRemoveUser}>
            Remove
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default RemoveUserModal;
