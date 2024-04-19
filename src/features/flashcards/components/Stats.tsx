import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import {
  FilePlus,
  ArrowRightCircle,
  ArrowLeftCircle,
  CalendarHeart,
  PieChart,
} from 'react-bootstrap-icons';
import { Card } from './Card';
import OverviewCard from './OverviewCard';
import { ModalName } from '@/layout/modal/modalList';

const Stats = observer(() => {
  const { setActiveModal } = useStore('modalStore');
  const { getCardCountReviewedToday } = useStore('flashcardStore');
  const [cardsStudiedCount, setCardsStudiedCount] = useState(0);

  const handleViewStat = (modalType: ModalName) => {
    setActiveModal({ type: modalType, payload: null });
  };

  useEffect(() => {
    const fn = async () => {
      const count = await getCardCountReviewedToday();

      if (!count) return;

      setCardsStudiedCount(count);
    };

    try {
      fn();
    } catch (e) {
      console.error(e);
    }
  }, [getCardCountReviewedToday]);

  return (
    <div className="flex flex-col w-full h-full justify-center gap-10 overflow-hidden">
      <div className="h-full overflow-auto pr-3">
        <div className="flex flex-col xl:grid grid-cols-12 grid-rows-3 gap-8 w-full overflow-auto">
          <OverviewCard className="col-span-6 row-span-2" cardCount={cardsStudiedCount} />

          <Card
            icon={<FilePlus size={40} />}
            title="Cards Added"
            color="text-sky-500"
            description="You added 10 new cards. There were 72 cards added collectively today."
            className="col-span-6 row-span-1"
            onClick={() => handleViewStat('NewCardsModal')}
          />

          <Card
            icon={<ArrowRightCircle size={40} />}
            title="Future Due"
            color="text-emerald-500"
            description="As per the current forecast, you have 100 card reviews scheduled for tomorrow!"
            className="col-span-6 row-span-1"
            onClick={() => handleViewStat('FutureDueModal')}
          />

          <Card
            icon={<ArrowLeftCircle size={40} />}
            title="Cards Reviewed"
            color="text-rose-500"
            description="You added 10 new cards. There were 72 cards added collectively today."
            className="col-start-1 col-end-6 row-span-1"
            onClick={() => handleViewStat('CardsReviewedModal')}
          />

          <Card
            icon={<CalendarHeart size={40} />}
            title="Calendar"
            color="text-yellow-500"
            description="See how consistent you have been throughout the year!"
            className="col-start-6 col-end-13 row-span-1"
            onClick={() => handleViewStat('CardCalendarModal')}
          />

          <Card
            icon={<PieChart size={40} />}
            title="Card Counts"
            color="text-fuchsia-500"
            description="You added 10 new cards. There were 72 cards added collectively today."
            className="row-span-1 row-start-4 col-start-1 col-span-full"
            onClick={() => handleViewStat('CardCountModal')}
          />
        </div>
      </div>
    </div>
  );
});

export default Stats;
