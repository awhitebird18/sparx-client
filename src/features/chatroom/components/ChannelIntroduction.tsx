import { Button } from '@/components/ui/Button';
import { Channel } from '@/features/channels';
import { useStore } from '@/stores/RootStore';
import { useEffect, useState } from 'react';

import { MegaphoneFill, Person, Plus } from 'react-bootstrap-icons';

type ChannelIntroductionProps = { channelId: string | undefined };

const ChannelIntroduction = ({ channelId }: ChannelIntroductionProps) => {
  const [channel, setChannel] = useState<Channel | undefined>(undefined);
  const { findById } = useStore('channelStore');

  useEffect(() => {
    if (!channelId) return;
    setChannel(findById(channelId) || undefined);
  }, [channelId, findById]);

  if (!channel) return;
  return (
    <div className="flex my-6 ">
      <div className="w-12">
        <MegaphoneFill className="text-yellow-300 -rotate-45 text-3xl mt-2" />
      </div>
      <div className="flex flex-col gap-5">
        <p className="text-3xl font-bold space-y-6">
          You're looking at the <span className="text-indigo-600">#{channel.name} </span>
          channel
          <span className="text-muted-foreground text-base block font-normal">
            This is the one channel that will always include everyone. It’s a great spot for
            announcements and team-wide conversations.
          </span>
        </p>
        <Button variant="outline" className="w-fit flex gap-2 text-base font-normal items-center">
          <Person className="text-xl" />
          Add People
          <Plus />
        </Button>
      </div>
    </div>
  );
};

export default ChannelIntroduction;
