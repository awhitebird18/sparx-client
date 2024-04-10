import { useCallback, useEffect, useState } from 'react';
import workspaceApi from '@/features/workspaceChannels/api';
import { useStore } from '@/stores/RootStore';
import Nodemap from '@/features/workspaceChannels/components/Nodemap';
import Spinner from '@/components/ui/Spinner';
import { observer } from 'mobx-react-lite';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'react-bootstrap-icons';

const GenerateRoadmap = ({ setStep }: { setStep: any }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { setSubscribedChannels } = useStore('channelStore');

  const handleGenerateRoadmap = useCallback(async () => {
    if (!currentWorkspaceId) return;
    setIsLoading(true);

    const channels = await workspaceApi.generateRoadmap('Backend Development', currentWorkspaceId);
    setSubscribedChannels(channels);

    setIsLoading(false);
  }, [currentWorkspaceId, setSubscribedChannels]);

  useEffect(() => {
    handleGenerateRoadmap();
  }, [handleGenerateRoadmap]);

  if (isLoading) {
    return (
      <div className="w-full h-full p-8 flex items-center justify-center bg-card prose dark:prose-invert flex-col gap-12">
        <Spinner size={36} />
        <h1>Generating Roadmap...</h1>
      </div>
    );
  }

  const handleConfirm = () => {
    setStep(4);
  };

  return (
    <div className="relative w-screen h-screen">
      <DndProvider backend={HTML5Backend}>
        <Nodemap />
      </DndProvider>
      <div
        className="card bg-card border border-border rounded-xl w-fit h-fit flex p-8 flex-col gap-4 absolute bottom-12 right-20 z-50 prose dark:prose-invert"
        style={{ zIndex: 100000000000000 }}
      >
        <h3>How does this look?</h3>
        <div className="flex gap-4 ml-auto ">
          <Button
            className="whitespace-nowrap"
            variant="outline-primary"
            onClick={handleGenerateRoadmap}
          >
            Regenerate Roadmap
          </Button>
          <Button className="whitespace-nowrap gap-3" onClick={handleConfirm}>
            Good to go <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default observer(GenerateRoadmap);
