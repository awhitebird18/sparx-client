import { UserTyping } from '@/features/channels';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

const UsersTypingDisplay = () => {
  const { usersTyping } = useStore('channelStore');

  if (!usersTyping?.length) return null;
  return (
    <div className="text-muted-foreground px-2 text-xs absolute bottom-2.5 left-2">{`${usersTyping
      .map((userTyping: UserTyping) => userTyping.username)
      .join(', ')} ${usersTyping.length > 1 ? 'are' : 'is'} typing...`}</div>
  );
};

export default observer(UsersTypingDisplay);
