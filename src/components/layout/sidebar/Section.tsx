import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import { PlusSquare, CaretDownFill } from 'react-bootstrap-icons';

import ListItem from './ListItem';
import ListHeader from './ListHeader';

import { Channel } from '@/features/channels';
import { useNavigate } from 'react-router-dom';

import { SectionTypes } from '@/features/sections/types/sectionEnums';

interface SectionProps {
  type: SectionTypes;
  name: string;
  channels: Channel[];
  isSystem?: boolean;
}

const Section = ({ type, name, channels, isSystem }: SectionProps) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="mb-2">
      <ListHeader
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
              <ListItem
                title={channel.name}
                icon={
                  <Avatar className="w-100 h-100">
                    {<AvatarImage src={channel.image} />}
                    <AvatarFallback
                      children={channel.name.substring(0, 2).toUpperCase()}
                      className="w-100 h-100"
                    />
                  </Avatar>
                }
                onClick={() => {
                  navigate(`/app/${channel.uuid}`);
                }}
              />
            ))
          : ''}

        {isSystem ? (
          <ListItem
            icon={<PlusSquare />}
            title={type === SectionTypes.DIRECT ? 'View Users' : 'Explore Channels'}
            onClick={() => {
              navigate(`/app/${type === SectionTypes.DIRECT ? 'users' : 'channels'}`);
            }}
          />
        ) : (
          ''
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Section;
