import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import sidePanelComponents from './componentList';

export const SidePanel = observer(() => {
  const { sidePanelComponent } = useStore('sidePanelStore');

  if (!sidePanelComponent?.type) return null;

  const Component = sidePanelComponents[sidePanelComponent.type];
  if (!Component) return;

  return (
    <div
      className={`absolute top-16 right-2 h-[calc(100%-4.5rem)] w-1/3 4xl:w-1/4 transition-transform z-20 duration-300 ease-in-out`}
    >
      <div className="card-base flex flex-col gap-5 h-full p-2">{Component()}</div>
    </div>
  );
});
