import UserAvatar from '@/features/users/components/UserAvatar';
import { Activity } from '../types/activity';
import { useStore } from '@/stores/RootStore';

type Props = { activity: Activity };

export const ActivityRow = ({ activity }: Props) => {
  const { findUserByUuid } = useStore('userStore');
  const user = findUserByUuid(activity.userId);
  if (!user) return;
  const userName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="flex gap-5 w-full items-start z-10 h-fit">
      <UserAvatar size={36} userId={user.uuid} profileImage={user.profileImage} showStatus />

      <div className={`flex flex-col w-full gap-1`}>
        <h4 className="text-main font-medium leading-none flex items-center gap-2">
          {userName}{' '}
          <span className="text-muted text-xs font-medium whitespace-nowrap leading-none mt-0.5">
            {activity?.createdAt}
          </span>
        </h4>
        <span className="text-secondary !font-normal text-sm tracking-wide">{activity.text}</span>
      </div>
    </div>
  );
};
