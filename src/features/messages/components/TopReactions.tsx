import { Button } from '@/components/ui/Button';
import { EmojiHeartEyes, EmojiLaughing, EmojiNeutral } from 'react-bootstrap-icons';

const TopReactions = () => {
  return (
    <>
      <Button variant="ghost" className="p-0 w-9 h-9">
        <EmojiHeartEyes />
      </Button>
      <Button variant="ghost" className="p-0 w-9 h-9">
        <EmojiLaughing />
      </Button>
      <Button variant="ghost" className="p-0 w-9 h-9">
        <EmojiNeutral />
      </Button>
    </>
  );
};

export default TopReactions;
