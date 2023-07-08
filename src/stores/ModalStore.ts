import { autorun, makeAutoObservable, toJS } from 'mobx';

export class ModalStore {
  isOpen = false;
  title = '';
  type: string | null = null;

  constructor() {
    makeAutoObservable(this);
    autorun(() => console.log(toJS(this.isOpen)));
  }

  openModal = ({ title, type }: { title: string; type: string; payload: unknown }) => {
    this.title = title;
    this.type = type;
    this.isOpen = true;
  };

  setModal = (value: boolean) => {
    this.isOpen = value;
  };

  closeModal = () => {
    this.isOpen = false;
  };
}
