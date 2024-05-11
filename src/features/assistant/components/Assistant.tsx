import { observer } from 'mobx-react-lite';
import SummarizeArticle from './SummarizeArticle';
import Navigation from './Navigation';
import GenerateSubtopics from './GenerateSubtopics';
import GenerateFlashcards from './GenerateFlashcards';
import { useAssistantStore } from '../hooks/useAssistantStore';
import HeaderContainer from '@/layout/sidePanel/HeaderContainer';
import SidePanelContainer from '@/layout/sidePanel/SidePanelContainer';
import SidePanelBody from '@/layout/sidePanel/SidePanelBody';

const Assistant = observer(() => {
  const { screen } = useAssistantStore();

  return (
    <SidePanelContainer>
      <HeaderContainer title="Assistant" />

      <SidePanelBody>
        {!screen ? <Navigation /> : null}
        {screen === 'generateSummary' ? <SummarizeArticle /> : null}
        {screen === 'generateFlashcards' ? <GenerateFlashcards /> : null}
        {screen === 'generateSubtopics' ? <GenerateSubtopics /> : null}
      </SidePanelBody>
    </SidePanelContainer>
  );
});

export default Assistant;
