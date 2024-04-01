import Modal from '@/components/modal/Modal';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';

const CardCalendarModal = () => {
  const { getYearlyStats } = useStore('flashcardStore');
  const [stats, setStats] = useState<any>([]);

  const gridRef = useRef(null);

  useEffect(() => {
    // Scroll to the right after the component mounts
    const gridElement: any = gridRef.current;
    if (gridElement) {
      gridElement.scrollLeft = gridElement.scrollWidth;
    }
  }, []);

  useEffect(() => {
    const fn = async () => {
      const data = await getYearlyStats();

      setStats(data);
    };

    fn();
  }, [getYearlyStats]);

  // Function to determine color based on count
  const getColor = (count: any) => {
    if (count > 20) return 'bg-primary-lighter';
    if (count > 15) return 'bg-primary-light';
    if (count > 10) return 'bg-primary';
    if (count > 5) return 'bg-primary-dark';
    if (count > 0) return 'bg-primary-darkest';
    return 'bg-card';
  };

  return (
    <Modal title="Card Calendar">
      <div className="flex ">
        <div
          className="grid grid-cols-1 pr-2 grid-rows-7 rounded-sm overflow-auto"
          style={{
            gap: '0.08rem',
            width: 'max-content',
            height: 'max-content',
          }}
        >
          <div className={`h-7 w-7 flex items-center justify-center`}>S</div>
          <div className={`h-7 w-7 flex items-center justify-center`}>M</div>
          <div className={`h-7 w-7 flex items-center justify-center`}>T</div>
          <div className={`h-7 w-7 flex items-center justify-center`}>W</div>
          <div className={`h-7 w-7 flex items-center justify-center`}>T</div>
          <div className={`h-7 w-7 flex items-center justify-center`}>F</div>
          <div className={`h-7 w-7 flex items-center justify-center`}>S</div>
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
          {stats.map((dayStat: any, index: number) => (
            <Tooltip>
              <TooltipTrigger>
                <div
                  key={index}
                  className={`h-7 w-7 ${getColor(dayStat.count)} flex-shrink-0 `}
                  // style={{ opacity: dayStat.count ? 1 : 0.3 }}
                  // title={`Date: ${dayStat.date}, Count: ${dayStat.count}`}
                />
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex flex-col items-center">
                  <h4 className="m-0 font-bold">{`${dayStat.date}`}</h4>
                  <p className="m-0 font-light">{`${dayStat.count} cards reviewed`}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default observer(CardCalendarModal);