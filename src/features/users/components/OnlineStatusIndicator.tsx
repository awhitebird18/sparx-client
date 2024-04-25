import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/RootStore';
import { OnlineUser } from '../types';
import { UserStatus } from '../enums';

type Props = { userId: string };

const OnlineStatusIndicator = observer(({ userId }: Props) => {
  const { onlineUsers } = useStore('userStore');
  const onlineUserFound = onlineUsers.find(
    (onlineUser: OnlineUser) => onlineUser.userId === userId,
  );

  if (!onlineUserFound) return null;

  let onlineStatusColor;

  switch (onlineUserFound.status) {
    case UserStatus.AWAY:
      onlineStatusColor = 'bg-slate-400';
      break;
    case UserStatus.BUSY:
      onlineStatusColor = 'bg-yellow-500';
      break;
    case UserStatus.ONLINE:
      onlineStatusColor = 'bg-emerald-400';
      break;
    default:
      onlineStatusColor = 'transparent';
      break;
  }

  return <div className={`rounded-full ${onlineStatusColor} w-4 h-4 border-background border-2`} />;
});

export default OnlineStatusIndicator;
