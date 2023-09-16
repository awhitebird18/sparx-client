import { useStore } from '@/stores/RootStore';
import { Button } from '@/components/ui/Button';
import { ChannelType } from '../enums';
import { Tv } from 'react-bootstrap-icons';

const NoChannelsFallback = () => {
  const { setActiveModal } = useStore('modalStore');
  const { findSectionByChannelType } = useStore('sectionStore');

  const handleClickAddChannel = () => {
    const section = findSectionByChannelType(ChannelType.CHANNEL);
    if (!section) return;
    setActiveModal({ type: 'CreateChannelModal', payload: { id: section.uuid } });
  };

  return (
    <div className="relative w-full flex flex-col justify-center items-center h-full">
      <Tv size={500} className="text-muted opacity-5 absolute mb-28" />
      <p className="text-4xl font-bold mb-4">No Channels Found</p>
      <p className="mb-4">You may want to try adjusting your filters.</p>
      <Button size="lg" onClick={handleClickAddChannel} variant="default" className="z-50 mb-20">
        Create channel
      </Button>
    </div>
  );
};

export default NoChannelsFallback;
