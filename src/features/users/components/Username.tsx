import { observer } from 'mobx-react-lite';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';

type UsernameProps = { firstName: string; lastName: string };
const Username = ({ firstName, lastName }: UsernameProps) => {
  const formattedName = `${firstName.charAt(0).toUpperCase()}${firstName
    .substring(1)
    .toLowerCase()} ${lastName.charAt(0).toUpperCase()}${lastName.substring(1).toLowerCase()}`;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <p className="text-ellipsis whitespace-nowrap overflow-hidden font-medium">
          {formattedName}
        </p>
      </TooltipTrigger>
      <TooltipContent>{formattedName}</TooltipContent>
    </Tooltip>
  );
};

export default observer(Username);
