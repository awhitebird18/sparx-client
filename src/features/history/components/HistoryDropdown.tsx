import { ChevronDown, Clock } from 'react-bootstrap-icons';
import { observer } from 'mobx-react-lite';
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
} from '@/components/ui/DropdownMenu';
import { useStore } from '@/stores/RootStore';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { useHistoryStore } from '../hooks/useHistoryStore';
import useUpdateHistory from '../hooks/useUpdateHistory';
import HistoryItems from './HistoryItems';

dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

const HistoryDropdown = observer(() => {
  useUpdateHistory();
  const { currentChannel } = useStore('channelStore');
  const { finalHistoryFormat } = useHistoryStore();

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
        <DropdownMenuLabel className="border-b border-border flex gap-3 bg-card font-semibold h-12 px-6 items-center">
          <Clock size={15} />
          Recently visited
        </DropdownMenuLabel>
        <div className="flex flex-col p-2 py-2 overflow-auto max-h-96">
          {finalHistoryFormat.length ? (
            <HistoryItems />
          ) : (
            <div className="px-5 py-3 text-secondary">No recent channels to show.</div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default HistoryDropdown;
