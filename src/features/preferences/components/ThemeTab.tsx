import { Label } from '@/components/ui/Label';

import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { ScrollArea } from '@/components/ui/ScrollArea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

import { useTheme } from '@/providers/theme';

enum ThemeType {
  LIGHT = 'light',
  DARK = 'dark',
}

enum PrimaryColorType {
  BLUE = 'blue',
  RED = 'red',
  GREEN = 'green',
}

const ThemeTab = () => {
  const { theme, setAppTheme } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleThemeSelect = (e: any) => {
    window.localStorage.setItem('theme', e.target.value);

    setAppTheme(e.target.value);
  };

  return (
    <div className="flex flex-col h-100 flex-1 h-full overflow-auto ">
      <ScrollArea className="h-100 overflow-hidden pr-4">
        <p>Change the appearance of ChatApp across all of your spaces.</p>

        <h2 className="font-semibold mb-1 mt-3">App theme</h2>

        <RadioGroup
          defaultValue={theme}
          onClick={(e) => handleThemeSelect(e)}
          className="space-y-4"
        >
          <div className="flex flex-col border border-border rounded-lg overflow-hidden">
            <div className="w-full bg-accent text-accent-foreground p-3 border-b border-border">
              Light
            </div>
            <div className="flex gap-2 p-3">
              <RadioGroupItem value={ThemeType.LIGHT} id="r2" />
              <Label className="font-normal">Light</Label>
            </div>
          </div>

          <div className="flex flex-col border border-border rounded-lg overflow-hidden">
            <div className="w-full bg-border text-foreground p-3 border-b border-border">Dark</div>
            <div className="flex gap-2 p-3">
              <RadioGroupItem value={ThemeType.DARK} id="r2" />
              <Label className="font-normal">Dark</Label>
            </div>
          </div>
        </RadioGroup>

        <h2 className="font-semibold mb-1 mt-3">Primary Color</h2>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select primary color</SelectLabel>
              <SelectItem value={PrimaryColorType.BLUE}>Blue</SelectItem>
              <SelectItem value={PrimaryColorType.GREEN}>Red</SelectItem>
              <SelectItem value={PrimaryColorType.RED}>Red</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </ScrollArea>
    </div>
  );
};

export default ThemeTab;
