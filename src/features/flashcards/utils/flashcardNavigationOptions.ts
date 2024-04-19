import { MainPanelComponent } from '@/components/layout/mainPanel/componentList';
import {
  BarChartFill,
  BookFill,
  ClipboardCheckFill,
  PlusCircleFill,
  SearchHeartFill,
} from 'react-bootstrap-icons';

export const navOptions: { id: MainPanelComponent; title: string; icon: any; color: string }[] = [
  {
    id: 'studyFlashcards',
    title: 'Study Flashcards',
    icon: BookFill,
    color: 'text-purple-300',
  },
  {
    id: 'addFlashcard',
    title: 'Add Flashcards',
    icon: PlusCircleFill,
    color: 'text-purple-300',
  },
  {
    id: 'flashcardTemplates',
    title: 'Create Template',
    icon: ClipboardCheckFill,
    color: 'text-red-300',
  },
  {
    id: 'browseFlashcards',
    title: 'Browse Flashcards',
    icon: SearchHeartFill,
    color: 'text-green-300',
  },
  {
    id: 'flashcardStats',
    title: 'View Stats',
    icon: BarChartFill,
    color: 'text-teal-300',
  },
];
