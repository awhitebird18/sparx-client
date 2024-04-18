// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { CompletionStatus } from '@/features/channels/enums/completionStatus';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { ChevronLeft, CupHot, Play, StarFill } from 'react-bootstrap-icons';

const NodeStats = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { userChannelData, subscribedChannels } = useStore('channelStore');

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const channelCount = subscribedChannels.length;

  const stats = userChannelData
    .filter((channel: any) => channel.type !== 'direct')
    .reduce(
      (acc: any, channel: any) => {
        // Increment the count for the respective status
        acc[channel.status] = (acc[channel.status] || 0) + 1;
        return acc;
      },
      { complete: 0, hold: 0, progress: 0, skip: 0 },
    );

  if (!stats[CompletionStatus.Complete]) stats[CompletionStatus.Complete] = 0;
  if (!stats[CompletionStatus.OnHold]) stats[CompletionStatus.OnHold] = 0;
  if (!stats[CompletionStatus.Skip]) stats[CompletionStatus.Skip] = 0;
  if (!stats[CompletionStatus.InProgress]) stats[CompletionStatus.InProgress] = 0;

  const completionPercentage =
    channelCount === 0 ? 0 : Math.round((stats[CompletionStatus.Complete] / channelCount) * 100);

  return (
    <div className="card rounded-md flex gap-2.5 shadow-lg   whitespace-nowrap items-center fixed bottom-2 left-2 bg-card p-1 pr-5">
      <div className="flex items-center gap-1.5 bg-primary-transparent border border-primary flex-shrink-0 h-9 w-14 justify-center rounded-md text-main">
        {`${completionPercentage}%`}
      </div>

      <div
        className={`flex items-center whitespace-nowrap gap-2.5 transition-all ease-in-out duration-300 ${
          isOpen ? 'max-w-lg' : 'max-w-0'
        } overflow-hidden`}
      >
        <div className="flex-shrink-0 whitespace-nowrap flex items-center gap-1.5 h-10 w-12 justify-center rounded-md">
          {`${stats[CompletionStatus.Complete]}`}
          <StarFill className="text-yellow-400" />
        </div>
        <div className="flex-shrink-0 whitespace-nowrap flex items-center gap-1.5 h-10 w-12 justify-center rounded-md">
          {`${stats[CompletionStatus.OnHold]}`}
          <CupHot />
        </div>
        <div className="flex-shrink-0 whitespace-nowrap flex items-center gap-1.5 h-10 w-12 justify-center rounded-md">
          {`${stats[CompletionStatus.InProgress]}`}
          <Play />
        </div>
      </div>

      <Button
        onClick={handleToggleOpen}
        className="card absolute -right-3 top-1/2 -translate-y-1/2 h-7 w-7 p-0.5 ml-auto bg-card !border-border"
        variant="default"
      >
        <ChevronLeft
          className={`transition-transform transform duration-300 text-muted ${
            !isOpen && 'rotate-180'
          }`}
        />
      </Button>
    </div>
  );
};

export default observer(NodeStats);
