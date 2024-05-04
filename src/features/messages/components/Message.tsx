import { observer } from 'mobx-react-lite';
import dayjs, { Dayjs } from 'dayjs';
import { useStore } from '@/stores/RootStore';
import MessageDisplay from '@/features/messageInput/MessageDisplay';
import OptionsPanel from './OptionsPanel';
import MessageEditor from '@/features/messageInput/MessageEditor';
import Username from '@/features/users/components/Username';
import ReactionsDisplay from '@/features/reactions/components/ReactionsDisplay';
import { Message as MessageType } from '../types';
import useUserActions from '../hooks/useUserActions';
import UserDetails from './UserDetails';
import { User } from '@/features/users/types';

type Props = {
  message: MessageType;
  showUser: boolean;
  disabled?: boolean;
};

const Message = observer(({ message, showUser, disabled }: Props) => {
  const { findUserByUuid } = useStore('userStore');
  const { handleViewUserProfile } = useUserActions(message);
  const { isMessageEditing, setMessageEditId, messageEditId } = useStore('messageStore');
  const isEditing = isMessageEditing(message.uuid);

  const user = findUserByUuid(message.userId);
  if (!user) return;

  return (
    <div
      className={`flex message ${showUser && 'mt-3'} rounded-lg ${
        !disabled && !isEditing ? 'hover:bg-card-hover hover:dark:bg-hover' : '!bg-transparent'
      } relative flex gap-4 p-1.5 h-min`}
    >
      <div className="w-11">
        {showUser && <UserDetails user={user} handleViewUserProfile={handleViewUserProfile} />}
      </div>

      <div className={`flex flex-col ${showUser ? 'h-fit' : 'h-fit'} w-full`}>
        {showUser && <MessageHeader user={user} message={message} />}

        {isEditing ? (
          <MessageEditor message={message} setIsEditing={setMessageEditId} />
        ) : (
          <MessageDisplay content={message.content} id={message.uuid} />
        )}

        {!showUser && <MessageTimestamp dateStr={message.createdAt} />}

        <ReactionsDisplay message={message} />
      </div>
      {!disabled && !messageEditId && (
        <OptionsPanel message={message} setIsEditing={setMessageEditId} />
      )}
    </div>
  );
});

export default Message;

type MessageHeaderProps = {
  user: User;
  message: MessageType;
};
const MessageHeader = ({ user, message }: MessageHeaderProps) => {
  return (
    <div className="flex gap-3 items-center h-5">
      <span className="font-semibold dark:text-gray-100 h-5 leading-4">
        <Username firstName={user.firstName} lastName={user.lastName} />
      </span>
      <p className="text-xs text-neutral mb-1">{dayjs(message.createdAt).format('h:mm a')}</p>
    </div>
  );
};

const MessageTimestamp = ({ dateStr }: { dateStr: string | Dayjs }) => (
  <span className="timestamp absolute top-1.5 left-5 text-xs leading-6 text-secondary w-12">
    {dayjs(dateStr).format('h:mm')}
  </span>
);
