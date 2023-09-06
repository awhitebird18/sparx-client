import { Button } from '@/components/ui/Button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/Tooltip';
import { observer } from 'mobx-react-lite';
import { createElement } from 'react';
import { UserStatus } from '../types/userStatus';

const UserStatusDisplay = ({ status }: { status: UserStatus }) => {
  //   const { activeUserStatus } = useStore('userStatusStore');

  //   if (!activeUserStatus) return null;

  return (
    <Button size="icon" className="h-8 w-8 rounded-sm" variant="link">
      <Tooltip>
        <TooltipTrigger>
          {createElement('em-emoji', {
            id: status.emoji,
            set: 'apple',
            style: { fontSize: '1.3rem', lineHeight: '1.1rem' },
          })}
        </TooltipTrigger>

        <TooltipContent sideOffset={7}>
          <div className="flex flex-col gap-1 items-center">
            <div>
              {createElement('em-emoji', {
                id: status.emoji,
                set: 'apple',
                style: { fontSize: '1.3rem', lineHeight: '1.1rem' },
              })}
              <p>{status?.text}</p>
            </div>
            <div className="text-muted-foreground">Until 06:00 PM</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </Button>
  );
};

export default observer(UserStatusDisplay);
