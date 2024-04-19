import { history } from '@/utils/mockData';
import { StarFill } from 'react-bootstrap-icons';

const StatsPanel = () => {
  return (
    <div className=" flex flex-col rounded-xl overflow-hidden w-full gap-6 prose dark:prose-invert">
      <h3 className="flex items-center text-main">Progress</h3>
      <div className="flex flex-col gap-6">
        {history.map((entry: any, index: number) => (
          <div key={entry.uuid} className="flex gap-6 relative">
            <div className="rounded-full w-6 h-6 p-1.5  border border-complete-dark flex items-center justify-center relative shadow bg-background">
              {index !== history.length - 1 && (
                <div className="absolute left-1/2 bottom-0 translate-y-full -translate-x-1/2 h-11 w-1.5 bg-yellow-400/30" />
              )}

              <StarFill className="text-complete" size={20} />
            </div>
            <div className="flex flex-col">
              <h4 className="font-semibold leading-none mb-1.5 text-main">{`${entry.label}`}</h4>
              <p className="text-secondary text-sm">{`Completed ${entry.createdOn.format(
                'MMM DD YYYY, hh:mm a',
              )}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsPanel;
