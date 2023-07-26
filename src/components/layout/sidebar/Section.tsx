import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';
import { CaretDownFill, PlusSquareDotted } from 'react-bootstrap-icons';
import ListItem from './ListItem';
import ListHeader from './ListHeader';
import { Channel } from '@/features/channels';
import { SectionTypes } from '@/features/sections/types/sectionEnums';
import { useStore } from '@/stores/RootStore';
import ChannelIcon from '@/features/channels/components/ChannelIcon';
import { observer } from 'mobx-react-lite';
import { Button } from '@/components/ui/Button';
import { updateSectionApi } from '@/features/sections/api/updateSection';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './itemTypes';

interface SectionProps {
  id: string;
  type: SectionTypes;
  name: string;
  channels: Channel[];
  isSystem?: boolean;
  isOpen?: boolean;
}

interface Item {
  channelId: string;
}

const Section = ({ id, type, name, channels, isSystem, isOpen }: SectionProps) => {
  const { selectedId } = useStore('sidebarStore');
  const { updateSection } = useStore('sectionStore');
  const { updateChannelSection } = useStore('channelStore');
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ITEM,
    drop: (item: Item) => {
      updateChannelSection(item.channelId, id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleToggleSection = async (bool: boolean) => {
    await updateSectionApi(id, { isOpen: bool });
    updateSection(id, { isOpen: bool });
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={handleToggleSection}
      className={`mb-2 ${isOver ? 'outline-border rounded-lg outline-dotted' : ''}`}
      ref={drop}
    >
      <ListHeader
        id={id}
        title={name}
        isSystem={isSystem}
        isOpen={isOpen}
        icon={
          <CollapsibleTrigger asChild>
            <Button
              className={`${!isOpen ? '-rotate-90' : ''} w-6 h-6 rounded-md`}
              size="icon"
              variant="ghost"
            >
              <CaretDownFill />
            </Button>
          </CollapsibleTrigger>
        }
      />

      <CollapsibleContent>
        {channels?.length
          ? channels.map((channel: Channel) => (
              <ListItem
                key={channel.uuid}
                id={channel.uuid}
                title={channel.name}
                isChannel
                icon={
                  <ChannelIcon
                    imageUrl={channel.icon}
                    isSelected={selectedId === channel.uuid}
                    size={19}
                  />
                }
              />
            ))
          : ''}

        {isSystem ? (
          <ListItem
            id={type === 'channel' ? 'channels' : 'users'}
            icon={<PlusSquareDotted size={18} />}
            title={type === SectionTypes.DIRECT ? 'View Users' : 'Explore Channels'}
            disabled
          />
        ) : (
          ''
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default observer(Section);
