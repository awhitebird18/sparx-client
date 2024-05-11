import { makeAutoObservable } from 'mobx';
import { ModalName } from '@/layout/modal/modalList';

interface ActiveModal {
  type: ModalName;
  payload?: unknown | null;
}

export class ModalStore {
  activeModal: ActiveModal | null = null;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  // Setters
  setActiveModal = (activeModal: ActiveModal | null) => {
    this.activeModal = activeModal;
  };

  closeModal = () => {
    this.activeModal = null;
  };
}
