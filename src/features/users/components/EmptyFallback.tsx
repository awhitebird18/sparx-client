import { Button } from '@/components/ui/Button';

type Props = { channelName?: string; onClick: () => void };

const EmptyFallback = ({ onClick }: Props) => (
  <div className="flex flex-col gap-5 max-w-sm items-center prose pt-12">
    <div className="flex flex-col gap-2 items-center">
      <h3 className="text-center text-main text-xl">No Members Found.</h3>
      <p className="text-center text-secondary flex-items-center">
        All of your notes will appear here.
      </p>
    </div>

    <Button className="items-center gap-1" onClick={onClick}>
      Reset Filters
    </Button>
  </div>
);

export default EmptyFallback;
