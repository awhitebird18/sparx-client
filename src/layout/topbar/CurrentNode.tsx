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
import { NavigationHistoryItem } from '@/hooks/types/navigationHistoryItem';

dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

type PopulatedHistory = {
  [date: string]: {
    timestamp: number;
    primaryView: string;
    nodeId: string;
    name?: string;
  }[];
};

type RenderHistory = [
  string,
  {
    timestamp: number;
    primaryView: string;
    nodeId: string;
    name?: string;
  }[],
][];

const CurrentNode = observer(() => {
  const { currentChannel, setCurrentChannelUuid, findChannelByUuid } = useStore('channelStore');
  const history = useHistoryState();
  const { setTitle } = useStore('notificationStore');

  const handleNavigate = (node: NavigationHistoryItem) => {
    setCurrentChannelUuid(node.nodeId);

    if (!node.name) return;
    setTitle(node.name);
  };

  const sortedArray: NavigationHistoryItem[] = useMemo(
    () =>
      history.sort(
        (a: NavigationHistoryItem, b: NavigationHistoryItem) => b.timestamp - a.timestamp,
      ),
    [history],
  );

  const uniqueNodes: NavigationHistoryItem[] = useMemo(() => {
    const seenNodeIds = new Set();
    return sortedArray
      .filter((item: NavigationHistoryItem) => {
        if (!seenNodeIds.has(item.nodeId)) {
          seenNodeIds.add(item.nodeId);
          const nodeName = findChannelByUuid(item.nodeId)?.name;
          if (nodeName) {
            return true;
          }
        }
        return false;
      })
      .map((item) => ({
        ...item,
        name: findChannelByUuid(item.nodeId)?.name,
      }));
  }, [sortedArray, findChannelByUuid]);

  const populatedHistory: PopulatedHistory = useMemo(
    () =>
      uniqueNodes.reduce((acc: PopulatedHistory, item: NavigationHistoryItem) => {
        const dateKey = dayjs(item.timestamp).format('YYYY-MM-DD');
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(item);
        return acc;
      }, {}),
    [uniqueNodes],
  );

  const historyArr: RenderHistory = Object.entries(populatedHistory);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="fixed flex items-center gap-3 top-2 left-1/2 -translate-x-1/2 z-30 cursor-pointer w-min h-12 p-1 max-w-sm prose dark:prose-invert">
        <h3 className="text-main truncate">{currentChannel?.name}</h3>
        <ChevronDown size={15} className="mt-1 flex-shrink-0 text-secondary" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-[28rem] border border-border rounded-md bg-card p-0"
        sideOffset={5}
      >
        <div>
          <DropdownMenuLabel className="border-b border-border flex gap-3 bg-card font-semibold h-12 px-6 items-center">
            <Clock size={15} />
            Recently visited
          </DropdownMenuLabel>
          <div className="flex flex-col p-2 py-2 overflow-auto max-h-96">
            {historyArr.length ? (
              historyArr.map(([date, items]) => {
                const historyDate = dayjs(date);

                const isToday = dayjs().isSame(historyDate, 'date');

                return (
                  <div key={Math.floor(Math.random())}>
                    <div className="card bg-card flex px-4 items-center h-8 text-sm tracking-wide">
                      {historyDate.format('MMMM Do')}
                    </div>

                    <div>
                      {items.map((item) => {
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
});

export default CurrentNode;
