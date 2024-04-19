import Modal from '@/layout/modal/Modal';
import { useStore } from '@/stores/RootStore';
import Users from './Users';
import { observer } from 'mobx-react-lite';

const UsersModal = observer(() => {
  const { currentChannel } = useStore('channelStore');

  return (
    <Modal title={`${currentChannel?.name} members`} disablePadding>
      <div className="w-[85vw] h-[85vh]">
        <Users />
      </div>
    </Modal>
  );
});

export default UsersModal;
