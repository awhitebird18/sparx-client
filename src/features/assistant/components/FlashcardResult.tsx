import { Button } from '@/components/ui/Button';
import MessageDisplay from '@/features/messageInput/MessageDisplay';
import { FlashcardIdea } from '../types/flashcardIdea';
import { observer } from 'mobx-react-lite';
import { useAssistantStore } from '../hooks/useAssistantStore';
import { useEffect } from 'react';
import { useStore } from '@/stores/RootStore';

const FlashcardResults = observer(() => {
  const { flashcardIdeas, getFlashcardIdeasFromNote } = useAssistantStore();
  const { selectedNoteId } = useStore('noteStore');
  const { currentChannelId } = useStore('channelStore');

  useEffect(() => {
    if (!selectedNoteId || !currentChannelId) return;

    const handleGenerateFlashcardIdeasFromNote = async () => {
      getFlashcardIdeasFromNote(selectedNoteId, currentChannelId);
    };
    handleGenerateFlashcardIdeasFromNote();
  }, [currentChannelId, getFlashcardIdeasFromNote, selectedNoteId]);

  return (
    <div className="flex flex-col gap-6">
      {flashcardIdeas.map((flashcard) => (
        <FlashcardResult key={flashcard.uuid} flashcardIdea={flashcard} />
      ))}
    </div>
  );
});

type FlashcardResultProps = {
  flashcardIdea: FlashcardIdea;
};
const FlashcardResult = ({ flashcardIdea }: FlashcardResultProps) => (
  <div className="flex flex-col gap-2 text-main bg-hover rounded-lg p-3">
    <MessageDisplay content={flashcardIdea.front} id={flashcardIdea.uuid} />
    <MessageDisplay content={flashcardIdea.back} id={flashcardIdea.uuid} />
    <Button variant="outline" size="sm" className="mt-3">
      Add Flashcard
    </Button>
  </div>
);

export default FlashcardResults;
