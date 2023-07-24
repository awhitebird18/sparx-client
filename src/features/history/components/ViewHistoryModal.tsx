import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { useNavigate } from 'react-router-dom';
import { HistoryItem } from './types';

const ViewHistoryModal = ({ history }: { history: HistoryItem[] }) => {
  const { setActiveModal } = useStore('modalStore');
  const navigate = useNavigate();

  const handleClickItem = (value: string) => {
    navigate(value);
    setActiveModal(null);
  };

  return (
    <Modal title="History">
      <div className="w-64 max-h-80 overflow-auto ">
        {history
          ? history
              .sort((a: HistoryItem, b: HistoryItem) => b.timestamp - a.timestamp)
              .map((item: HistoryItem) => (
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => handleClickItem(item.primaryView)}
                >
                  {item.primaryView.replace('/app/', '')}
                </Button>
              ))
          : null}
      </div>
    </Modal>
  );
};

export default ViewHistoryModal;
