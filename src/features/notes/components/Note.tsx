import { useStore } from '@/stores/RootStore';
import Editor from '@/features/textEditor/Editor';
import { observer } from 'mobx-react-lite';
import { emptyInputState } from '@/utils/emptyInputState';

const Note = observer(() => {
  const { selectedNote, updateNoteApi, updateNote } = useStore('noteStore');

  const handleSaveTitle = async (value: string) => {
    if (!selectedNote) return;

    await updateNoteApi(selectedNote.uuid, { title: value });
  };

  const handleChangeTitle = async (value: string) => {
    if (!selectedNote) return;

    updateNote(selectedNote.uuid, { title: value });
  };

  const handleContentChange = async (value: string) => {
    if (!selectedNote || value === emptyInputState) return;

    await updateNoteApi(selectedNote.uuid, { content: value });
  };

  if (!selectedNote) return;

  return (
    <div className="h-full flex">
      <div className="w-full h-full flex">
        <div className="flex flex-col rounded-xl h-full max-w-7xl w-full p-6 items-center">
          <div className="max-w-4xl w-full">
            <div className="w-full h-full items-center ">
              <div className="px-8 w-full">
                <input
                  type="text"
                  value={selectedNote.title}
                  onChange={(e) => handleChangeTitle(e.target.value)}
                  placeholder="Untitled"
                  className="w-full border-none outline-none bg-transparent text-3xl font-semibold leading-snug"
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                    handleSaveTitle(e.target.value)
                  }
                />
              </div>

              <div className="w-full">
                <Editor
                  key={Date.now().toString()}
                  content={selectedNote.content}
                  onBlur={handleContentChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Note;
