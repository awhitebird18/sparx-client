import AddFlashcardModal from '@/features/flashcards/components/AddFlashcardModal';
import Browse from '@/features/flashcards/components/Browse';
import Stats from '@/features/flashcards/components/Stats';
import StudyFlashcardsModal from '@/features/flashcards/components/StudyFlashcardsModal';
import Templates from '@/features/flashcards/components/Templates';
import Note from '@/features/notes/components/Note';
import ViewNotes from '@/features/notes/components/ViewNotes';
import Profile from '@/features/profile/components/Profile';

const mainPanelComponents = {
  notes: (props: any) => <ViewNotes {...props} />,
  note: (props: any) => <Note {...props} />,
  profile: (props: any) => <Profile {...props} />,
  addFlashcard: (props: any) => <AddFlashcardModal {...props} />,
  studyFlashcards: (props: any) => <StudyFlashcardsModal {...props} />,
  flashcardTemplates: (props: any) => <Templates {...props} />,
  browseFlashcards: (props: any) => <Browse {...props} />,
  flashcardStats: (props: any) => <Stats {...props} />,
};

export type MainPanelComponent = keyof typeof mainPanelComponents;

export default mainPanelComponents;
