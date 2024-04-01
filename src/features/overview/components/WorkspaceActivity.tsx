import dayjs from 'dayjs';
import UserAvatar from '@/features/users/components/UserAvatar';
import { Skeleton } from '@/components/ui/Skeleton';

const WorkspaceActivity = ({ activity, isLoading }: { activity: any; isLoading: boolean }) => {
  if (isLoading) {
    return (
      <div className="space-y-4 card rounded-2xl opacity-90 h-full">
        <Skeleton className="h-[6.5rem] w-full rounded-xl" />
        <Skeleton className="h-[6.5rem] w-full rounded-xl" />
        <Skeleton className="h-[6.5rem] w-full rounded-xl" />
        <Skeleton className="h-[6.5rem] w-full rounded-xl" />
        <Skeleton className="h-[6.5rem] w-full rounded-xl" />
        <Skeleton className="h-[6.5rem] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <>
      {activity.length ? (
        <div className="space-y-4 card rounded-2xl opacity-90 h-full">
          {activity.map((activity: any) => (
            <ActivityRow key={activity.id} activity={activity} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 items-center pt-8">
          <h3 className="text-center text-secondary text-xl">No recent activity.</h3>
          <p className="text-center text-muted">All workspace events will be posted here.</p>
        </div>
      )}
    </>
  );
};

export default WorkspaceActivity;

const ActivityRow = ({ activity }: any) => {
  const user = activity.user;
  const userName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="card border border-border flex gap-6 w-full rounded-xl items-start bg-card card shadow p-4 py-5 z-10">
      <div className="flex gap-4">
        <div className="relative h-full">
          <UserAvatar userId={user.uuid} profileImage={user.profileImage} showStatus />
        </div>
        <div className={`flex flex-col w-full gap-1`}>
          <div className="flex gap-2 items-center">
            <h4 className="text-main leading-snug">
              {userName}{' '}
              <span className="text-secondary font-normal tracking-wide">{activity.text}</span>
            </h4>
          </div>
          <p className="font-medium text-muted text-sm leading-none whitespace-nowrap">
            {dayjs(activity.createdAt).format('h:mm a')}
          </p>
        </div>
      </div>
      <div className="flex gap-2 ml-auto leading-none"></div>
    </div>
  );
};
