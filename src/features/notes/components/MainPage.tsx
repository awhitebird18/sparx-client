import NotesTable from './ViewNotes';
import Note from './Note';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const MainPage = () => {
  const { selectedNote, setSelectedNoteId } = useStore('noteStore');

  useEffect(() => {
    return () => {
      setSelectedNoteId(undefined);
    };
  }, []);

  return (
    <div className="h-full p-8">
      <div className="h-full rounded-xl">{selectedNote ? <Note /> : <NotesTable />}</div>
    </div>
  );
};

export default observer(MainPage);
