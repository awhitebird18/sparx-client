import { Button } from '@/components/ui/Button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/Tooltip';
import { observer } from 'mobx-react-lite';
import { UserStatus } from '../types/userStatus';
import Emoji from '@/components/ui/Emoji';

const UserStatusDisplay = ({ status }: { status: UserStatus }) => {
  return (
    <Tooltip>
      <Button size="icon" className="" variant="link">
        <TooltipTrigger asChild>
          <div className="mb-0.5 ml-1">
            <Emoji id={status.emoji} size={21} />
          </div>
        </TooltipTrigger>

        <TooltipContent alignOffset={-8} align="end">
          <div className="flex flex-col gap-3 px-2 py-1 items-center">
            <Emoji id={status.emoji} size={26} />
            <p>{status?.text}</p>
          </div>
        </TooltipContent>
      </Button>
    </Tooltip>
  );
};

export default observer(UserStatusDisplay);
