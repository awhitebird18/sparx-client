import HistoryItemsDateGroup from './HistoryItemsDateGroup';
import { useHistoryStore } from '../hooks/useHistoryStore';

const HistoryItems = () => {
  const { finalHistoryFormat } = useHistoryStore();
  return (
    <div>
      {finalHistoryFormat.map(([date, items]) => (
        <HistoryItemsDateGroup date={date} items={items} />
      ))}
    </div>
  );
};

export default HistoryItems;
