import dayjs from 'dayjs';
import { HistoryItem } from '../types';
import HistoryDropdownItem from './HistoryDropdownItem';

type Props = {
  items: HistoryItem[];
  date: string;
};

const HistoryItemsDateGroup = ({ items, date }: Props) => {
  {
    const historyDate = dayjs(date);
    const isToday = dayjs().isSame(historyDate, 'date');

    return (
      <div key={Math.floor(Math.random())}>
        <div className="bg-card flex px-4 items-center h-8 text-sm tracking-wide">
          {historyDate.format('MMMM Do')}
        </div>

        <div>
          {items.map((item) => (
            <HistoryDropdownItem item={item} isToday={isToday} />
          ))}
        </div>
      </div>
    );
  }
};

export default HistoryItemsDateGroup;
