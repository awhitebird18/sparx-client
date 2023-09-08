import { Button } from '@/components/ui/Button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/Tooltip';
import { observer } from 'mobx-react-lite';
import { UserStatus } from '../types/userStatus';
import Emoji from '@/components/ui/Emoji';

const UserStatusDisplay = ({ status }: { status: UserStatus }) => {
  return (
    <Button size="icon" className="h-8 w-8 rounded-sm" variant="link">
      <Tooltip>
        <TooltipTrigger>
          <Emoji id={status.emoji} />
        </TooltipTrigger>

        <TooltipContent sideOffset={7}>
          <div className="flex flex-col gap-1 items-center">
            <div>
              <Emoji id={status.emoji} size={26} />
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
