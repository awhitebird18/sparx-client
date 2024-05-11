import {
  AddFlashcardModal,
  Browse,
  Stats,
  StudyFlashcardsModal,
  Templates,
  Note,
  Profile,
} from './lazyLoadComponents';
import { ProfileStoreProvider } from '@/features/profile/providers/profileStoreProvider';

const mainPanelComponents = {
  note: () => <Note />,
  profile: () => (
    <ProfileStoreProvider>
      <Profile />
    </ProfileStoreProvider>
  ),
  addFlashcard: () => <AddFlashcardModal />,
  studyFlashcards: () => <StudyFlashcardsModal />,
  flashcardTemplates: () => <Templates />,
  browseFlashcards: () => <Browse />,
  flashcardStats: () => <Stats />,
};

export type MainPanelComponent = keyof typeof mainPanelComponents;

export default mainPanelComponents;
