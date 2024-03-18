import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import {
  BarChartFill,
  ClipboardCheckFill,
  PlusCircleFill,
  SearchHeartFill,
} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const Overview = () => {
  const { getCardCountDueForChannel, isLoading, setIsLoading } = useStore('flashcardStore');
  const { currentChannelId } = useStore('channelStore');
  const { setActiveModal } = useStore('modalStore');
  const navigate = useNavigate();
  const [cardCountDue, setCardCountDue] = useState<number>(0);

  const handleCreateFlashcard = () => {
    setActiveModal({ type: 'AddFlashcardModal', payload: null });
  };

  const handleStudyFlashcards = () => {
    navigate('/app/flashcards/study');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    if (!currentChannelId) return;
    const fn = async () => {
      setIsLoading(true);
      const count = await getCardCountDueForChannel(currentChannelId);

      setCardCountDue(count);

      setIsLoading(false);
    };

    fn();
  }, [currentChannelId, getCardCountDueForChannel]);

  return (
    <div className="w-full h-full overflow-auto flex flex-col p-8">
      <div className="w-full flex flex-col gap-8 h-full">
        <div className="flex items-start pt-4 justify-between">
          <div className="flex gap-6">
            {/* <Button className="card rounded-xl pointer-events-none opacity-70 h-18 w-18 bg-card border border-primary p-2 text-primary shadow-lg">
              <Stack size={50} />
            </Button> */}
            <div className="flex flex-col gap-1.5">
              <h2 className="text-main text-3xl font-medium">Flash Cards</h2>
              <p className="text-secondary">See all of your notes for workspace and make changes</p>
            </div>
          </div>
        </div>
        <div className="flex gap-10 h-full">
          {!isLoading ? (
            <div className="flex flex-col gap-6 card bg-card border-border shadow-md ring-1 ring-border/50 rounded-xl w-2/3 h-full prose p-6">
              <div className="flex gap-6 h-full items-center">
                <div className="flex flex-col items-center justify-center w-full gap-8">
                  <h2 className="text-6xl leading-tight spacing- text-center font-black bg-gradient-to-b from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">
                    {`${cardCountDue ? `${cardCountDue} Flashcards Due` : 'No flashcards due'}`}
                    {cardCountDue ? <span className="leading-normal block">today</span> : null}
                  </h2>

                  {cardCountDue ? (
                    <Button
                      size="lg"
                      className="text-xl font-medium"
                      onClick={handleStudyFlashcards}
                    >
                      Study Now
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      className="text-xl font-medium"
                      onClick={handleCreateFlashcard}
                    >
                      Add cards
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <Skeleton className="flex flex-col gap-6 card bg-card border-border shadow-md ring-1 ring-border/50 rounded-xl w-2/3 h-full prose p-6" />
          )}
          <div className="flex flex-col items-center gap-6 max-w-5xl flex-1 h-full">
            <Button
              variant="secondary"
              className="card h-full flex justify-start gap-6 items-center card py-8 px-10 flex-1 w-full prose shadow-md ring-1 ring-border/50"
              onClick={handleCreateFlashcard}
            >
              <div className="flex items-start gap-8">
                <div className="w-8 h-8">
                  <PlusCircleFill size={40} className="text-secondary" />
                </div>

                <div className="items-start text-left space-y-2">
                  <h3 className="text-secondary leading-none">
                    <span className="text-highlight">Add</span> Flashcards
                  </h3>
                  <p className="text-secondary">
                    Flashcards will be added to the spaced-repetition system
                  </p>
                </div>
              </div>
            </Button>
            <Button
              variant="secondary"
              className="card h-full flex justify-start gap-6 items-center card py-8 px-10 flex-1 w-full prose shadow-md ring-1 ring-border/50"
              onClick={() => handleNavigate('templates')}
            >
              <div className="flex items-start gap-8">
                <div className="w-8 h-8">
                  <ClipboardCheckFill size={40} className="text-secondary" />
                </div>

                <div className="items-start text-left space-y-2">
                  <h3 className="text-secondary leading-none">
                    <span className="text-red-300">Create</span> Template
                  </h3>
                  <p className="text-secondary">
                    Templates make creating flashcards more efficient
                  </p>
                </div>
              </div>
            </Button>
            <Button
              variant="secondary"
              className="card h-full gap-6 flex justify-start items-center card py-8 px-10 flex-1 w-full prose shadow-md ring-1 ring-border/50"
              onClick={() => handleNavigate('browse')}
            >
              <div className="flex items-start gap-8">
                <div className="w-8 h-8">
                  <SearchHeartFill size={40} className="text-secondary" />
                </div>

                <div className="text-left space-y-2">
                  <h3 className="text-secondary leading-none">
                    <span className="text-green-300">Browse</span> Flashcards
                  </h3>
                  <p className="text-secondary">Review and update your list of flashcards</p>
                </div>
              </div>
            </Button>
            <Button
              variant="secondary"
              className="card h-full flex justify-start gap-6 items-center card py-8 px-10 flex-1 w-full prose shadow-md ring-1 ring-border/50"
              onClick={() => handleNavigate('stats')}
            >
              <div className="flex items-start gap-8">
                <div className="w-8 h-8">
                  <BarChartFill size={40} className="text-secondary" />
                </div>
                <div className="text-left space-y-2">
                  <h3 className="text-secondary leading-none">
                    <span className="text-teal-300">View</span> Stats
                  </h3>
                  <p className="text-secondary">
                    Gain insights into how you are doing with detailed stats
                  </p>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Overview);
