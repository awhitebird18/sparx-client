import Modal from '@/layout/modal/Modal';
import { useStore } from '@/stores/RootStore';
import MainPage from './MainPage';

const NotesModal = () => {
  const { currentChannel } = useStore('channelStore');

  return (
    <Modal title={`${currentChannel?.name} members`}>
      <div className="w-full h-full">
        <MainPage />
      </div>
    </Modal>
  );
};

export default NotesModal;
