import { Button } from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { NotificationType, PrimaryColors, Theme } from '@/features/preferences/enums';
import { useStore } from '@/stores/RootStore';
import { useEffect, useState } from 'react';
import { ArrowRightCircle } from 'react-bootstrap-icons';

const ThemeOnboarding = ({ setStep }: { setStep: (arg: number) => void }) => {
  const { updateThemeApi, setInitialPreferences } = useStore('userPreferencesStore');
  const [selectedTheme, setSelectedTheme] = useState<Theme | undefined>(Theme.DARK);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInitialPreferences({
      theme: Theme.DARK,
      primaryColor: PrimaryColors.BLUE,
      notificationType: NotificationType.ALL,
    });
  }, []);

  const handleSubmit = async () => {
    if (selectedTheme) {
      setIsLoading(true);
      await updateThemeApi(selectedTheme);
      setIsLoading(false);
    }

    setStep(3);
  };

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme);
    setInitialPreferences({
      theme,
      primaryColor: PrimaryColors.BLUE,
      notificationType: NotificationType.ALL,
    });
  };
  return (
    <div className="prose flex flex-col items-center gap-8">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-main">Which theme do you prefer?</h2>
        <p className="text-secondary">You can udpate this later.</p>
      </div>
      <div className="flex gap-8 items-center">
        <div className="flex flex-col gap-3 items-center">
          <div
            onClick={() => handleThemeSelect(Theme.LIGHT)}
            className={`light w-96 h-52 transition-colors duration-300 border-4 border-gray-300 shadow rounded-lg bg-white ${
              selectedTheme === Theme.LIGHT && '!border-primary'
            }`}
          >
            <AppSkeleton theme={Theme.LIGHT} />
          </div>
          <p className="text-main">Light Mode</p>
        </div>
        <div className="flex flex-col gap-3 items-center">
          <div
            onClick={() => handleThemeSelect(Theme.DARK)}
            className={`dark w-96 h-52 flex transition-colors duration-300 border-4 border-border shadow rounded-lg bg-card ${
              selectedTheme === Theme.DARK && '!border-primary'
            }`}
          >
            <AppSkeleton theme={Theme.DARK} />
          </div>
          <p className="text-main">Dark Mode</p>
        </div>
      </div>

      <Button
        size="lg"
        onClick={handleSubmit}
        className={`font-medium gap-2 ${isLoading && 'opacity-50'}`}
      >
        {isLoading ? 'Saving theme...' : 'Continue'}
        {isLoading ? <Spinner size={6} /> : <ArrowRightCircle size={18} />}
      </Button>

      {/* <Button className="font-medium gap-4" type="submit" disabled={isLoading}>
        {isLoading ? 'Continue' : 'Saving theme...'}
        {isLoading && <Spinner />}
      </Button> */}
    </div>
  );
};

export default ThemeOnboarding;

const AppSkeleton = ({ theme }: { theme: Theme }) => {
  const highlight = theme === Theme.DARK ? '!bg-gray-500/10' : '!bg-gray-200';

  return (
    <div className={`flex flex-1 h-full`}>
      <div
        className={`border-r border-${highlight} dark:border-gray-500/20 w-1/4 gap-2 flex flex-col`}
      >
        <div className="flex gap-2 p-2">
          <div className={`h-4 w-4 rounded-sm  ${highlight}`} />
          <div className={`h-4 flex-1 rounded-sm  ${highlight}`} />
        </div>
        <div className="flex flex-col px-2 gap-2">
          <div className={`w-full h-4 rounded-sm ${highlight}`} />
          <div className={`w-full h-4 rounded-sm ${highlight}`} />
          <div className={`w-full h-4 rounded-sm ${highlight}`} />
          <div className={`w-full h-4 rounded-sm ${highlight}`} />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div
          className={`flex justify-between border-b border-${highlight} dark:border-gray-500/20 p-2`}
        >
          <div className={`w-12 h-4 rounded-sm ${highlight}`} />
          <div className={`w-5 h-4 rounded-sm ${highlight}`} />
        </div>
        <div className="flex gap-3 p-2 h-full">
          <div className={`${highlight} rounded-sm w-full h-full`} />
          <div className={`${highlight} rounded-sm w-1/3 h-full`} />
        </div>
      </div>
    </div>
  );
};

// bg-gray-600/20 bg-gray-200
