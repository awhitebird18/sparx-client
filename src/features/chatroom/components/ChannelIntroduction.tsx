import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/RootStore';

const ChannelIntroduction = observer(() => {
  const { findChannelByUuid, currentChannelId } = useStore('channelStore');
  if (!currentChannelId) return;
  const channel = findChannelByUuid(currentChannelId);
  if (!channel) return;
  return (
    <div className="flex flex-col gap-3 overflow-hidden prose dark:prose-invert mb-3">
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
  );
});

export default ChannelIntroduction;
