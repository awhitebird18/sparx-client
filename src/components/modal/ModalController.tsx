import { observer } from 'mobx-react-lite';

import modalList from './modalList';
import { useStore } from '@/stores/RootStore';
import { Suspense } from 'react';

const ModalController = () => {
  const { activeModal } = useStore('modalStore');

  if (!activeModal?.name) return null;

  const Modal = modalList[activeModal.name];

  if (!Modal) return;

  return <Suspense fallback={null}>{Modal()}</Suspense>;
};

export default observer(ModalController);
