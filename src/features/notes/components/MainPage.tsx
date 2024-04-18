import NotesTable from './ViewNotes';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const MainPage = () => {
  const { setSelectedNoteId } = useStore('noteStore');

  useEffect(() => {
    return () => {
      setSelectedNoteId(undefined);
    };
  }, []);

  return (
    <div className="h-full">
      <NotesTable />
    </div>
  );
};

export default observer(MainPage);
