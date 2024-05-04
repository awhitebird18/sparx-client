import Modal from '@/layout/modal/Modal';
import { useEffect, useRef } from 'react';
import useYearlyStats from '../hooks/useYearlyStats';
import CalendarDay from './CalendarDay';

const CardCalendarModal = () => {
  const stats = useYearlyStats();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gridElement = gridRef.current;
    if (gridElement) {
      gridElement.scrollLeft = gridElement.scrollWidth;
    }
  }, []);

  return (
    <Modal title="Card Calendar" className="flex">
      <div
        className="grid grid-cols-1 pr-2 grid-rows-7 rounded-sm overflow-auto"
        style={{
          gap: '0.08rem',
          width: 'max-content',
          height: 'max-content',
        }}
      >
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={`${day}-${index}`} className="h-7 w-7 flex items-center justify-center">
            {day}
          </div>
        ))}
      </div>
      <div
        ref={gridRef}
        className="grid grid-cols-53 grid-rows-7 rounded-sm overflow-auto max-w-2xl pb-2 grid-flow-col"
        style={{
          gap: '0.08rem',
          width: 'max-content',
          height: 'max-content',
        }}
      >
        {stats.map((dayStat, index) => (
          <CalendarDay key={index} stat={dayStat} />
        ))}
      </div>
    </Modal>
  );
};

export default CardCalendarModal;
