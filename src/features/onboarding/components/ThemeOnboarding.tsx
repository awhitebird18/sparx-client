import { Button } from '@/components/ui/Button';
import { Theme } from '@/features/preferences/enums';
import { useStore } from '@/stores/RootStore';
import { useOnboardingStore } from '../hooks/useOnboardingStore';
import { observer } from 'mobx-react-lite';
import { ONBOARDING_STEPS } from '../utils/onboardingSteps';
import ThemeSkeleton from './ThemeSkeleton';
import Header from './Header';

const ThemeOnboarding = observer(() => {
  const { createUserPreferences } = useStore('userPreferencesStore');
  const { isLoading, setIsLoading, setStep, selectedTheme } = useOnboardingStore();

  const handleSubmit = async () => {
    setIsLoading(true);
    await createUserPreferences({ theme: selectedTheme });
    setIsLoading(false);

    setStep(ONBOARDING_STEPS.USER);
  };

  return (
    <div className="prose flex flex-col items-center gap-8">
      <Header title="Which theme do you prefer?" description="You can udpate this later." />
      <div className="flex gap-8 items-center">
        <ThemeSkeleton theme={Theme.LIGHT} />
        <ThemeSkeleton theme={Theme.DARK} />
      </div>

      <Button
        size="lg"
        onClick={handleSubmit}
        className={`w-32 items-center gap-3 ${isLoading && 'opacity-50'}`}
      >
        {isLoading ? 'Saving...' : 'Continue'}
      </Button>
    </div>
  );
});

export default ThemeOnboarding;
