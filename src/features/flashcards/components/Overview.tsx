import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {
  BarChartFill,
  BookFill,
  ClipboardCheckFill,
  PlusCircleFill,
  SearchHeartFill,
} from 'react-bootstrap-icons';
import TemplateList from './TemplateList';
import FlashcardsNav from './FlashcardsNav';
import FlashcardReviews from './FlashcardReviews';
import RecentlyAdded from './RecentlyAdded';

const Overview = () => {
  const { activeComponent } = useStore('mainPanelStore');

  console.log('derp', activeComponent);

  return (
    <div className="w-full overflow-auto flex flex-col gap-5 prose dark:prose-invert">
      {activeComponent?.type === 'flashcardTemplates' && <TemplateList />}
      {activeComponent?.type === 'studyFlashcards' && <FlashcardReviews />}
      {activeComponent?.type === 'addFlashcard' && <RecentlyAdded />}

      {!activeComponent && <FlashcardsNav />}
    </div>
  );
};

export default observer(Overview);
