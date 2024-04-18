import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import {
  FilePlus,
  ArrowRightCircle,
  ArrowLeftCircle,
  CalendarHeart,
  PieChart,
  ChevronLeft,
} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const Stats = () => {
  const { setActiveModal } = useStore('modalStore');
  const { getCardCountReviewedToday } = useStore('flashcardStore');
  const [cardsStudiedCount, setCardsStudiedCount] = useState(0);
  const navigate = useNavigate();

  const handleViewStat = (modalType: any) => {
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
      {/* <div className="flex pt-4 gap-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex gap-2 items-center">
            <Button className="w-fit gap-2 h-8" size="sm" onClick={handleClickBack}>
              <ChevronLeft size={13} /> Go Back
            </Button>
            <h2 className="text-main text-3xl font-medium">Flashcard Stats</h2>
          </div>
          <p className="text-secondary">See all of your notes for workspace and make changes</p>
        </div>
      </div> */}
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
};

export default observer(Stats);

const OverviewCard = ({ className, cardCount }: { className?: string; cardCount: number }) => {
  return (
    <div
      className={`flex items-center justify-center h-full min-h-[30rem] p-6 ${className} rounded-xl bg-hover shadow card`}
    >
      <div className="flex flex-col items-center">
        <h2 className="text-5xl leading-8 text-center font-black bg-gradient-to-b from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">
          {`Studied ${cardCount} cards`}
          <span className="leading-normal block">today</span>
        </h2>
        {/* <p className="text-xl font-semibold">in 12.78s</p> */}
      </div>
    </div>
  );
};

const Card = ({
  icon,
  title,
  color,
  description,
  className,
  onClick,
}: {
  title: string;
  color: string;
  description: string;
  icon: JSX.Element;
  className: string;
  onClick: () => void;
}) => {
  return (
    <div
      className={`flex-col items-start h-full text-left p-6 px-10 shadow rounded-xl ${className} bg-hover card break-words shadow-md hover:bg-card cursor-pointer`}
      onClick={onClick}
    >
      <div>{icon}</div>
      <h4 className={`${color} text-xl font-bold mt-4 mb-2 w-full`}>{title}</h4>
      <p className="text-left">{description}</p>
    </div>
  );
};
