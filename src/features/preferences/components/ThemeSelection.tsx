import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { useStore } from '@/stores/RootStore';
import { Theme } from '../enums';
import { observer } from 'mobx-react-lite';
import UserAvatar from '@/features/users/components/UserAvatar';
import { Label } from '@/components/ui/Label';
import { User } from '@/features/users/types';
import { getValidTheme } from '@/utils/getValidTheme';

const ThemeSelection = observer(() => {
  const { theme, updateThemeApi } = useStore('userPreferencesStore');
  const { currentUser } = useStore('userStore');
  if (!currentUser) return;

  const handleThemeSelect = (value: string) => {
    updateThemeApi(getValidTheme(value));
  };

  return (
    <RadioGroup defaultValue={theme} onValueChange={handleThemeSelect} className="flex gap-4 h-min">
      {Object.values(Theme).map((themeOption) => (
        <ThemeOption
          key={themeOption}
          user={currentUser}
          theme={themeOption}
          isSelected={theme === themeOption}
        />
      ))}
    </RadioGroup>
  );
});

type ThemeOptionProps = {
  user: User;
  theme: Theme;
  isSelected: boolean;
};
const ThemeOption = ({ user, theme, isSelected }: ThemeOptionProps) => {
  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <div
      className={`flex justify-between items-center border border-border rounded-lg overflow-hidden flex-1 w-full p-3 gap-4 ${
        isSelected && 'border-borderDark bg-hover'
      }`}
    >
      <div className="flex gap-4">
        <UserAvatar profileImage={user?.profileImage} userId={user?.uuid} />
        <div className="flex flex-col gap-0.5">
          <p className="text-main font-semibold text-sm leading-normal">{fullName}</p>
          <Label className="text-muted text-sm font-normal leading-tight" htmlFor={theme}>
            {theme === Theme.LIGHT ? 'Light mode only' : 'Dark mode only'}
          </Label>
        </div>
      </div>
      <RadioGroupItem value={theme} id={theme} />
    </div>
  );
};

export default ThemeSelection;
