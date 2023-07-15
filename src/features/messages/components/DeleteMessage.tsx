import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/Button';

import Message from './Message';

type DeletemessageProps = { message: Message };

const DeleteMessage = ({ message }: DeletemessageProps) => {
  if (!message) return;

  return (
    <Modal title="Delete message">
      <div className="flex flex-col w-96 space-y-8">
        <div className="flex flex-col gap-3">
          <p>Are you sure you wnat to delete this message? This cannot be undone.</p>

          <div className="border border-border p-4">
            <Message message={message} showUser />
          </div>
        </div>
        <div className="flex gap-2 ml-auto">
          <Button className=" w-28" type="submit">
            Cancel
          </Button>
          <Button className="ml-auto w-28" type="submit">
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteMessage;
