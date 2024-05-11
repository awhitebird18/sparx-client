import { Button } from '@/components/ui/Button';
import assistantApi from '@/features/assistant/api';
import { useStore } from '@/stores/RootStore';
import { ConnectionSide } from '@/features/channels/enums/connectionSide';
import { observer } from 'mobx-react-lite';
import { NoteTopic } from '../types/noteTopic';

const SubtopicList = observer(({ noteTopics }: { noteTopics: NoteTopic[] }) => {
  const { currentChannelId, handleCreateNode } = useStore('channelStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { addNote, selectNote } = useStore('noteStore');
  const { setMainPanel } = useStore('mainPanelStore');

  const handleSetUpdateModal = async (title: string) => {
    if (!currentWorkspaceId || !currentChannelId) return;
    const handleCreateChannel = handleCreateNode(
      currentChannelId,
      currentWorkspaceId,
      ConnectionSide.RIGHT,
    );

    await handleCreateChannel(title);
  };

  const handleCreateNote = async (title: string) => {
    if (!currentWorkspaceId || !currentChannelId) return;

    // Todo
    // setNoteTopics((subtopics) => subtopics.filter((subtopic) => subtopic.title !== title));
    const note = await assistantApi.generateNote(title, currentChannelId, currentWorkspaceId);
    await addNote(note);
    await selectNote(note.uuid);
    setMainPanel({ type: 'note' });
  };

  return (
    <div className="flex flex-col gap-6">
      {noteTopics.map((topic) => (
        <div key={topic.title} className="flex flex-col gap-4 bg-hover p-4 rounded-sm">
          <div className="flex items-center gap-3">
            <h4>{topic.title}</h4>
            <Button
              className="whitespace-nowrap h-6 px-2 ml-auto"
              variant="outline-primary"
              size="sm"
              onClick={() => handleCreateNote(topic.title)}
            >
              Generate Note
            </Button>
            <Button
              className="whitespace-nowrap h-6 px-2"
              variant="outline-primary"
              size="sm"
              onClick={() => handleSetUpdateModal(topic.title)}
            >
              Create Node
            </Button>
          </div>
          <p className="text-secondary">{topic.explanation}</p>
        </div>
      ))}
    </div>
  );
});

export default SubtopicList;
