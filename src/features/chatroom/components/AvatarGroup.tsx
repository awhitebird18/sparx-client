import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { User } from '@/features/users';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

const AvatarGroup = () => {
  const { users } = useStore('userStore');

  const userCount = Math.min(3, users.length);

  const componentWidth = `${(userCount - 1) * 16 + 26.5}px`;

  return (
    <div
      className={`relative h-full flex justify-end items-center overflow-hidden`}
      style={{ width: componentWidth }}
    >
      {users ? (
        users.slice(0, userCount).map((user: User, index: number) => (
          <Avatar
            className={`absolute w-7 h-7 rounded-sm shadow-md shadow-background `}
            style={{ left: `${index * 16}px` }}
          >
            <AvatarImage src={user.profileImage} />
            <AvatarFallback
              children={user.firstName.substring(0, 2).toUpperCase()}
              className={`w-full h-full text-sm rounded-sm cursor-pointer`}
            />
          </Avatar>
        ))
      ) : (
        <Skeleton className="h-7 w-full rounded-sm" />
      )}
    </div>
  );
};

export default observer(AvatarGroup);
