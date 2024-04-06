import Modal from '@/components/modal/Modal';
import { Channel } from '@/features/channels/types';

import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { Folder } from 'react-bootstrap-icons';

const MoveNote = ({ noteId, channelId }: { noteId: string; channelId: string }) => {
  const { setActiveModal } = useStore('modalStore');
  const { moveNote } = useStore('noteStore');
  const { subscribedChannels } = useStore('channelStore');
  const { addNotification } = useStore('notificationStore');

  const handleMoveNote = (channel: Channel) => {
    moveNote(noteId, channel.uuid);
    setActiveModal(null);
    addNotification({
      description: `Note moved to ${channel.name}`,
      title: 'Success',
    });
  };

  return (
    <Modal title="Move note to...">
      <div className="flex flex-col max-w-lg w-96 max-h-96 overflow-auto">
        <ul className="space-y-1 pr-2">
          {subscribedChannels
            .filter((channel) => channel.type !== 'direct' && channel.uuid !== channelId)
            .map((channel) => (
              <li
                key={channel.uuid}
                onClick={() => handleMoveNote(channel)}
                className="flex gap-2 items-center w-full hover:bg-hover p-2 px-4 rounded-lg cursor-pointer"
              >
                <Folder /> {channel.name}
              </li>
            ))}
        </ul>
      </div>
    </Modal>
  );
};

export default observer(MoveNote);
