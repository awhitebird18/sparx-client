import { useStore } from '@/stores/RootStore';
import { useState } from 'react';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { observer } from 'mobx-react-lite';
import Spinner from '@/components/ui/Spinner';
import { useAssistantStore } from '../hooks/useAssistantStore';

const ArticleInput = observer(() => {
  const [article, setArticle] = useState('');
  const { currentChannelId } = useStore('channelStore');
  const { addNote, selectNote } = useStore('noteStore');
  const { setMainPanel } = useStore('mainPanelStore');
  const { isLoading, getSummarizedArticle } = useAssistantStore();

  const handleSummarizeArticle = async () => {
    if (!currentChannelId) return;

    const note = await getSummarizedArticle(article, currentChannelId);
    if (!note) return;

    setArticle('');
    addNote(note);
    selectNote(note.uuid);
    setMainPanel({ type: 'note' });
  };

  if (isLoading)
    return (
      <div className="flex items-center gap-5 mx-auto pt-12">
        <Spinner />
        <h3>Summarizing your article</h3>
      </div>
    );

  return (
    <div className="gap-4 flex flex-col">
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
  );
});

export default ArticleInput;
