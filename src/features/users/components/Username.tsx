import { useStore } from '@/stores/RootStore';
import { useEffect, useState } from 'react';
import { User } from '..';
import { observer } from 'mobx-react-lite';
import { Tooltip, TooltipContent } from '@/components/ui/Tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';

type UsernameProps = { userId: string | undefined };
const Username = ({ userId }: UsernameProps) => {
  const { findUser } = useStore('userStore');
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (!userId) return;
    setUser(findUser(userId));
  }, [findUser, userId]);

  const formattedName = user
    ? `${user.firstName.charAt(0).toUpperCase()}${user.firstName
        .substring(1)
        .toLowerCase()} ${user.lastName.charAt(0).toUpperCase()}${user.lastName
        .substring(1)
        .toLowerCase()}`
    : '';

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <p className="text-ellipsis whitespace-nowrap overflow-hidden">{formattedName}</p>
      </TooltipTrigger>
      <TooltipContent>{formattedName}</TooltipContent>
    </Tooltip>
  );
};

export default observer(Username);
