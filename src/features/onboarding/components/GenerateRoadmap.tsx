import { useCallback, useEffect, useState } from 'react';
import workspaceApi from '@/features/nodemap/api';
import { useStore } from '@/stores/RootStore';
import Nodemap from '@/features/nodemap/components/Nodemap';
import Spinner from '@/components/ui/Spinner';
import { observer } from 'mobx-react-lite';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'react-bootstrap-icons';

type Props = { setStep: (val: number) => void };

const GenerateRoadmap = observer(({ setStep }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentWorkspace } = useStore('workspaceStore');
  const { setSubscribedChannels } = useStore('channelStore');

  const handleGenerateRoadmap = useCallback(async () => {
    if (!currentWorkspace) return;

    try {
      setIsLoading(true);

      const channels = await workspaceApi.generateRoadmap(
        currentWorkspace.name,
        currentWorkspace.uuid,
      );
      setSubscribedChannels(channels);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentWorkspace, setSubscribedChannels]);

  const handleConfirm = () => {
    setStep(3);
  };

  useEffect(() => {
    handleGenerateRoadmap();
  }, [handleGenerateRoadmap]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen p-8 flex items-center justify-center bg-background prose dark:prose-invert flex-col gap-12">
        <Spinner size={28} />
        <h1>{`Generate Roadmap for ${currentWorkspace?.name}...`}</h1>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen">
      <DndProvider backend={HTML5Backend}>
        <Nodemap />
      </DndProvider>
      <div
        className="card bg-card border border-border rounded-xl w-fit h-fit flex p-8 flex-col gap-4 absolute bottom-12 right-20 z-50 prose dark:prose-invert"
        style={{ zIndex: 100 }}
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
});

export default GenerateRoadmap;
