import { useState } from 'react';
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

interface SectionProps {
  id: string;
  type: SectionTypes;
  name: string;
  channels: Channel[];
  isSystem?: boolean;
  isOpen?: boolean;
}

const Section = ({ id, type, name, channels, isSystem, isOpen }: SectionProps) => {
  const [open, setOpen] = useState(isOpen);
  const { selectedId } = useStore('sidebarStore');

  const handleToggleSection = async () => {
    await updateSectionApi(id, { isOpen: !open });
  };

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="mb-2">
      <ListHeader
        id={id}
        title={name}
        isSystem={isSystem}
        isOpen={isOpen}
        icon={
          <CollapsibleTrigger asChild>
            <Button
              className={`${!open ? '-rotate-90' : ''} w-6 h-6 rounded-md`}
              onClick={handleToggleSection}
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
                    size={24}
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
