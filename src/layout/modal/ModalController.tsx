import { observer } from 'mobx-react-lite';
import modalList from './modalList';
import { useStore } from '@/stores/RootStore';
import { Suspense } from 'react';

const ModalController = observer(() => {
  const { activeModal } = useStore('modalStore');

  if (!activeModal?.type) return null;

  const Modal = modalList[activeModal.type];

  if (!Modal) return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Suspense fallback={null}>{Modal(activeModal?.payload as any)}</Suspense>;
});

export default ModalController;
