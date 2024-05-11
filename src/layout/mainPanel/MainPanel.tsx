import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { X } from 'react-bootstrap-icons';
import mainPanelComponents from './componentList';
import SuspenseWrapper from '@/components/SuspenseWrapper';

export const MainPanel = observer(() => {
  const { activeComponent, closeMainPanel } = useStore('mainPanelStore');
  const { sidePanelComponent } = useStore('sidePanelStore');
  if (!activeComponent?.type) return null;

  const Component = mainPanelComponents[activeComponent.type];
  if (!Component) return;

  return (
    <div
      className={`absolute top-2 left-2 bottom-2 ${
        sidePanelComponent ? 'w-2/3 4xl:w-3/4' : 'w-full'
      } transition-transform z-40 duration-300 ease-in-out`}
    >
      <div className="card-base flex flex-col gap-5 h-full p-5 mr-6">
        <div className="flex justify-between items-center prose dark:prose-invert mb-8">
          <h3 className="font-normal">{`${activeComponent.type
            .charAt(0)
            .toUpperCase()}${activeComponent.type.substring(1).toLowerCase()}`}</h3>

          <Button variant="ghost" size="icon" onClick={closeMainPanel}>
            <X size={34} />
          </Button>
        </div>
        <SuspenseWrapper>{Component()}</SuspenseWrapper>
      </div>
    </div>
  );
});
