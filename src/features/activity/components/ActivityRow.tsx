import UserAvatar from '@/features/users/components/UserAvatar';
import dayjs from 'dayjs';
import { Activity } from '../types/activity';
import { useStore } from '@/stores/RootStore';

type Props = { activity: Activity };

export const ActivityRow = ({ activity }: Props) => {
  const { findUserByUuid } = useStore('userStore');
  const user = findUserByUuid(activity.userId);
  if (!user) return;
  const userName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="card border border-border flex gap-4 w-full rounded-xl items-start bg-card card shadow-sm p-4 z-10 mb-4 h-24">
      <UserAvatar size={36} userId={user.uuid} profileImage={user.profileImage} showStatus />

      <div className={`flex flex-col w-full gap-1`}>
        <h4 className="text-main leading-snug">
          {userName}{' '}
          <span className="text-secondary font-normal tracking-wide">{activity.text}</span>
        </h4>

        <p className="font-medium text-muted text-sm leading-none whitespace-nowrap">
          {dayjs(activity.createdAt).format('h:mm a')}
        </p>
      </div>
    </div>
  );
};
