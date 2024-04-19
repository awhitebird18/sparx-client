import { action, makeObservable, observable } from 'mobx';
import { MainPanelComponent } from './componentList';

type ActiveComponent = {
  type: MainPanelComponent;
  payload?: unknown | null;
};

export class MainPanelStore {
  activeComponent: ActiveComponent | null = null;

  constructor() {
    makeObservable(this, {
      activeComponent: observable,
      setMainPanel: action,
      closeMainPanel: action,
      toggleMainPanel: action,
    });
  }

  setMainPanel = (activeComponent: ActiveComponent) => {
    this.activeComponent = activeComponent;
  };

  closeMainPanel = () => {
    this.activeComponent = null;
  };

  toggleMainPanel = (activeComponent: ActiveComponent) => {
    if (this.activeComponent?.type === activeComponent.type) {
      this.activeComponent = null;
    } else {
      this.setMainPanel(activeComponent);
    }
  };
}
