import React, { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import EmptyFallback from '@/components/EmptyFallback';
import SearchFilters from './SearchFilters';
import FlashcardsTable from './FlashcardsTable';

const Browse: React.FC = observer(() => {
  const { getChannelCardDetails, channelCardDetails } = useStore('flashcardStore');
  const { currentChannelId, currentChannel } = useStore('channelStore');
  const { setMainPanel } = useStore('mainPanelStore');

  const handleAddFlashcard = () => {
    setMainPanel({ type: 'addFlashcard', payload: null });
  };

  useEffect(() => {
    if (!currentChannelId) return;
    getChannelCardDetails(currentChannelId);
  }, [currentChannelId, getChannelCardDetails]);

  return (
    <div className="flex-1 flex flex-col gap-8 h-full prose relative">
      {channelCardDetails.length ? (
        <div className="rounded-xl flex flex-col items-center text-main gap-4">
          <div className="flex justify-between items-center w-full py-0">
            <SearchFilters />
            <Button className="gap-2 ml-auto h-9 rounded-lg" onClick={handleAddFlashcard}>
              Add Flashcard
            </Button>
          </div>
          <FlashcardsTable />
        </div>
      ) : (
        <EmptyFallback
          title="No Flashcards Found."
          description={`All of your ${currentChannel?.name} flashcards will appear here.`}
          action={{
            title: 'Create a new flashcard',
            callback: handleAddFlashcard,
          }}
        />
      )}
    </div>
  );
});

export default Browse;
