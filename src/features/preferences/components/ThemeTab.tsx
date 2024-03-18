import { primaryColors } from '@/utils/primaryColors';
import { Theme } from '../enums/Theme';

import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { ScrollArea } from '@/components/ui/ScrollArea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { useStore } from '@/stores/RootStore';
import { getValidPrimaryColor } from '@/utils/getValidPrimaryColor';
import { getValidTheme } from '@/utils/getValidTheme';
import { observer } from 'mobx-react-lite';
import { Label } from '@/components/ui/Label';
import { Switch } from '@/components/ui/Switch';

import UserAvatar from '@/features/users/components/UserAvatar';
import { Button } from '@/components/ui/Button';

const ThemeTab = () => {
  const { currentUser } = useStore('userStore');
  const { theme, updateThemeApi, primaryColor, updatePrimaryColorApi } =
    useStore('userPreferencesStore');

  const handleThemeSelect = (value: string) => {
    updateThemeApi(getValidTheme(value));
  };

  const handlePrimaryColorSelect = (value: string) => {
    updatePrimaryColorApi(getValidPrimaryColor(value));
  };

  const colorOptions = primaryColors.map((color: string) => (
    <SelectItem key={color} value={color}>
      <div className="flex items-center gap-4">
        <div className={`w-6 h-6 rounded-lg ${`bg-${color}-500`}`} />
        {`${color.charAt(0).toUpperCase()}${color.substring(1).toLowerCase()}`}
      </div>
    </SelectItem>
  ));

  return (
    <ScrollArea>
      <div className="flex flex-col flex-1 gap-4">
        <h2 className="text-main text-sm font-semibold">APPEARANCE</h2>
        <div className="flex justify-between">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Sync with OS setting</h3>
            <p className="text-sm font-semibold text-muted">
              Automatically switch between light and dark mode when your system does.
            </p>
          </div>
          <Switch />
        </div>
        <div className="flex gap-4 items-center my-4">
          <div className="w-full h-px border-b border-border" />
          <div className="text-slate-500/80 font-semibold text-sm">OR</div>
          <div className="w-full h-px border-b border-border" />
        </div>

        <div>
          <RadioGroup
            defaultValue={theme}
            onValueChange={(value) => handleThemeSelect(value)}
            className="flex gap-4 h-min"
          >
            <div className="flex justify-between items-center border border-slate-500/40 rounded-lg overflow-hidden flex-1 w-full text-black/70 dark:bg-white/5 p-3 gap-4">
              <div className="flex gap-4">
                {<UserAvatar profileImage={currentUser?.profileImage} userId="" />}

                <div className="flex flex-col gap-0.5">
                  <p className="text-main font-semibold text-sm leading-normal">Jane Smith</p>
                  <Label className="text-muted text-sm font-normal leading-tight" htmlFor="light">
                    Light mode only
                  </Label>
                </div>
              </div>

              <RadioGroupItem value={Theme.LIGHT} id="light" />
            </div>
            <div className="flex justify-between items-center border border-slate-500/40 rounded-lg overflow-hidden flex-1 w-full dark:bg-black/30 bg-black/10 text-black/70 p-3 gap-4">
              <div className="flex gap-4">
                {<UserAvatar profileImage={currentUser?.profileImage} userId="" />}

                <div className="flex flex-col gap-0.5">
                  <p className="text-main font-semibold text-sm leading-normal">Jane Smith</p>
                  <Label className="text-muted text-sm font-normal leading-tight" htmlFor="dark">
                    Light mode only
                  </Label>
                </div>
              </div>

              <RadioGroupItem value={Theme.DARK} id="dark" />
            </div>
          </RadioGroup>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-main text-sm font-semibold">THEME</h2>
          <Select onValueChange={handlePrimaryColorSelect} defaultValue={primaryColor}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Select primary color" />
            </SelectTrigger>
            <SelectContent className="max-h-48">{colorOptions}</SelectContent>
          </Select>
        </div>
      </div>
    </ScrollArea>
  );
};

export default observer(ThemeTab);

// bg-violet-500 bg-sky-500 bg-blue-500 bg-lime-500 bg-teal-500 bg-cyan-500 bg-purple-500 bg-fuchsia-500 bg-pink-500 bg-rose-500 bg-slate-500 bg-green-500 bg-orange-500 bg-indigo-500 bg-amber-500
