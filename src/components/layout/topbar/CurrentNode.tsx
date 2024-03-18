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

  const uniqueNodes: HistoryItem[] = [];
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
  }, [history]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <h3 className="leftSide flex gap-3 items-center text-main whitespace-nowrap">
          {currentChannel ? currentChannel.name : 'Home'}
          <ChevronDown size={12} className="mt-1" />
        </h3>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-64 border border-border rounded-md bg-card p-0"
      >
        <div>
          <DropdownMenuLabel className="leading-none border-b border-border flex gap-4 bg-card font-medium h-12 px-4 items-center">
            Recently visited
          </DropdownMenuLabel>
          <div className="flex flex-col p-2 overflow-auto max-h-72">
            {Object.entries(populatedHistory).map(([date, items]: any) => (
              <div key={date}>
                <div className="h-9 flex items-center px-4 bg-background/50 font-medium text-xs rounded-sm">
                  {dayjs(date).format('MMMM D').toUpperCase()}
                </div>

                <div className="overflow-auto max-h-96">
                  {items.map((item: any) => (
                    <DropdownMenuItem
                      key={item.nodeId}
                      className="flex items-center gap-4 h-10 px-4 hover:bg-card-foreground"
                      onClick={() => handleNavigate(item)}
                    >
                      <Clock />
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
