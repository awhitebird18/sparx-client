import { makeAutoObservable } from 'mobx';

export class AssistantStore {
  screen?: string;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setScreen = (val: string | undefined) => {
    this.screen = val;
  };

  setIsLoading = (val: boolean) => {
    this.isLoading = val;
  };
}
