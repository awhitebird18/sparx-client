import { action, makeObservable, observable } from 'mobx';
import { ModalName } from '@/layout/modal/modalList';

interface ActiveModal {
  type: ModalName;
  payload?: unknown | null;
}

export class ModalStore {
  activeModal: ActiveModal | null = null;

  constructor() {
    makeObservable(this, {
      activeModal: observable,
      setActiveModal: action,
    });
  }

  setActiveModal = (activeModal: ActiveModal | null) => {
    this.activeModal = activeModal;
  };

  closeModal = () => {
    this.activeModal = null;
  };
}
