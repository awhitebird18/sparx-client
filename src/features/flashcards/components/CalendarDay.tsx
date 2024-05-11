import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/Tooltip';
import { getColor } from '../utils/getColor';
import { StatDailyStudiedCount } from '../types/statDailyStudiedCount';

type Props = {
  stat: StatDailyStudiedCount;
};

const CalendarDay = ({ stat }: Props) => {
  const bgColor = getColor(stat.count);

  return (
    <Tooltip>
      <TooltipTrigger>
        <div className={`h-7 w-7 ${bgColor} flex-shrink-0`} />
      </TooltipTrigger>
      <TooltipContent>
        <div className="flex flex-col items-center">
          <h4 className="m-0 font-bold">{`${stat.date}`}</h4>
          <p className="m-0 font-light">{`${stat.count} cards reviewed`}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default CalendarDay;

// bg-primary-lighter bg-primary-light bg-primary bg-primary-dark bg-primary-darkest
