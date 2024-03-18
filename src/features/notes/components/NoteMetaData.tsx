import { Switch } from '@/components/ui/Switch';
import UserAvatar from '@/features/users/components/UserAvatar';
import { useStore } from '@/stores/RootStore';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { UpdateNote } from '../types/UpdateNote';

const NoteMetadata = () => {
  const { selectedNote, updateNoteApi } = useStore('noteStore');
  const { findUserByUuid, currentUser } = useStore('userStore');

  const user = findUserByUuid(selectedNote ? selectedNote.createdBy : '');

  const handleUpdateNote = (data: Partial<UpdateNote>) => {
    if (!selectedNote) return;
    updateNoteApi(selectedNote.uuid, data);
  };

  const noteOwner = user ? user : currentUser;

  if (!noteOwner) return <div />;

  return (
    <div className="card w-[32rem] h-full">
      <div className="h-full border-l border-border p-6 space-y-8">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm">Is private</p>
          <Switch
            checked={selectedNote?.isPrivate}
            onCheckedChange={(val) => handleUpdateNote({ isPrivate: val })}
          />
        </div>
        <div>
          <p className="font-semibold mb-2 text-sm">Created by</p>
          <div className="flex gap-2 items-center">
            <UserAvatar size={28} userId={noteOwner.uuid} profileImage={noteOwner.profileImage} />
            <span className="text-muted">
              {selectedNote && `${noteOwner?.firstName} ${noteOwner?.lastName}`}
            </span>
          </div>
        </div>

        <div>
          <p className="font-semibold mb-2 text-sm">Created On</p>
          <div className="flex gap-2 items-center">
            <span className="text-muted">
              {dayjs(selectedNote?.createdAt).format('MMM D, YYYY hh:mm a')}
            </span>
          </div>
        </div>

        <div>
          <p className="font-semibold mb-2 text-sm">Last accessed</p>
          <div className="flex gap-2 items-center">
            <span className="text-muted">
              {dayjs(selectedNote?.updatedAt).format('MMM D, YYYY hh:mm a')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(NoteMetadata);
