import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

const OnlineStatusIndicator = ({ userId }: { userId: string }) => {
  const { onlineUsers } = useStore('userStore');

  return (
    <div>
      {onlineUsers.has(userId) ? <div className={`rounded-full bg-green-500 w-2 h-2`} /> : null}
    </div>
  );
};

export default observer(OnlineStatusIndicator);
