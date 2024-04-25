import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

const Navigation = observer(() => {
  const { activeComponent } = useStore('mainPanelStore');
  const { setScreen } = useStore('assistantStore');

  const handleNavigate = (nav: string) => {
    setScreen(nav);
  };

  return (
    <>
      <div className="space-y-4">
        <h3>Here are a list of things that I can do...</h3>
        <div className="gap-4  flex flex-col">
          <Button onClick={() => handleNavigate('generateSubtopics')} variant="outline-primary">
            Brainstorm new subtopics
          </Button>
          <Button onClick={() => handleNavigate('generateSummary')} variant="outline-primary">
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
