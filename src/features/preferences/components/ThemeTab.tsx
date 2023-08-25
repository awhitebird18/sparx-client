import { Moon, Sun } from 'react-bootstrap-icons';

import { useTheme } from '@/providers/theme';
import { primaryColors } from '@/utils/primaryColors';
import { Theme } from '../enums/Theme';

import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { ScrollArea } from '@/components/ui/ScrollArea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

const ThemeTab = () => {
  const { theme, setAppTheme, primaryColor, setPrimaryColor } = useTheme();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleThemeSelect = (e: any) => {
    window.localStorage.setItem('theme', e.target.value);
    setAppTheme(e.target.value);
  };

  const handlePrimaryColorSelect = (value: string) => {
    window.localStorage.setItem('primaryColor', value);
    setPrimaryColor(value);
  };

  return (
    <div className="flex flex-col h-100 flex-1 h-full">
      <p className="text-sm text-muted-foreground">
        Change the appearance of Sparx across all of your spaces.
      </p>

      <ScrollArea className="h-full pr-1 space-y-6">
        <div className="mb-6">
          <h2 className="text-sm mb-2">App theme</h2>
          <RadioGroup
            defaultValue={theme}
            onClick={(e) => handleThemeSelect(e)}
            className="space-y-4"
          >
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <div className="gap-2 px-4 mt-1 border-r border-border">
                <RadioGroupItem value={Theme.LIGHT} id="light" />
              </div>
              <div
                className={`${
                  theme === 'light' ? 'bg-yellow-500' : 'bg-secondary'
                } text-accent-foreground p-3 border-b border-border w-full flex gap-4 items-center h-14`}
              >
                Light
                {theme === 'light' && <Sun className="mt-0.5" />}
              </div>
            </div>
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <div className="px-4 mt-1 border-r border-border">
                <RadioGroupItem value={Theme.DARK} id="dark" />
              </div>
              <div
                className={`${
                  theme === 'dark' ? 'bg-indigo-800' : 'bg-secondary'
                } text-accent-foreground p-3 border-b border-border w-full flex gap-4 items-center h-14`}
              >
                Dark
                {theme === 'dark' && <Moon className="mt-0.5" />}
              </div>
            </div>
          </RadioGroup>
        </div>
        <div>
          <p className="text-sm my-2">Primary Color</p>
          <Select onValueChange={handlePrimaryColorSelect} defaultValue={primaryColor}>
            <SelectTrigger className="h-14">
              <SelectValue placeholder="Select primary color" />
            </SelectTrigger>
            <SelectContent className="max-h-48">
              <SelectGroup>
                {primaryColors.map((color: string) => (
                  <SelectItem key={color} value={color}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 bg-${color}-500 rounded-lg`} />
                      {`${color.charAt(0).toUpperCase()}${color.substring(1).toLowerCase()}`}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ThemeTab;
