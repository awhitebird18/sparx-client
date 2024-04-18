import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { MegaphoneFill } from 'react-bootstrap-icons';
import { useStore } from '@/stores/RootStore';

import { Channel } from '@/features/channels/types';

type ChannelIntroductionProps = { channelId: string | undefined };

const ChannelIntroduction = ({ channelId }: ChannelIntroductionProps) => {
  const [channel, setChannel] = useState<Channel | undefined>(undefined);
  const { findChannelByUuid } = useStore('channelStore');

  useEffect(() => {
    if (!channelId) return;
    setChannel(findChannelByUuid(channelId) || undefined);
  }, [channelId, findChannelByUuid]);

  if (!channel) return;
  return (
    <div className="flex my-3">
      {/* <div className="flex">
        <MegaphoneFill className="text-yellow-300 -rotate-45 text-3xl mt-1 ml-2" />
      </div> */}
      <div className="flex flex-col gap-3 overflow-hidden prose dark:prose-invert">
        <h3 className="text-2xl font-medium space-y-3">
          You're looking at the{' '}
          <span className="text-primary">
            {channel.name.charAt(0).toUpperCase()}
            {channel.name.substring(1).toLowerCase()}
          </span>{' '}
          channel
          <p>{channel.description}</p>
        </h3>

        <p className="text-secondary">Use this discussion board to discuss or ask questions</p>
      </div>
    </div>
  );
};

export default observer(ChannelIntroduction);
