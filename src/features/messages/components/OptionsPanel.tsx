import { Button } from '@/components/ui/Button';
import { ChatDots, EmojiSmile, Pencil, Plus, Trash } from 'react-bootstrap-icons';
import TopReactions from './TopReactions';
import { useStore } from '@/stores/RootStore';
import { ModalName } from '@/components/modal/modalList';
import { Message } from '..';

type OptionsPanelProps = { message: Message; setIsEditing: (bool: boolean) => void };

const OptionsPanel = ({ message, setIsEditing }: OptionsPanelProps) => {
  const { setActiveModal } = useStore('modalStore');

  const handleOpenModal = ({
    type,
    payload,
  }: {
    type: ModalName;
    payload: { message: Message };
  }) => {
    setActiveModal({ type, payload });
  };

  const handleEditMessage = () => {
    setIsEditing(true);
  };

  return (
    <div className="options-panel hidden border border-border absolute -top-3/4 right-5 rounded-md bg-black">
      <TopReactions />
      <Button size="icon" variant="ghost" className="p-0 w-9 h-9 relative">
        <EmojiSmile />
        <Plus className="absolute top-0.5 right-0.5" />
      </Button>
      <Button size="icon" variant="ghost" className="p-0 w-9 h-9">
        <ChatDots />
      </Button>
      <Button size="icon" variant="ghost" className="p-0 w-9 h-9" onClick={handleEditMessage}>
        <Pencil />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="p-0 w-9 h-9 text-rose-500"
        onClick={() => handleOpenModal({ type: 'DeleteMessageModal', payload: { message } })}
      >
        <Trash />
      </Button>
    </div>
  );
};

export default OptionsPanel;
