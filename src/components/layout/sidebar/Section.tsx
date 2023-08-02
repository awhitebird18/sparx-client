import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';
import { CaretDownFill, Plus } from 'react-bootstrap-icons';
import ListItem from './ListItem';
import ListHeader from './ListHeader';
import { Channel } from '@/features/channels';
import { SectionTypes } from '@/features/sections/types/sectionEnums';
import { useStore } from '@/stores/RootStore';
import ChannelIcon from '@/features/channels/components/ChannelIcon';
import { observer } from 'mobx-react-lite';
import { Button } from '@/components/ui/Button';
import { updateSectionApi } from '@/features/sections/api/updateSection';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './itemTypes';
import { SortBy } from './types';
import { sortChannels } from '@/utils/sortUtils';

interface SectionProps {
  id: string;
  type: SectionTypes;
  name: string;
  channels: Channel[];
  isSystem?: boolean;
  isOpen?: boolean;
  sortBy?: SortBy;
}

interface Item {
  channelId: string;
}

const Section = ({ id, type, name, channels, isSystem, isOpen, sortBy }: SectionProps) => {
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
  const [, dragRef] = useDrag(() => ({
    type: ItemTypes.SECTION,
    item: { sectionId: id },
    collect: () => ({}),
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
      <div ref={dragRef}>
        <ListHeader
          id={id}
          title={name}
          isSystem={isSystem}
          isOpen={isOpen}
          sortBy={sortBy}
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
      </div>

      <CollapsibleContent>
        {channels?.length
          ? sortChannels(channels, sortBy).map((channel: Channel) => (
              <ListItem
                key={channel.uuid}
                id={channel.uuid}
                title={channel.name}
                isChannel
                icon={
                  <ChannelIcon
                    imageUrl={channel.icon}
                    isPrivate={channel.isPrivate}
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
            icon={
              <Button size="icon" className="p-0 h-6 w-6" variant="secondary">
                <Plus size={16} />
              </Button>
            }
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
