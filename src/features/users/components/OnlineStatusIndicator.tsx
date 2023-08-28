import { observer } from 'mobx-react-lite';

import { useStore } from '@/stores/RootStore';
import { OnlineUser } from '../types';
import { UserStatus } from '../enums';

const OnlineStatusIndicator = ({ userId }: { userId: string }) => {
  const { onlineUsers } = useStore('userStore');

  const onlineUserFound = onlineUsers.find(
    (onlineUser: OnlineUser) => onlineUser.userId === userId,
  );

  if (!onlineUserFound) return null;

  let onlineStatusColor;

  switch (onlineUserFound.status) {
    case UserStatus.AWAY:
      onlineStatusColor = 'bg-gray-500';
      break;
    case UserStatus.BUSY:
      onlineStatusColor = 'bg-yellow-500';
      break;
    case UserStatus.ONLINE:
      onlineStatusColor = 'bg-green-500';
      break;
    default:
      onlineStatusColor = 'transparent';
      break;
  }

  return <div className={`rounded-full ${onlineStatusColor} w-2.5 h-2.5`} />;
};

export default observer(OnlineStatusIndicator);
