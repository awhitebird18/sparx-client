import { Button } from '@/components/ui/Button';
import { ChevronLeft } from 'react-bootstrap-icons';
import assistantApi from '@/features/assistant/api';
import { useStore } from '@/stores/RootStore';
import { useEffect, useState } from 'react';
import { NoteTopic } from '../types/noteTopic';
import { observer } from 'mobx-react-lite';

const GenerateSubtopics = observer(() => {
  const { currentChannelId, currentChannel } = useStore('channelStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { addNote, selectNote } = useStore('noteStore');
  const { setMainPanel } = useStore('mainPanelStore');
  const [noteTopics, setNoteTopics] = useState<NoteTopic[]>([]);
  const { setIsLoading, setScreen, isLoading } = useStore('assistantStore');

  const handleCreateNode = async (title: string) => {
    if (!currentWorkspaceId || !currentChannel) return;
    setNoteTopics((subtopics) => subtopics.filter((subtopic) => subtopic.title !== title));

    // const y = coordinates.length ? coordinates[coordinates.length - 1].y + 120 : currentChannel.y;
    // const x = coordinates.length
    //   ? coordinates[coordinates.length - 1].x
    //   : currentChannel.x + 160 + nodeDimensions.width;

    // const newChannel = await createChannelApi(
    //   {
    //     name: title,
    //     x,
    //     y,
    //   },
    //   undefined,
    //   currentWorkspaceId,
    // );
  };

  const handleCreateNote = async (title: string) => {
    if (!currentWorkspaceId || !currentChannelId) return;

    setNoteTopics((subtopics) => subtopics.filter((subtopic) => subtopic.title !== title));
    const note = await assistantApi.generateNote(title, currentChannelId, currentWorkspaceId);
    await addNote(note);
    await selectNote(note.uuid);
    setMainPanel({ type: 'note' });
  };

  const handleClickBack = () => {
    setIsLoading(false);
    setNoteTopics([]);
    setScreen(undefined);
  };

  useEffect(() => {
    const generateSubtopics = async () => {
      try {
        if (!currentChannelId || !currentWorkspaceId) return;
        setIsLoading(true);
        const flashcards = await assistantApi.generateSubtopics(
          currentChannelId,
          currentWorkspaceId,
        );
        setNoteTopics(flashcards);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    generateSubtopics();
  }, [currentChannelId, currentWorkspaceId, setIsLoading]);

  return (
    <div className="space-y-6 h-full overflow-auto pr-2">
      {/* Header */}
      <div className="flex gap-2">
        <Button
          className="gap-2 w-min h-8 items-center"
          onClick={handleClickBack}
          variant="outline"
          size="sm"
        >
          <ChevronLeft /> Back
        </Button>
        <h3>
          {isLoading ? 'Getting some topics...' : 'Here are a list of subtopics I came up with:'}
        </h3>
      </div>
      {/* Results */}
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
                onClick={() => handleCreateNode(topic.title)}
              >
                Create Node
              </Button>
            </div>
            <p className="text-secondary">{topic.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

export default GenerateSubtopics;
