import { observer } from 'mobx-react-lite';

import sidePanelComponents from './componentList';
import { useStore } from '@/stores/RootStore';
import { Suspense } from 'react';

const SidePanelController = () => {
  const { sidePanelComponent } = useStore('sidePanelStore');

  if (!sidePanelComponent?.type) return null;

  const Modal = sidePanelComponents[sidePanelComponent.type];

  if (!Modal) return;

  return <Suspense fallback={null}>{Modal(sidePanelComponent?.payload)}</Suspense>;
};

export default observer(SidePanelController);
