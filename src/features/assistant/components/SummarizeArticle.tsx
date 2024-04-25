import { useStore } from '@/stores/RootStore';
import { useState } from 'react';
import assistantApi from '@/features/assistant/api';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { observer } from 'mobx-react-lite';
import { ChevronLeft } from 'react-bootstrap-icons';

const SummarizeArticle = observer(() => {
  const [article, setArticle] = useState('');
  const { currentChannelId } = useStore('channelStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { addNote, selectNote } = useStore('noteStore');
  const { setMainPanel } = useStore('mainPanelStore');
  const { setScreen, setIsLoading, isLoading } = useStore('assistantStore');

  const handleSummarizeArticle = async () => {
    try {
      if (!currentChannelId || !currentWorkspaceId) return;
      setIsLoading(true);

      const note = await assistantApi.summarizeArticle(article, currentChannelId);

      await addNote(note);
      setArticle('');
      setScreen(undefined);
      selectNote(note.uuid);
      setMainPanel({ type: 'note' });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickBack = () => {
    setIsLoading(false);
    setArticle('');
    setScreen(undefined);
  };

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex items-center gap-5 mx-auto pt-12">
          <Spinner />
          <h3>Summarizing your article</h3>
        </div>
      ) : (
        <>
          <div className="flex gap-3 items-center">
            <Button variant="outline" className="gap-2 h-8" size="sm" onClick={handleClickBack}>
              <ChevronLeft size={12} /> Back
            </Button>
            <h3>Here is what I came up with...</h3>
          </div>
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
        </>
      )}
    </div>
  );
});

export default SummarizeArticle;
