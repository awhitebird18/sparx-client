import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

const UsersTypingDisplay = () => {
  const { usersTyping } = useStore('channelStore');

  if (!usersTyping?.length) return null;
  return (
    <div className="text-muted-foreground px-2 text-xs absolute bottom-2.5 left-2">{`${usersTyping
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((user: any) => user.name)
      .join(', ')} are typing...`}</div>
  );
};

export default observer(UsersTypingDisplay);
