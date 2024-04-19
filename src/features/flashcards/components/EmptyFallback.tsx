import { Button } from '@/components/ui/Button';
import { Plus } from 'react-bootstrap-icons';

type EmptyFallbackProps = {
  channelName?: string;
  onCreateNote: () => void;
};

export const EmptyFallback = ({ channelName, onCreateNote }: EmptyFallbackProps) => (
  <div className="flex flex-col gap-5 max-w-sm h-full pt-12 items-center prose">
    {/* <div className="gap-2 flex flex-col items-center text-main ">
    </div> */}

    <div className="flex flex-col gap-2 items-center">
      <h3 className="text-center text-main text-xl">No Flashcards Found.</h3>
      <p className="text-center text-secondary">{`All of your ${channelName} flashcards will appear here.`}</p>
    </div>

    <Button size="sm" className=" items-center gap-1" onClick={onCreateNote}>
      <Plus size={18} className="thick-icon" />
      Create a new flashcard
    </Button>
  </div>
);
