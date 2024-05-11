import { observer } from 'mobx-react-lite';
import Header from './Header';
import SubtopicList from './SubtopicList';
import { useAssistantStore } from '../hooks/useAssistantStore';
import { NoteTopic } from '../types/noteTopic';
import { useEffect, useState } from 'react';
import { useStore } from '@/stores/RootStore';
import Spinner from '@/components/ui/Spinner';

const GenerateSubtopics = observer(() => {
  const { currentChannelId } = useStore('channelStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const [noteTopics, setNoteTopics] = useState<NoteTopic[]>([]);
  const { getSubtopics, isLoading } = useAssistantStore();

  useEffect(() => {
    if (!currentChannelId || !currentWorkspaceId) return;

    const fn = async () => {
      const subtopics = await getSubtopics(currentChannelId, currentWorkspaceId);
      if (!subtopics) return;

      setNoteTopics(subtopics);
    };

    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-6 h-full overflow-auto pr-2">
      <Header />
      <SubtopicList noteTopics={noteTopics} />
    </div>
  );
});

export default GenerateSubtopics;

const Loader = () => {
  return (
    <div className="flex flex-col gap-8 items-center prose dark:prose-invert mt-12">
      <Spinner />
      <p className="text-highlight text-xl">Thinking of some subtopics...</p>
    </div>
  );
};
