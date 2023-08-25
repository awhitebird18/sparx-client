import { observer } from 'mobx-react-lite';

import { useStore } from '@/stores/RootStore';
import { UserTyping } from '@/features/userTyping/types';

const UsersTypingDisplay = () => {
  const { usersTyping } = useStore('userTypingStore');

  if (!usersTyping?.length) return null;
  return (
    <div className="text-muted-foreground px-2 text-xs absolute bottom-2.5 left-2">{`${usersTyping
      .map((userTyping: UserTyping) => userTyping.username)
      .join(', ')} ${usersTyping.length > 1 ? 'are' : 'is'} typing...`}</div>
  );
};

export default observer(UsersTypingDisplay);
