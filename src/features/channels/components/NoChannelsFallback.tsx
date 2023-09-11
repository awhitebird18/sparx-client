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
    <div className="w-full flex flex-col justify-center items-center mt-16 ">
      <Tv size={96} className="mb-2" />
      <p className="text-xl font-bold mb-4">No Channels Found</p>
      <p className="text-sm mb-4">You may want to try adjusting your filters.</p>
      <Button onClick={handleClickAddChannel}>Create channel</Button>
    </div>
  );
};

export default NoChannelsFallback;
