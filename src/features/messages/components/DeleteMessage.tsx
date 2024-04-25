import { useStore } from '@/stores/RootStore';
import Modal from '@/layout/modal/Modal';
import { Button } from '@/components/ui/Button';
import Message from './Message';
import { Message as MessageType } from '../types';
import { observer } from 'mobx-react-lite';

export type DeletemessageProps = { message: MessageType };

const DeleteMessage = observer(({ message }: DeletemessageProps) => {
  const { removeMessageApi } = useStore('messageStore');
  const { closeModal } = useStore('modalStore');

  const handleDeleteMessage = () => {
    removeMessageApi(message.uuid);
    closeModal();
  };

  if (!message) return null;

  return (
    <Modal title="Delete message">
      <div className="flex flex-col w-96 space-y-8">
        <div className="flex flex-col gap-3">
          <p>Are you sure you wnat to delete this message? This cannot be undone.</p>

          <div className="border border-border pl-2 py-2 rounded-md">
            <Message message={message} showUser disabled />
          </div>
        </div>
        <div className="flex gap-2 ml-auto">
          <Button className=" w-28" onClick={closeModal} variant="outline">
            Cancel
          </Button>
          <Button className="ml-auto w-28" onClick={handleDeleteMessage} variant="destructive">
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default DeleteMessage;
