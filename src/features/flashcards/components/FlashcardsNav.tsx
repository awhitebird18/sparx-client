import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {
  BarChartFill,
  BookFill,
  ClipboardCheckFill,
  PlusCircleFill,
  SearchHeartFill,
} from 'react-bootstrap-icons';

const FlashcardsNav = () => {
  const { getCardCountDueForChannel, setIsLoading, cardsDue } = useStore('flashcardStore');
  const { currentChannelId } = useStore('channelStore');
  const { setMainPanel } = useStore('mainPanelStore');
  const { setSidePanelComponent } = useStore('sidePanelStore');

  const handleCreateFlashcard = () => {
    setMainPanel({ type: 'addFlashcard' });
  };

  const handleStudyFlashcards = () => {
    // if (!cardsDue) return;
    setMainPanel({ type: 'studyFlashcards' });
  };

  const handleViewFlashcardTemplates = () => {
    setMainPanel({ type: 'flashcardTemplates' });
  };

  const handleBrowseFlashcards = () => {
    setMainPanel({ type: 'browseFlashcards' });
  };

  const handleViewFlashcardStats = () => {
    setMainPanel({ type: 'flashcardStats' });
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

  const navOptions = [
    {
      title: 'Study Flashcards',
      description: `${cardsDue ? `${cardsDue} Flashcards Due` : 'No flashcards due'}`,
      icon: <BookFill size={16} />,
      color: 'text-purple-300',
      onClick: handleStudyFlashcards,
    },
    {
      title: 'Add Flashcards',
      // description: 'Flashcards will be added to the spaced-repetition system',
      icon: <PlusCircleFill size={16} />,
      color: 'text-purple-300',
      onClick: handleCreateFlashcard,
    },
    {
      title: 'Create Template',
      // description: 'Templates make creating flashcards more efficient',
      icon: <ClipboardCheckFill size={16} />,
      color: 'text-red-300',
      onClick: handleViewFlashcardTemplates,
    },
    {
      title: 'Browse Flashcards',
      // description: 'Review and update your list of flashcards',
      icon: <SearchHeartFill size={16} />,
      color: 'text-green-300',
      onClick: handleBrowseFlashcards,
    },
    {
      title: 'View Stats',
      // description: 'Gain insights into how you are doing with detailed stats',
      icon: <BarChartFill size={16} />,
      color: 'text-teal-300',
      onClick: handleViewFlashcardStats,
    },
  ];

  return (
    <div className="w-full overflow-auto flex flex-col gap-5 prose dark:prose-invert">
      <h3>Quick links</h3>
      {navOptions.map((option) => (
        <Button
          variant="ghost"
          className="card flex items-center justify-between card p-2 flex-1 w-full h-min"
          onClick={option.onClick}
        >
          <div className="flex gap-3 items-center text-left prose dark:prose-invert text-main">
            {option.icon}
            <p className="text-main leading-none !m-0">{option.title}</p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="text-secondary">{option.description}</p>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default observer(FlashcardsNav);
