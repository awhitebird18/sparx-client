import Modal from '@/components/modal/Modal';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Section } from '../types';

const AddChannelToSectionModal = ({ channelId }: { channelId: string }) => {
  const { sections, updateChannelSectionApi } = useStore('sectionStore');
  const { findChannelByUuid } = useStore('channelStore');

  const channel = findChannelByUuid(channelId);

  const { setActiveModal } = useStore('modalStore');

  const handleSelectClick = async (sectionId: string) => {
    await updateChannelSectionApi(sectionId, channelId);

    setActiveModal(null);
  };

  return (
    <Modal title={`Add ${channel?.name} to section`}>
      <div>
        <Select onValueChange={(val: string) => handleSelectClick(val)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            {sections.map((section: Section) => (
              <SelectItem value={section.uuid}>{section.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Modal>
  );
};

export default observer(AddChannelToSectionModal);
