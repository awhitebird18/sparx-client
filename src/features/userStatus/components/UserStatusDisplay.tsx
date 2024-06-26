import { Button } from '@/components/ui/Button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/Tooltip';
import { observer } from 'mobx-react-lite';
import { UserStatus } from '../types/userStatus';
import Emoji from '@/components/ui/Emoji';

type Props = { status: UserStatus };

const UserStatusDisplay = observer(({ status }: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" className="" variant="link">
          <div className="mb-0.5 ml-1">
            <Emoji id={status.emoji} size={21} />
          </div>
        </Button>
      </TooltipTrigger>

      <TooltipContent alignOffset={-8} align="end">
        <div className="flex flex-col gap-3 px-2 py-1 items-center">
          <Emoji id={status.emoji} size={26} />
          <p>{status?.text}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
});

export default UserStatusDisplay;
