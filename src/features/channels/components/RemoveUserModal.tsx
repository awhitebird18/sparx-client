import { useStore } from '@/stores/RootStore';
import Modal from '@/layout/modal/Modal';
import { Button } from '@/components/ui/Button';
import { Channel } from '@/features/channels/types';
import { User } from '@/features/users/types/user';
import { observer } from 'mobx-react-lite';

export type RemoveUserModalProps = {
  channel: Channel;
  user: User;
};

const RemoveUserModal = observer(({ channel, user }: RemoveUserModalProps) => {
  const { closeModal } = useStore('modalStore');
  const { removeUserFromChannelApi } = useStore('channelStore');

  const handleConfirmRemoveUser = async () => {
    await removeUserFromChannelApi(channel.uuid, user.uuid);
    closeModal();
  };

  return (
    <Modal title={`Remove ${user.firstName} ${user.lastName} from ${channel.name}?`}>
      <p className="w-full">
        This person will no longer have access to the channel and can only rejoin by invitation.
      </p>

      <div className="flex gap-3 justify-end">
        <Button onClick={closeModal}>Cancel</Button>
        <Button variant="destructive" onClick={handleConfirmRemoveUser}>
          Remove
        </Button>
      </div>
    </Modal>
  );
});

export default RemoveUserModal;
