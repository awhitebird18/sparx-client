import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';
import { PlusSquare, CaretDownFill } from 'react-bootstrap-icons';
import ListItem from './ListItem';
import ListHeader from './ListHeader';
import { Channel } from '@/features/channels';
import { SectionTypes } from '@/features/sections/types/sectionEnums';

interface SectionProps {
  id: string;
  type: SectionTypes;
  name: string;
  channels: Channel[];
  isSystem?: boolean;
}

const Section = ({ id, type, name, channels, isSystem }: SectionProps) => {
  const [open, setOpen] = useState(true);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="mb-2">
      <ListHeader
        id={id}
        title={name}
        isSystem={isSystem}
        icon={
          <CollapsibleTrigger>
            <div className={!open ? '-rotate-90' : ''}>
              <CaretDownFill />
            </div>
          </CollapsibleTrigger>
        }
      />

      <CollapsibleContent>
        {channels?.length
          ? channels.map((channel: Channel) => (
              <ListItem key={channel.uuid} id={channel.uuid} title={channel.name} isChannel />
            ))
          : ''}

        {isSystem ? (
          <ListItem
            id={type === 'channel' ? 'channels' : 'users'}
            icon={<PlusSquare />}
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

export default Section;
