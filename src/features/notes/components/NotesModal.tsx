import Modal from '@/components/modal/Modal';
import { useStore } from '@/stores/RootStore';
import Notes from './ViewNotes';

const NotesModal = () => {
  const { currentChannel } = useStore('channelStore');

  return (
    <Modal title={`${currentChannel?.name} members`}>
      <div className="w-[80vw] h-[80vh]">
        <Notes />
      </div>
    </Modal>
  );
};

export default NotesModal;
