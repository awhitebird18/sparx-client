import { Props as ProfileProps } from '@/features/profile/components/Profile';
import {
  AddFlashcardModal,
  Browse,
  Stats,
  StudyFlashcardsModal,
  Templates,
  Note,
  Profile,
} from './lazyLoadComponents';

const mainPanelComponents = {
  note: () => <Note />,
  profile: (props: ProfileProps) => <Profile {...props} />,
  addFlashcard: () => <AddFlashcardModal />,
  studyFlashcards: () => <StudyFlashcardsModal />,
  flashcardTemplates: () => <Templates />,
  browseFlashcards: () => <Browse />,
  flashcardStats: () => <Stats />,
};

export type MainPanelComponent = keyof typeof mainPanelComponents;

export default mainPanelComponents;
