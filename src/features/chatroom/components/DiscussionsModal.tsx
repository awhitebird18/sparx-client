import Modal from '@/components/modal/Modal';
import { useStore } from '@/stores/RootStore';
import Chatroom from './Chatroom';

const DiscussionsModal = () => {
  const { currentChannel } = useStore('channelStore');
  return (
    <Modal title={`${currentChannel?.name} members`}>
      <div className="w-[80vw] h-[80vh]">
        <Chatroom />
      </div>
    </Modal>
  );
};

export default DiscussionsModal;
