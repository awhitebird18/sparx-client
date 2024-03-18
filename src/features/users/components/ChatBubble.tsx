import { Button } from '@/components/ui/Button';
import { ChatRightQuoteFill } from 'react-bootstrap-icons';

const ChatBubble = () => {
  return (
    <Button className="z-50 rounded-full w-14 h-14 shadow bg-primary-dark border border-primary-lighter p-2 flex items-center justify-center absolute bottom-6 right-6">
      <ChatRightQuoteFill size={28} className="text-main mt-1 mr-0.5" />
    </Button>
  );
};

export default ChatBubble;
