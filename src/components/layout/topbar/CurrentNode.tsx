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
import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

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

  // Sort history by timestamp in descending order
  const sortedArray = useMemo(
    () => history.sort((a: HistoryItem, b: HistoryItem) => b.timestamp - a.timestamp),
    [history],
  );

  // Compute uniqueNodes based on sortedArray
  const uniqueNodes = useMemo(() => {
    const seenNodeIds = new Set();
    return sortedArray
      .filter((item: HistoryItem) => {
        if (!seenNodeIds.has(item.nodeId)) {
          seenNodeIds.add(item.nodeId);
          const nodeName = findChannelByUuid(item.nodeId)?.name;
          if (nodeName) {
            return true; // Keep this item
          }
        }
        return false; // Exclude this item
      })
      .map((item) => ({
        ...item,
        name: findChannelByUuid(item.nodeId)?.name,
      }));
  }, [sortedArray, findChannelByUuid]);

  // Create the populated history structure
  const populatedHistory = useMemo(
    () =>
      uniqueNodes.reduce((acc: any, item: HistoryItem) => {
        const dateKey = dayjs(item.timestamp).format('YYYY-MM-DD'); // Adjust format as needed
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(item);
        return acc;
      }, {}),
    [uniqueNodes],
  );

  const historyArr = Object.entries(populatedHistory);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <h3 className="leftSide flex gap-3 items-center text-main w-min max-w-sm">
          <span className="truncate">{currentChannel?.name}</span>
          <ChevronDown size={12} className="mt-1 flex-shrink-0" />
        </h3>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="max-w-[28rem] border border-border rounded-md bg-card p-0"
      >
        <div>
          <DropdownMenuLabel className="border-b border-border flex gap-3 bg-card font-semibold h-12 px-6 items-center">
            <Clock size={15} />
            Recently visited
          </DropdownMenuLabel>
          <div className="flex flex-col p-2 py-2 overflow-auto max-h-96">
            {historyArr.length ? (
              historyArr.map(([date, items]: any) => {
                const historyDate = dayjs(date);

                const isToday = dayjs().isSame(historyDate, 'date');

                return (
                  <div key={Math.floor(Math.random())}>
                    <div className="card bg-card flex px-4 items-center h-8 text-sm tracking-wide">
                      {historyDate.format('MMMM Do')}
                    </div>

                    <div>
                      {items.map((item: any) => {
                        const itemTimeObj = dayjs(item.timestamp);

                        return (
                          <DropdownMenuItem
                            key={Math.random() * 1000}
                            className="flex items-center gap-12 h-11 px-4 w-full justify-between hover:bg-hover rounded-lg truncate text-secondary text-sm"
                            onClick={() => handleNavigate(item)}
                          >
                            <div className="flex items-center gap-3 ">
                              <Clock size={15} />
                              <div className="flex items-center gap-2">
                                Visited
                                <span className="text-highlight font-semibold">{item.name}</span>
                              </div>
                            </div>
                            {isToday ? itemTimeObj.fromNow() : itemTimeObj.format('HH:MM p')}
                          </DropdownMenuItem>
                        );
                      })}
                    </div>
                  </div>
                );
              })
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
