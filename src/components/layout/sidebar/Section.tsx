import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';

import { CaretDownFill } from 'react-bootstrap-icons';

import ListItem from './ListItem';
import ListHeader from './ListHeader';

interface Channel {
  uuid: string;
  name: string;
  image?: string | JSX.Element;
}

interface SectionProps {
  uuid: string;
  name: string;
  channels: Channel[];
}

const Section = ({ uuid, name, channels }: SectionProps) => {
  const [open, setOpen] = useState(true);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <ListHeader
        uuid={uuid}
        title={name}
        icon={
          <CollapsibleTrigger>
            <CaretDownFill style={{ marginTop: '4px' }} />
          </CollapsibleTrigger>
        }
      />

      <CollapsibleContent>
        {channels.map((channel: Channel) => (
          <ListItem uuid={channel.uuid} title={channel.name} src={channel.image} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Section;
