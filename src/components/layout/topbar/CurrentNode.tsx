import { ChevronDown, Clock } from 'react-bootstrap-icons';
import { observer } from 'mobx-react-lite';
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/DropdownMenu';

import { useStore } from '@/stores/RootStore';

import useHistoryState from '@/hooks/useHistoryState';
import { useMemo } from 'react';
import dayjs from 'dayjs';

type HistoryItem = {
  nodeId: string;
  primaryView: string;
  timestamp: number;
  name?: string;
};

const CurrentNode = () => {
  const { currentChannel, setCurrentChannelUuid, findChannelByUuid } = useStore('channelStore');
  const history = useHistoryState();

  const { setTitle } = useStore('notificationStore');

  const handleNavigate = (node: any) => {
    setCurrentChannelUuid(node.nodeId);

    setTitle(node.name);
  };

  // Assuming 'array' is your input array of objects
  const sortedArray = history.sort((a: HistoryItem, b: HistoryItem) => b.timestamp - a.timestamp);

  const uniqueNodes: HistoryItem[] = useMemo(() => [], []);
  const seenNodeIds = new Set();

  sortedArray.forEach((item: HistoryItem) => {
    if (!seenNodeIds.has(item.nodeId)) {
      const nodeName = findChannelByUuid(item.nodeId)?.name;

      if (nodeName) {
        uniqueNodes.push({ ...item, name: nodeName });
      }
      seenNodeIds.add(item.nodeId);
    }
  });

  const populatedHistory = useMemo(() => {
    return uniqueNodes.reduce((acc: any, item: any) => {
      const dateKey = dayjs(item.timestamp).format('YYYY-MM-DD'); // Adjust format as needed
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(item);
      return acc;
    }, {});
  }, [uniqueNodes]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <h3 className="leftSide flex gap-3 items-center text-main overflow-hidden w-min max-w-sm">
          <span className="truncate">{currentChannel?.name}</span>
          <ChevronDown size={12} className="mt-1 flex-shrink-0" />
        </h3>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-80 border border-border rounded-md bg-card p-0"
      >
        <div>
          <DropdownMenuLabel className="leading-none border-b border-border flex gap-4 bg-card font-normal h-12 px-4 items-center">
            <Clock size={15} />
            Recently visited
          </DropdownMenuLabel>
          <div className="flex flex-col overflow-auto max-h-96 p-2 py-4 gap-5">
            {Object.entries(populatedHistory).map(([date, items]: any) => (
              <div key={date}>
                <div className="card bg-card flex items-center justify-center px-4 py-0.5 rounded-2xl tracking-wide text-sm text-card-border mx-auto border border-border w-fit mb-2">
                  {dayjs(date).format('ddd MMMM D')}
                </div>

                <div className="overflow-auto max-h-96">
                  {items.map((item: any) => (
                    <DropdownMenuItem
                      key={item.nodeId}
                      className="flex items-center gap-4 h-11 px-4 hover:bg-hover rounded-lg truncate text-sm"
                      onClick={() => handleNavigate(item)}
                    >
                      <Clock size={15} />
                      {item.name}
                    </DropdownMenuItem>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default observer(CurrentNode);
