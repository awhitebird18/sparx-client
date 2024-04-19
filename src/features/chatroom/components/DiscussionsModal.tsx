import Modal from '@/layout/modal/Modal';
import { useStore } from '@/stores/RootStore';
import Chatroom from './Chatroom';
import { observer } from 'mobx-react-lite';

const DiscussionsModal = observer(() => {
  const { currentChannel } = useStore('channelStore');
  return (
    <Modal title={`${currentChannel?.name} members`}>
      <div className="w-[80vw] h-[80vh]">
        <Chatroom />
      </div>
    </Modal>
  );
});

export default DiscussionsModal;
