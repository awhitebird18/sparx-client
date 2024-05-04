import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useAssistantStore } from '../hooks/useAssistantStore';

const Navigation = observer(() => {
  const { activeComponent } = useStore('mainPanelStore');
  const { setScreen } = useAssistantStore();

  const handleNavigate = (nav: string) => {
    setScreen(nav);
  };

  return (
    <>
      <div className="space-y-4">
        <p className="text-secondary text-lg">Here are a list of things that I can do...</p>
        <div className="gap-6 rounded-2xl flex">
          <Button
            onClick={() => handleNavigate('generateSubtopics')}
            variant="outline-primary"
            className="h-36 w-full"
          >
            Brainstorm new subtopics
          </Button>
          <Button
            onClick={() => handleNavigate('generateSummary')}
            variant="outline-primary"
            className="h-36 w-full"
          >
            Summarize article
          </Button>
        </div>
      </div>
      {activeComponent?.type === 'note' ? (
        <div className="mt-12 space-y-4">
          <h3>For this note we can...</h3>
          <div className="gap-4  flex flex-col">
            <Button variant="outline-primary" onClick={() => handleNavigate('generateFlashcards')}>
              Generate flashcards
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
});

export default Navigation;
