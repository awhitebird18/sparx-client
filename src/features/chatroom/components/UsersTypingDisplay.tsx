import { observer } from 'mobx-react-lite';
import { UserTyping } from '@/features/chatroom/types';
import { useUserTypingStore } from '../hooks/useUserTypingStore';

const UsersTypingDisplay = observer(() => {
  const { usersTyping } = useUserTypingStore();
  if (!usersTyping?.length) return null;

  return (
    <div className="text-muted-foreground px-2 text-xs absolute bottom-2.5 left-2">{`${usersTyping
      .map((userTyping: UserTyping) => userTyping.username)
      .join(', ')} ${usersTyping.length > 1 ? 'are' : 'is'} typing...`}</div>
  );
});

export default UsersTypingDisplay;
