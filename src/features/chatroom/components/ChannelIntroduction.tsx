import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { MegaphoneFill, Person, Plus } from 'react-bootstrap-icons';
import { useStore } from '@/stores/RootStore';

import { Button } from '@/components/ui/Button';

import { Channel } from '@/features/channels/types';

type ChannelIntroductionProps = { channelId: string | undefined };

const ChannelIntroduction = ({ channelId }: ChannelIntroductionProps) => {
  const [channel, setChannel] = useState<Channel | undefined>(undefined);
  const { findChannelByUuid } = useStore('channelStore');
  const { setActiveModal } = useStore('modalStore');

  useEffect(() => {
    if (!channelId) return;
    setChannel(findChannelByUuid(channelId) || undefined);
  }, [channelId, findChannelByUuid]);

  const handleAddUser = () => {
    setActiveModal({ type: 'AddUserModal', payload: { channel } });
  };

  if (!channel) return;
  return (
    <div className="flex my-6 gap-5">
      <div className="flex">
        <MegaphoneFill className="text-yellow-300 -rotate-45 text-3xl mt-1 ml-2" />
      </div>
      <div className="flex flex-col gap-3 overflow-hidden">
        <p className="text-3xl font-bold space-y-3">
          You're looking at the{' '}
          <span className="text-primary">
            #{channel.name.charAt(0).toUpperCase()}
            {channel.name.substring(1).toLowerCase()}
          </span>{' '}
          channel
          <span className="text-muted-foreground text-base block font-normal">
            {channel.description}
          </span>
        </p>

        <p className="text-base font-medium">
          Use this discussion board to discuss or ask questions
        </p>
      </div>
    </div>
  );
};

export default observer(ChannelIntroduction);
