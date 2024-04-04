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

  const historyArr = Object.entries(populatedHistory);

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
        className="max-w-[28rem] border border-border rounded-md bg-card p-0"
      >
        <div>
          <DropdownMenuLabel className="border-b border-border flex gap-3 bg-card font-semibold h-12 px-6 items-center">
            <Clock size={15} />
            Recently visited
          </DropdownMenuLabel>
          <div className="flex flex-col overflow-auto max-h-96 p-2 py-2">
            {historyArr.length ? (
              historyArr.map(([date, items]: any) => (
                <div key={date}>
                  <div className="card bg-card flex px-4 items-center h-8 text-sm tracking-wide">
                    {dayjs(date).format('MMMM Ddd')}
                  </div>

                  <div className="overflow-auto max-h-96">
                    {items.map((item: any) => {
                      const timeString = dayjs(item.timestamp).format('h:mm a');

                      return (
                        <DropdownMenuItem
                          key={item.nodeId}
                          className="flex items-center gap-12 h-11 px-4 w-full justify-between hover:bg-hover rounded-lg truncate text-secondary text-base"
                          onClick={() => handleNavigate(item)}
                        >
                          <div className="flex items-center gap-3 ">
                            <Clock size={15} />
                            <div className="flex items-center gap-2">
                              Visited
                              <span className="text-highlight text-base font-semibold">
                                {item.name}
                              </span>
                            </div>
                          </div>
                          <span className="text-sm">{timeString}</span>
                        </DropdownMenuItem>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-5 py-3 text-secondary">No recent channels to show.</div>
            )}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default observer(CurrentNode);
