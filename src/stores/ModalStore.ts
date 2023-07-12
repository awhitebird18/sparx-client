import { makeAutoObservable } from 'mobx';
import { ModalName } from '@/components/modal/modalList';

interface ActiveModal {
  type: ModalName;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any | null;
}

export class ModalStore {
  activeModal: ActiveModal | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setActiveModal = (activeModal: ActiveModal | null) => {
    this.activeModal = activeModal;
  };
}
