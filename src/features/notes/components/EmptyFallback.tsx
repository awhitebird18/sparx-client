import { Button } from '@/components/ui/Button';
import { Plus } from 'react-bootstrap-icons';

type Props = {
  channelName?: string;
  onCreateNote: () => void;
};

const EmptyFallback = ({ channelName, onCreateNote }: Props) => (
  <div className="flex flex-col gap-5 max-w-sm items-center prose">
    <div className="flex flex-col gap-2 items-center">
      <h3 className="text-center text-main text-xl">No Notes Found.</h3>
      <p className="text-center text-secondary flex-items-center">
        All of your <span className="text-primary px-0.5">{channelName}</span> notes will appear
        here.
      </p>
    </div>

    <Button className="items-center gap-1" onClick={onCreateNote}>
      <Plus size={20} />
      Start a new note
    </Button>
  </div>
);

export default EmptyFallback;
