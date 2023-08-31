import { useStore } from '@/stores/RootStore';
import { Button } from '@/components/ui/Button';

const NoChannelsFallback = () => {
  const { setActiveModal } = useStore('modalStore');

  const handleClickAddChannel = () => {
    setActiveModal({ type: 'CreateChannelModal', payload: null });
  };
  return (
    <div className="w-full flex flex-col justify-center items-center mt-16">
      <p className="text-xl font-bold mb-4">No results</p>
      <p className="text-sm mb-10">You may want to try adjusting your filters. </p>
      <Button className="dark:bg-userDark text-white h-8 p-0 px-2" onClick={handleClickAddChannel}>
        Create channel
      </Button>
    </div>
  );
};

export default NoChannelsFallback;
