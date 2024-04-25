import Modal from '@/layout/modal/Modal';
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

export type AddChannelToSectionModalProps = { channelId: string };

const AddChannelToSectionModal = observer(({ channelId }: AddChannelToSectionModalProps) => {
  const { sections, updateChannelSectionApi } = useStore('sectionStore');
  const { findChannelByUuid } = useStore('channelStore');
  const channel = findChannelByUuid(channelId);
  const { closeModal } = useStore('modalStore');

  const handleSelectClick = async (sectionId: string) => {
    await updateChannelSectionApi(sectionId, channelId);
    closeModal();
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
});

export default AddChannelToSectionModal;
