import { useStore } from '@/stores/RootStore';
import { useEffect, useState } from 'react';
import assistantApi from '@/features/assistant/api';
import { Button } from '@/components/ui/Button';
import { ChevronLeft } from 'react-bootstrap-icons';
import MessageDisplay from '@/features/messageInput/MessageDisplay';
import { observer } from 'mobx-react-lite';
import { FlashcardIdea } from '../types/flashcardIdea';

const GenerateFlashcards = observer(() => {
  const [flashcards, setFlashcards] = useState<FlashcardIdea[]>([]);
  const { selectedNoteId } = useStore('noteStore');
  const { setIsLoading, setScreen } = useStore('assistantStore');
  const { currentChannelId } = useStore('channelStore');

  const handleClickBack = () => {
    setIsLoading(false);
    setFlashcards([]);
    setScreen(undefined);
  };

  useEffect(() => {
    const handleGenerateFlashcards = async () => {
      try {
        if (!selectedNoteId || !currentChannelId) return;
        setIsLoading(true);
        const flashcards = await assistantApi.generateFlashcardIdeas(
          selectedNoteId,
          currentChannelId,
        );
        setFlashcards(flashcards);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    handleGenerateFlashcards();
  }, [selectedNoteId, setIsLoading, currentChannelId]);

  return (
    <div className="flex flex-col gap-4 pr-2 prose dark:prose-invert">
      {/* Header */}
      <div className="flex gap-3 items-center">
        <Button variant="outline" className="gap-2 h-8" size="sm" onClick={handleClickBack}>
          <ChevronLeft size={12} /> Back
        </Button>
        <h3>Here is what I came up with...</h3>
      </div>

      {/* Results */}
      <div className="flex flex-col gap-6">
        {flashcards.map((flashcard) => {
          return (
            <div
              key={flashcard.uuid}
              className="flex flex-col gap-2 text-main bg-hover rounded-lg p-3"
            >
              <MessageDisplay
                content={JSON.stringify(flashcard.front)}
                id={flashcard.uuid}
                key={flashcard.uuid}
              />
              <MessageDisplay
                content={JSON.stringify(flashcard.back)}
                id={flashcard.uuid}
                key={flashcard.uuid}
              />

              <Button variant="outline" size="sm" className="mt-3">
                Add Flashcard
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default GenerateFlashcards;
