import { Button } from '@/components/ui/Button';
import { Magic } from 'react-bootstrap-icons';
import { useOnboardingStore } from '../hooks/useOnboardingStore';
import { ONBOARDING_STEPS } from '../utils/onboardingSteps';
import { useCallback } from 'react';
import { useStore } from '@/stores/RootStore';
import workspaceApi from '@/features/nodemap/api';
import Spinner from '@/components/ui/Spinner';
import { observer } from 'mobx-react-lite';
import Header from './Header';

const points = [
  'You may choose to have AI generate a roamdap as a starting point. This can help explore a topic you are interested in. You will have the opportunity review the roadmap once created.',
  'Would you like to generate a roadmap?',
];

const RoadmapOnboarding = observer(() => {
  const { setSubscribedChannels } = useStore('channelStore');
  const { currentWorkspace } = useStore('workspaceStore');
  const { setStep, isLoading, setIsLoading } = useOnboardingStore();

  const handleSubmit = async () => {
    setStep(ONBOARDING_STEPS.THEME);
  };

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
  }, [currentWorkspace, setIsLoading, setSubscribedChannels]);

  const handleShowRoadmapModal = async () => {
    await handleGenerateRoadmap();
    setStep(ONBOARDING_STEPS.GENERATE_ROADMAP);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center prose dark:prose-invert flex-col gap-12">
        <Header
          title={`Generating ${currentWorkspace?.name} Roadmap`}
          description="This will only take a moment..."
        />

        <Spinner size={24} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center prose dark:prose-invert gap-8">
      <Header title={`Generate ${currentWorkspace?.name} Roadmap`} />

      <div className="flex flex-col justify-center gap-4 h-full prose dark:prose-invert mb-4">
        {points.map((point, index) => (
          <p key={index} className="text-center text-secondary">
            {point}
          </p>
        ))}
      </div>
      <div className="flex gap-6">
        <Button
          className="flex items-center px-4 ml-auto"
          onClick={handleSubmit}
          variant="secondary"
          size="lg"
        >
          Start from scratch
        </Button>
        <Button className="flex items-center gap-3 px-4" size="lg" onClick={handleShowRoadmapModal}>
          <Magic size={16} />
          <p>Generate AI Roadmap</p>
        </Button>
      </div>
    </div>
  );
});

export default RoadmapOnboarding;
