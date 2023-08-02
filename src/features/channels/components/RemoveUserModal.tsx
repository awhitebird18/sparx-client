import Modal from '@/components/modal/Modal';
import { Channel } from '..';
import { User } from '@/features/users';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { removeUserApi } from '../api/removeUserApi';

type RemoveUserModalProps = {
  channel: Channel;
  user: User;
};

const RemoveUserModal = ({ channel, user }: RemoveUserModalProps) => {
  const { setActiveModal } = useStore('modalStore');
  const { updateSubscribedChannel } = useStore('channelStore');

  const handleCancel = () => {
    setActiveModal(null);
  };

  const handleConfirmRemoveUser = async () => {
    const updatedChannel = await removeUserApi(channel.uuid, user.uuid);

    await updateSubscribedChannel(updatedChannel.uuid, { users: updatedChannel.users });
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
