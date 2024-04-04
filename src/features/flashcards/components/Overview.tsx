import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {
  BarChartFill,
  ClipboardCheckFill,
  PlusCircleFill,
  SearchHeartFill,
} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const Overview = () => {
  const { getCardCountDueForChannel, isLoading, setIsLoading, cardsDue } =
    useStore('flashcardStore');
  const { currentChannelId } = useStore('channelStore');
  const { setActiveModal } = useStore('modalStore');
  const navigate = useNavigate();

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
      await getCardCountDueForChannel(currentChannelId);

      setIsLoading(false);
    };

    fn();
  }, [currentChannelId, getCardCountDueForChannel, setIsLoading]);

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
            <div className="flex flex-col gap-6 prose p-6 w-full bg-card h-full rounded-2xl border border-border card">
              <div className="flex gap-6 h-full items-center">
                <div className="flex flex-col items-center justify-center w-full gap-8">
                  <h2 className="text-6xl leading-tight spacing- text-center font-black bg-gradient-to-b from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">
                    {`${cardsDue ? `${cardsDue} Flashcards Due` : 'No flashcards due'}`}
                    {cardsDue ? <span className="leading-normal block">today</span> : null}
                  </h2>

                  {cardsDue ? (
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
            <Skeleton className="flex flex-col gap-6 card bg-card border-border rounded-xl w-full h-full prose p-6" />
          )}

          <div className="flex flex-col items-center gap-4 w-fit h-min flex-wrap mx-auto">
            <Button
              variant="secondary"
              className="card flex items-start justify-center gap-6 card p-6 flex-1 w-full prose rounded-2xl"
              onClick={handleCreateFlashcard}
            >
              <div className="w-8 h-8">
                <PlusCircleFill size={36} className="text-muted" />
              </div>

              <div className="items-start text-left space-y-2">
                <h3 className="text-secondary leading-none">
                  <span className="text-purple-400">Add</span> Flashcards
                </h3>
                <p className="text-secondary">
                  Flashcards will be added to the spaced-repetition system
                </p>
              </div>
            </Button>
            <Button
              variant="secondary"
              className="card flex items-start justify-center gap-6 card p-6 flex-1 w-full prose rounded-2xl"
              onClick={() => handleNavigate('templates')}
            >
              <div className="flex items-start gap-8">
                <div className="w-8 h-8">
                  <ClipboardCheckFill size={40} className="text-muted" />
                </div>

                <div className="text-left space-y-2">
                  <h3 className="text-secondary leading-none">
                    <span className="text-red-400">Create</span> Template
                  </h3>
                  <p className="text-secondary">
                    Templates make creating flashcards more efficient
                  </p>
                </div>
              </div>
            </Button>
            <Button
              variant="secondary"
              className="card flex items-start justify-center gap-6 card p-6 flex-1 w-full prose rounded-2xl"
              onClick={() => handleNavigate('browse')}
            >
              <div className="flex items-start gap-8">
                <div className="w-8 h-8">
                  <SearchHeartFill size={40} className="text-muted" />
                </div>

                <div className="text-left space-y-2">
                  <h3 className="text-secondary leading-none">
                    <span className="text-green-400">Browse</span> Flashcards
                  </h3>
                  <p className="text-secondary">Review and update your list of flashcards</p>
                </div>
              </div>
            </Button>
            <Button
              variant="secondary"
              className="card flex items-start justify-center gap-6 card p-6 flex-1 w-full prose rounded-2xl"
              onClick={() => handleNavigate('stats')}
            >
              <div className="flex items-start gap-8">
                <div className="w-8 h-8">
                  <BarChartFill size={40} className="text-muted" />
                </div>
                <div className="text-left space-y-2">
                  <h3 className="text-secondary leading-none">
                    <span className="text-teal-400">View</span> Stats
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
