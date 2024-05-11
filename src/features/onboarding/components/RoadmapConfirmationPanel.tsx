import { observer } from 'mobx-react-lite';
import { useOnboardingStore } from '../hooks/useOnboardingStore';
import { ONBOARDING_STEPS } from '../utils/onboardingSteps';
import { Button } from '@/components/ui/Button';

const RoadmapConfirmationPanel = observer(() => {
  const { setStep } = useOnboardingStore();

  const handleConfirm = () => {
    setStep(ONBOARDING_STEPS.THEME);
  };

  const handleGoBack = () => {
    setStep(ONBOARDING_STEPS.ROADMAP);
  };

  return (
    <div
      className="card-base flex p-6 flex-col gap-4 w-[28rem] absolute bottom-10 right-10 z-50 prose dark:prose-invert"
      style={{ zIndex: 100 }}
    >
      <div className="space-y-2">
        <h3 className="text-main">How does this look?</h3>
        <p className="text-secondary">
          Once logged in, you will be able to update and add new topics.
        </p>
      </div>
      <div className="flex gap-4 ml-auto">
        <Button className="whitespace-nowrap" variant="outline" onClick={handleGoBack}>
          Go back
        </Button>
        <Button className="whitespace-nowrap gap-3" onClick={handleConfirm}>
          Looks good!
        </Button>
      </div>
    </div>
  );
});

export default RoadmapConfirmationPanel;
