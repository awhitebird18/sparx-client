import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { X } from 'react-bootstrap-icons';
import mainPanelComponents from './componentList';

export const MainPanel = observer(() => {
  const { activeComponent, closeMainPanel } = useStore('mainPanelStore');
  const { sidePanelComponent } = useStore('sidePanelStore');

  if (!activeComponent?.type) return null;

  const Component = mainPanelComponents[activeComponent.type];

  if (!Component) return;

  return (
    <div
      className={`absolute top-0 left-0 h-full ${
        sidePanelComponent ? 'w-2/3 4xl:w-3/4' : 'w-full'
      } p-3 pr-1 transition-transform z-40 duration-300 ease-in-out`}
    >
      <div className="flex flex-col gap-5 bg-card card h-full p-5 rounded-md shadow-md border border-border card">
        <div className="flex justify-between items-center prose dark:prose-invert mb-8">
          <h3 className="font-normal">{`${activeComponent.type
            .charAt(0)
            .toUpperCase()}${activeComponent.type.substring(1).toLowerCase()}`}</h3>

          <Button variant="ghost" size="icon" onClick={closeMainPanel}>
            <X size={34} />
          </Button>
        </div>
        {Component(activeComponent?.payload as any)}
      </div>
    </div>
  );
});
