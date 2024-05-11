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

export type Props = { channelId: string };

const AddChannelToSectionModal = observer(({ channelId }: Props) => {
  const { sortedSections, updateChannelSectionApi } = useStore('sectionStore');
  const { closeModal } = useStore('modalStore');

  const handleSelectChange = async (sectionId: string) => {
    await updateChannelSectionApi(sectionId, channelId);
    closeModal();
  };

  return (
    <Modal title={`Assign to bookmarks`}>
      <Select onValueChange={(val: string) => handleSelectChange(val)}>
        <SelectTrigger className="w-80">
          <SelectValue placeholder="Select a node" />
        </SelectTrigger>
        <SelectContent>
          {sortedSections.map((section: Section) => (
            <SelectItem value={section.uuid}>{section.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Modal>
  );
});

export default AddChannelToSectionModal;
