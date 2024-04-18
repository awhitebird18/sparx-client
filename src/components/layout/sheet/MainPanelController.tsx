import { observer } from 'mobx-react-lite';

import sidePanelComponents from './componentList';
import { useStore } from '@/stores/RootStore';
import { Suspense } from 'react';

const MainPanelController = () => {
  const { activeComponent } = useStore('mainPanelStore');

  if (!activeComponent?.type) return null;

  const Modal = sidePanelComponents[activeComponent.type];

  if (!Modal) return;

  return <Suspense fallback={null}>{Modal(activeComponent?.payload)}</Suspense>;
};

export default observer(MainPanelController);
