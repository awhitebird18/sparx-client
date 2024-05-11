import { useStore } from '@/stores/RootStore';
import { useOnboardingStore } from '../hooks/useOnboardingStore';
import { PrimaryColors, Theme } from '@/features/preferences/enums';
import { observer } from 'mobx-react-lite';

type Props = {
  theme: Theme;
};

const ThemeSkeleton = ({ theme }: Props) => {
  return (
    <div className={`flex flex-col gap-3 items-center`}>
      <AppSkeleton theme={theme} />
      <p className="text-main">{`${theme === Theme.LIGHT ? 'Light' : 'Dark'} theme`}</p>
    </div>
  );
};

export default ThemeSkeleton;

const AppSkeleton = observer(({ theme }: { theme: Theme }) => {
  const { setInitialPreferences } = useStore('userPreferencesStore');
  const { selectedTheme, setSelectedTheme } = useOnboardingStore();
  const highlight = theme === Theme.DARK ? '!bg-gray-500/10' : '!bg-gray-200';

  const handleThemeSelect = () => {
    setSelectedTheme(theme);
    setInitialPreferences({
      theme,
      primaryColor: PrimaryColors.BLUE,
    });
  };

  return (
    <div
      onClick={handleThemeSelect}
      className={`${
        theme === Theme.LIGHT ? 'light' : 'dark'
      } w-96 h-52 transition-colors duration-500 border-2 shadow rounded-lg bg-background ${
        selectedTheme === theme ? 'border-primary-lighter' : 'border-transparent'
      }`}
    >
      <div className={`flex flex-1 h-full rounded-sm transition-all duration-700`}>
        <div className={`border-r border-border w-1/4 gap-1 flex flex-col`}>
          <div className="flex items-center gap-2 px-2 h-6 flex-shrink-0">
            <div className={`h-3 w-3 rounded-sm ${highlight}`} />
            <div className={`h-3 flex-1 rounded-sm ${highlight}`} />
          </div>
          <div className="flex flex-col px-2 gap-2">
            <div className={`w-1/2 h-3 rounded-sm ${highlight} !bg-primary`} />
            <div className={`w-full h-3 rounded-sm ${highlight}`} />
            <div className={`w-full h-3 rounded-sm ${highlight}`} />
            <div className={`w-full h-3 rounded-sm ${highlight}`} />
            <div className={`w-full h-3 rounded-sm ${highlight}`} />
          </div>
        </div>
        <div className="flex flex-col w-3/4">
          <div className={`flex justify-between items-center px-2 h-6 flex-shrink-0`}>
            <div className={`w-12 h-3 rounded-sm ${highlight}`} />
            <div className={`w-5 h-3 rounded-sm ${highlight}`} />
          </div>
          <div className="flex gap-3 p-2 h-full">
            <div className={`${highlight} rounded-sm w-full h-full`} />
            <div className={`${highlight} rounded-sm w-1/3 h-full`} />
          </div>
        </div>
      </div>
    </div>
  );
});

// bg-gray-600/20 bg-gray-200
