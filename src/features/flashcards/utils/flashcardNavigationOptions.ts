import { MainPanelComponent } from '@/layout/mainPanel/componentList';
import {
  BarChart,
  Book,
  ClipboardCheck,
  Icon,
  PlusCircle,
  SearchHeart,
} from 'react-bootstrap-icons';

export const navOptions: { id: MainPanelComponent; title: string; icon: Icon; color: string }[] = [
  {
    id: 'studyFlashcards',
    title: 'Study Flashcards',
    icon: Book,
    color: 'text-purple-300',
  },
  {
    id: 'addFlashcard',
    title: 'Add Flashcards',
    icon: PlusCircle,
    color: 'text-purple-300',
  },
  {
    id: 'flashcardTemplates',
    title: 'Create Template',
    icon: ClipboardCheck,
    color: 'text-red-300',
  },
  {
    id: 'browseFlashcards',
    title: 'Browse Flashcards',
    icon: SearchHeart,
    color: 'text-green-300',
  },
  {
    id: 'flashcardStats',
    title: 'View Stats',
    icon: BarChart,
    color: 'text-teal-300',
  },
];
