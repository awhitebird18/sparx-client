import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';

const NoChannelsFallback = () => {
  const { setActiveModal } = useStore('modalStore');

  const handleClickAddChannel = () => {
    setActiveModal({ type: 'CreateChannelModal', payload: null });
  };
  return (
    <div className="w-full flex flex-col justify-center items-center mt-16">
      <p className="text-xl font-bold mb-4">No results</p>
      <p className="text-sm mb-10">You may want to try adjusting your filters. </p>
      <Button className="text-indigo-100 dark:bg-indigo-700" onClick={handleClickAddChannel}>
        Create channel
      </Button>
    </div>
  );
};

export default NoChannelsFallback;
