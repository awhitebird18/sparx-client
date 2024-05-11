import Modal from '@/layout/modal/Modal';
import { Channel } from '@/features/channels/types';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { Folder } from 'react-bootstrap-icons';

export type MoveNoteProps = { noteId: string; channelId: string };

const MoveNote = observer(({ noteId, channelId }: MoveNoteProps) => {
  const { closeModal } = useStore('modalStore');
  const { moveNote } = useStore('noteStore');
  const { channels } = useStore('channelStore');
  const { addNotification } = useStore('notificationStore');

  const handleMoveNote = (channel: Channel) => {
    moveNote(noteId, channel.uuid);
    closeModal();
    addNotification({
      description: `Note moved to ${channel.name}`,
      title: 'Success',
    });
  };

  return (
    <Modal title="Move note to...">
      <div className="flex flex-col max-w-lg w-96 max-h-96 overflow-auto">
        <ul className="space-y-1 pr-2">
          {channels
            .filter((channel) => channel.uuid !== channelId)
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
});

export default MoveNote;
