import { observer } from 'mobx-react-lite';

import modalList from './modalList';
import { useStore } from '@/stores/RootStore';
import { Suspense } from 'react';

const ModalController = () => {
  const { activeModal } = useStore('modalStore');

  if (!activeModal?.type) return null;

  const Modal = modalList[activeModal.type];

  if (!Modal) return;

  return <Suspense fallback={null}>{Modal(activeModal?.payload)}</Suspense>;
};

export default observer(ModalController);
