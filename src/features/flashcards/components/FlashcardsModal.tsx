import Modal from '@/layout/modal/Modal';
import { useStore } from '@/stores/RootStore';
import Overview from './Overview';
import { observer } from 'mobx-react-lite';

const FlashcardsModal = observer(() => {
  const { currentChannel } = useStore('channelStore');

  return (
    <Modal title={`${currentChannel?.name} members`} disablePadding>
      <div className="w-[85vw] h-[85vh]">
        <Overview />
      </div>
    </Modal>
  );
});

export default FlashcardsModal;
