import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';

import { ChevronLeft, ThreeDots } from 'react-bootstrap-icons';

export const NoteHeader = () => {
  const { setSelectedNoteId } = useStore('noteStore');

  const handleClickBack = () => {
    setSelectedNoteId(undefined);
  };

  return (
    <div className="flex justify-between items-center mb-12 px-6 w-full">
      <Button
        variant="outline"
        className="flex gap-2 h-8 px-3 rounded-lg"
        onClick={handleClickBack}
      >
        <ChevronLeft size={12} style={{ marginTop: '0.1rem' }} /> Back
      </Button>
      <div className="flex gap-2 items-center text-muted-foreground">
        <Button variant="ghost" className="flex gap-2 h-8 w-8 p-0 rounded-lg">
          <ThreeDots size={18} />
        </Button>
      </div>
    </div>
  );
};
