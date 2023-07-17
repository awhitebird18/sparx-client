import { Button } from '@/components/ui/Button';
import { Channel } from '@/features/channels';
import { useStore } from '@/stores/RootStore';
import { useEffect, useState } from 'react';

import { MegaphoneFill, PersonAdd } from 'react-bootstrap-icons';

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
    <div className="flex my-6">
      <div className="w-12">
        <MegaphoneFill className="text-yellow-300 -rotate-45 text-3xl mt-2" />
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="flex text-3xl items-center font-bold">
          You're looking at the <span className="text-indigo-600 px-1.5">#{channel.name}</span>
          channel
        </h2>
        <p className="text-muted-foreground">
          This is the one channel that will always include everyone. It’s a great spot for
          announcements and team-wide conversations.
        </p>
        <Button variant="outline" className="w-fit flex gap-2 text-base">
          <PersonAdd className="text-xl" /> Add People
        </Button>
      </div>
    </div>
  );
};

export default ChannelIntroduction;
