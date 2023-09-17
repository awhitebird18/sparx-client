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
          <div className="flex flex-col gap-3 px-2 py-1 items-center">
            <Emoji id={status.emoji} size={26} />
            <p>{status?.text}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </Button>
  );
};

export default observer(UserStatusDisplay);
