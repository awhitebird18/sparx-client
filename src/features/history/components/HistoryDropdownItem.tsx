import { useStore } from '@/stores/RootStore';
import dayjs from 'dayjs';
import { HistoryItem } from '../types';
import { DropdownMenuItem } from '@/components/ui/DropdownMenu';
import { Clock } from 'react-bootstrap-icons';

type Props = {
  item: HistoryItem;
  isToday: boolean;
};

const HistoryDropdownItem = ({ item, isToday = false }: Props) => {
  const { setCurrentChannelUuid, findChannelByUuid } = useStore('channelStore');
  const { setTitle } = useStore('notificationStore');

  const handleSelectHistoryItem = (node: HistoryItem) => {
    setCurrentChannelUuid(node.nodeId);

    const channelFound = findChannelByUuid(node.nodeId);
    if (!channelFound) return;
    setTitle(channelFound.name);
  };

  const itemTimeObj = dayjs(item.timestamp);
  const channelFound = findChannelByUuid(item.nodeId);

  return (
    <DropdownMenuItem
      key={Math.random() * 1000}
      className="flex items-center gap-12 h-11 px-4 w-full justify-between hover:bg-hover rounded-lg truncate text-secondary text-sm"
      onClick={() => handleSelectHistoryItem(item)}
    >
      <div className="flex items-center gap-3 ">
        <Clock size={15} />
        <div className="flex items-center gap-2">
          Visited
          <span className="text-highlight font-semibold">{channelFound?.name}</span>
        </div>
      </div>
      {isToday ? itemTimeObj.fromNow() : itemTimeObj.format('HH:MM p')}
    </DropdownMenuItem>
  );
};

export default HistoryDropdownItem;
