import { CaretDownFill, Plus } from 'react-bootstrap-icons';
import { observer } from 'mobx-react-lite';
import { useDrag, useDrop } from 'react-dnd';

import { useStore } from '@/stores/RootStore';
import { SidebarItem } from './enums/itemTypes';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';
import ListItem from './ListItem';
import ListHeader from './ListHeader';
import { SectionTypes } from '@/features/sections/enums/sectionsType';
import ChannelIcon from '@/features/channels/components/ChannelIcon';
import { Button } from '@/components/ui/Button';
import { Section } from '@/features/sections/types';

interface SectionProps {
  section: Section;
}

interface Item {
  channelId: string;
}

const Section = ({ section }: SectionProps) => {
  const { uuid, type, name, channelIds, isSystem, isOpen, sortBy } = section;
  const { selectedId } = useStore('sidebarStore');
  const { updateSectionApi } = useStore('sectionStore');
  const { findChannelByUuid } = useStore('channelStore');
  const [{ isOver }, drop] = useDrop(() => ({
    accept: SidebarItem.ITEM,
    drop: (item: Item) => {
      console.info(item);
      // updateChannelSection(item.channelId, id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const [, dragRef] = useDrag(() => ({
    type: SidebarItem.SECTION,
    item: { sectionId: uuid },
    collect: () => ({}),
  }));

  const handleToggleSection = async (bool: boolean) => {
    await updateSectionApi(uuid, { isOpen: bool });
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
          id={uuid}
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
        {channelIds?.length
          ? channelIds.map((channelUuid: string) => {
              const channel = findChannelByUuid(channelUuid);
              if (!channel) return null;

              return (
                <ListItem
                  key={channelUuid}
                  id={channelUuid}
                  title={channel.name}
                  isChannel
                  icon={
                    <ChannelIcon
                      imageUrl={channel.icon}
                      isPrivate={channel.isPrivate}
                      isSelected={selectedId === channelUuid}
                      size={19}
                    />
                  }
                />
              );
            })
          : null}

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
