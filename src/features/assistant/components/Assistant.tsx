import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import SummarizeArticle from './SummarizeArticle';
import Navigation from './Navigation';
import GenerateSubtopics from './GenerateSubtopics';
import GenerateFlashcards from './GenerateFlashcards';

const Assistant = observer(() => {
  const { screen } = useStore('assistantStore');

  return (
    <div className="prose dark:prose-invert overflow-auto h-full">
      {!screen ? <Navigation /> : null}
      {screen === 'generateSummary' ? <SummarizeArticle /> : null}
      {screen === 'generateFlashcards' ? <GenerateFlashcards /> : null}
      {screen === 'generateSubtopics' ? <GenerateSubtopics /> : null}
    </div>
  );
});

export default Assistant;
