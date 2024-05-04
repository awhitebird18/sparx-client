import { useEffect } from 'react';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useOnboardingStore } from '../hooks/useOnboardingStore';
import { ONBOARDING_STEPS } from '../utils/onboardingSteps';

// Importing components
import CreateWorkspaceOnboarding from './CreateWorkspaceOnboarding';
import UserOnboarding from './UserOnboarding';
import ThemeOnboarding from './ThemeOnboarding';
import RoadmapOnboarding from './RoadmapOnboarding';
import GenerateRoadmap from './GenerateRoadmap';
import GettingStartedModal from './GettingStartedModal';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/providers/contexts/useAuth';

const Onboarding = observer(() => {
  const { step, setStep } = useOnboardingStore();
  const { workspaces } = useStore('workspaceStore');
  const { userLogout } = useAuth();

  useEffect(() => {
    if (workspaces.length) {
      setStep(ONBOARDING_STEPS.ROADMAP);
    }
  }, [setStep, workspaces.length]);

  const renderStep = () => {
    switch (step) {
      case ONBOARDING_STEPS.CREATE_WORKSPACE:
        return <CreateWorkspaceOnboarding />;
      case ONBOARDING_STEPS.ROADMAP:
        return <RoadmapOnboarding />;
      case ONBOARDING_STEPS.GENERATE_ROADMAP:
        return <GenerateRoadmap />;
      case ONBOARDING_STEPS.THEME:
        return <ThemeOnboarding />;
      case ONBOARDING_STEPS.USER:
        return <UserOnboarding />;
      case ONBOARDING_STEPS.SETUP:
        return <GettingStartedModal />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background relative">
      <div className="flex prose dark:prose-invert items-center absolute top-4 left-5 font-bold gap-4 items-center">
        {/* <h2>Sparx</h2> */}
        <Button
          onClick={userLogout}
          variant="outline"
          className="rounded-2xl border-border card text-secondary"
        >
          Start Over
        </Button>
      </div>
      <div className="max-w-3xl">{renderStep()}</div>
    </div>
  );
});

export default Onboarding;
