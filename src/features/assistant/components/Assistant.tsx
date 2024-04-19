import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import assistantApi from '@/features/assistant/api';
import { ChannelType } from '@/features/channels/enums';
import { ConnectionSide } from '@/features/channels/enums/connectionSide';
import MessageDisplay from '@/features/messageInput/MessageDisplay';
import { nodeDimensions } from '@/features/workspaceChannels/utils/nodeDimensions';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { ChevronLeft } from 'react-bootstrap-icons';

const Assistant = observer(() => {
  const { currentChannelId, createChannelApi, currentChannel, findChannelByUuid } =
    useStore('channelStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const [article, setArticle] = useState('');
  const { addNote, selectNote, selectedNoteId } = useStore('noteStore');
  const { setMainPanel, activeComponent } = useStore('mainPanelStore');
  const { channelConnectors, createChannelConnectorApi } = useStore('channelConnectorStore');
  const [response, setResponse] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const [isProvidingArticle, setIsProvidingArticle] = useState(false);
  const [isViewingFlashcards, setIsViewingFlashcards] = useState(false);
  const [flashcards, setFlashcards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleBrainstormSubtopics = async () => {
    try {
      if (!currentChannelId || !currentWorkspaceId) return;
      setIsLoading(true);

      const topics = await assistantApi.generateSubtopics(currentChannelId, currentWorkspaceId);

      setResponse(topics);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickBack = () => {
    setResponse([]);
    setIsLoading(false);
    setFlashcards([]);
    setIsViewingFlashcards(false);
  };

  const handleCreateNode = async (title: string) => {
    // e.stopPropagation();
    if (!currentWorkspaceId || !currentChannel) return;

    setResponse((subtopics: any) => subtopics.filter((subtopic: any) => subtopic.title !== title));

    const connectors = channelConnectors.filter(
      (line) =>
        line.start.nodeId === currentChannel.uuid && line.start.side === 'right' && line.end,
    );

    const coordinates = connectors
      .map((value) => {
        if (!value.end) return { x: 0, y: 0 };

        const channel = findChannelByUuid(value.end?.nodeId);

        if (!channel) return { x: 0, y: 0 };

        return { x: channel?.x, y: channel.y };
      })
      .sort((a, b) => a.y - b.y);

    const y = coordinates.length ? coordinates[coordinates.length - 1].y + 120 : currentChannel.y;
    const x = coordinates.length
      ? coordinates[coordinates.length - 1].x
      : currentChannel.x + 160 + nodeDimensions.width;

    const newChannel = await createChannelApi(
      {
        name: title,
        type: ChannelType.CHANNEL,
        x,
        y,
      },
      undefined,
      currentWorkspaceId,
    );

    await createChannelConnectorApi(
      {
        parentChannelId: currentChannel.uuid,
        parentSide: ConnectionSide.RIGHT,
        childChannelId: newChannel.uuid,
        childSide: ConnectionSide.LEFT,
      },
      currentWorkspaceId,
    );
  };

  const handleCreateNote = async (title: string) => {
    if (!currentWorkspaceId || !currentChannelId) return;

    setResponse((subtopics: any) => subtopics.filter((subtopic: any) => subtopic.title !== title));

    const note = await assistantApi.generateNote(title, currentChannelId, currentWorkspaceId);

    await addNote(note);
    await selectNote(note.uuid);
    setMainPanel({ type: 'note' });
  };

  const handleSetProvideSummary = () => {
    setIsProvidingArticle(true);
  };

  const handleSummarizeArticle = async () => {
    try {
      if (!currentChannelId || !currentWorkspaceId) return;
      setIsLoading(true);

      const note = await assistantApi.summarizeArticle(
        article,
        currentChannelId,
        currentWorkspaceId,
      );

      await addNote(note);
      setArticle('');
      setIsProvidingArticle(false);
      selectNote(note.uuid);
      setMainPanel({ type: 'note' });
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateFlashcards = async () => {
    try {
      if (!selectedNoteId) return;
      setIsLoading(true);

      const flashcards = await assistantApi.generateFlashcards(selectedNoteId);

      setIsViewingFlashcards(true);
      setFlashcards(flashcards);
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="prose dark:prose-invert overflow-auto h-full">
      {!response.length && !isLoading && !isProvidingArticle && !isViewingFlashcards ? (
        <>
          <div className="space-y-4">
            <h3>Here are a list of things that I can do...</h3>
            <div className="gap-4  flex flex-col">
              <Button onClick={handleBrainstormSubtopics} variant="outline-primary">
                Brainstorm new subtopics
              </Button>
              <Button onClick={handleSetProvideSummary} variant="outline-primary">
                Summarize article
              </Button>
            </div>
          </div>
          {activeComponent?.type === 'note' ? (
            <div className="mt-12 space-y-4">
              <h3>For this note we can...</h3>
              <div className="gap-4  flex flex-col">
                <Button variant="outline-primary" onClick={handleGenerateFlashcards}>
                  Generate flashcards
                </Button>
              </div>
            </div>
          ) : null}
        </>
      ) : null}

      {isViewingFlashcards ? (
        <div className="flex flex-col gap-4 pr-2 prose dark:prose-invert">
          <div className="flex gap-3 items-center">
            <Button variant="outline" className="gap-2 h-8" size="sm" onClick={handleClickBack}>
              <ChevronLeft size={12} /> Back
            </Button>
            <h3>Here is what I came up with...</h3>
          </div>

          <div className="flex flex-col gap-6">
            {flashcards.map((flashcard: any) => {
              return (
                <div className="flex flex-col gap-2 text-main bg-hover rounded-lg p-3">
                  {flashcard.fieldValues.map((field: any, index: number) => {
                    return (
                      <div className={`${index % 2 === 0 ? 'text-main' : 'text-secondary'}`}>
                        <MessageDisplay
                          content={JSON.stringify(field.content)}
                          id={field.uuid}
                          key={field.uuid}
                        />
                      </div>
                    );
                  })}
                  <Button variant="outline" size="sm" className="mt-3">
                    Add Flashcard
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {isProvidingArticle && !isViewingFlashcards ? (
        <div className="space-y-6">
          <h3>Please paste the article below...</h3>
          <div className="gap-4  flex flex-col">
            <Textarea
              className="h-full"
              rows={30}
              value={article}
              onChange={(e) => setArticle(e.target.value)}
            />
            <Button variant="outline-primary" onClick={handleSummarizeArticle}>
              Summarize Article
            </Button>
          </div>
        </div>
      ) : null}

      {response.length && !isLoading && !isProvidingArticle && !isViewingFlashcards ? (
        <div className="space-y-6 h-full overflow-auto pr-2">
          <div className="flex gap-2">
            <Button
              className="gap-2 w-min h-8 items-center"
              onClick={handleClickBack}
              variant="outline"
              size="sm"
            >
              <ChevronLeft /> Back
            </Button>
            <h3>Here are a list of subtopics I came up with:</h3>
          </div>
          <div className="flex flex-col gap-6">
            {response.map((topic) => (
              <div className="flex flex-col gap-4 bg-hover p-4 rounded-sm">
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
      ) : null}

      {isLoading && !!isProvidingArticle && !isViewingFlashcards ? (
        <h3>On it! Getting some subtopics for you...</h3>
      ) : null}

      {error ? (
        <p className="text-rose-400 mt-6">
          I ran into an error. I am not sure how this could have ever happened. Best to try again
          later...
        </p>
      ) : null}
    </div>
  );
});

export default Assistant;
