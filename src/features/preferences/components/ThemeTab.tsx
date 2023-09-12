import { Moon, Sun } from 'react-bootstrap-icons';
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

const ThemeTab = () => {
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
        <div className={`w-8 h-8 rounded-lg ${`bg-${color}-500`}`} />
        {`${color.charAt(0).toUpperCase()}${color.substring(1).toLowerCase()}`}
      </div>
    </SelectItem>
  ));

  return (
    <ScrollArea>
      <div className="flex flex-col flex-1 gap-6">
        <p className="text-muted-foreground">
          Change the appearance of Sparx across all of your workspaces:
        </p>

        <div>
          <h2 className="text-lg text-muted mb-2">App theme</h2>
          <RadioGroup
            defaultValue={theme}
            onValueChange={(value) => handleThemeSelect(value)}
            className="flex gap-4 h-44"
          >
            <div className="flex flex-col items-center border border-border rounded-lg overflow-hidden flex-1 w-full text-black/70">
              <div
                className={`bg-yellow-500/80 dark:bg-yellow-500/50 text-white text-2xl p-3 border-b border-border w-full flex justify-center flex-1 gap-4 items-center`}
              >
                {<Sun size={50} />}
              </div>
              <div className="flex gap-2 items-center justify-center p-4">
                <RadioGroupItem value={Theme.LIGHT} id="light" />
                <Label className="text-main text-lg" htmlFor="dark">
                  Light
                </Label>
              </div>
            </div>
            <div className="flex flex-col items-center border border-border rounded-lg flex-1 overflow-hidden w-full text-black/70">
              <div
                className={`bg-indigo-500/80 dark:bg-indigo-500/50 text-white text-2xl  p-3 border-b border-border w-full flex justify-center flex-1 gap-4 items-center`}
              >
                {<Moon size={50} />}
              </div>
              <div className="flex gap-2 items-center justify-center p-4">
                <RadioGroupItem value={Theme.DARK} id="dark" />
                <Label className="text-main text-lg" htmlFor="dark">
                  Dark
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>
        <div>
          <p className="text-lg text-muted mb-2">Primary Color</p>
          <Select onValueChange={handlePrimaryColorSelect} defaultValue={primaryColor}>
            <SelectTrigger className="h-14">
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
