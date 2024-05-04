import { ScrollArea } from '@/components/ui/ScrollArea';
import { observer } from 'mobx-react-lite';
import { Switch } from '@/components/ui/Switch';
import ThemeSelection from './ThemeSelection';
import PrimaryColorSelection from './PrimaryColorSelection';

const ThemeTab = observer(() => {
  return (
    <ScrollArea>
      <div className="flex flex-col flex-1 gap-4 pr-1">
        <h2 className="text-main text-sm font-semibold">APPEARANCE</h2>
        <SyncWithOS />
        <Divider />
        <ThemeSelection />
        <PrimaryColorSelection />
      </div>
    </ScrollArea>
  );
});

const Divider = () => (
  <div className="flex gap-4 items-center my-4">
    <div className="card w-full h-px border-b border-border" />
    <div className="text-secondary font-medium text-xs">OR</div>
    <div className="card w-full h-px border-b border-border" />
  </div>
);

const SyncWithOS = () => (
  <div className="flex justify-between">
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">Sync with OS setting</h3>
      <p className="text-sm font-semibold text-muted">
        Automatically switch between light and dark mode when your system does.
      </p>
    </div>
    <Switch />
  </div>
);

export default ThemeTab;

// bg-violet-500 bg-sky-500 bg-blue-500 bg-lime-500 bg-teal-500 bg-cyan-500 bg-purple-500 bg-fuchsia-500 bg-pink-500 bg-rose-500 bg-slate-500 bg-green-500 bg-orange-500 bg-indigo-500 bg-amber-500 bg-emerald-500
