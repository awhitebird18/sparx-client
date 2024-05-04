import { observer } from 'mobx-react-lite';
import SummarizeArticle from './SummarizeArticle';
import Navigation from './Navigation';
import GenerateSubtopics from './GenerateSubtopics';
import GenerateFlashcards from './GenerateFlashcards';
import { useAssistantStore } from '../hooks/useAssistantStore';

const Assistant = observer(() => {
  const { screen } = useAssistantStore();

  return (
    <div className="prose dark:prose-invert overflow-auto h-full">
      <h3 className="p-5 mb-3">Assistant</h3>
      <div className="px-5">
        {!screen ? <Navigation /> : null}
        {screen === 'generateSummary' ? <SummarizeArticle /> : null}
        {screen === 'generateFlashcards' ? <GenerateFlashcards /> : null}
        {screen === 'generateSubtopics' ? <GenerateSubtopics /> : null}
      </div>
    </div>
  );
});

export default Assistant;
