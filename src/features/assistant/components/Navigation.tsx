import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useAssistantStore } from '../hooks/useAssistantStore';
import { Collection, FileText, Lightbulb } from 'react-bootstrap-icons';

const Navigation = observer(() => {
  const { activeComponent } = useStore('mainPanelStore');
  const { setScreen } = useAssistantStore();

  const handleNavigate = (nav: string) => {
    setScreen(nav);
  };

  return (
    <div className="space-y-4 prose dark:prose-invert">
      <h4>Here is a list of what I can do</h4>
      <div className="gap-6 rounded-2xl grid grid-cols-3">
        <Button
          onClick={() => handleNavigate('generateSubtopics')}
          variant="outline"
          className="w-full flex-col gap-5 h-fit p-6 rounded-3xl whitespace-normal"
        >
          <Lightbulb size={40} />
          Brainstorm new subtopics
        </Button>
        <Button
          onClick={() => handleNavigate('generateSummary')}
          variant="outline"
          className="w-full flex-col gap-5 h-fit p-6 rounded-3xl whitespace-normal"
        >
          <FileText size={40} />
          Summarize Article
        </Button>

        {activeComponent?.type === 'note' ? (
          <Button
            variant="outline"
            onClick={() => handleNavigate('generateFlashcards')}
            className="w-full flex-col gap-5 h-fit p-6 rounded-3xl whitespace-normal"
          >
            <Collection size={40} />
            Generate note flashcards
          </Button>
        ) : null}
      </div>
    </div>
  );
});

export default Navigation;
