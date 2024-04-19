import { action, makeObservable, observable } from 'mobx';

import { SidePanelComponent } from './componentList';

interface ActiveSidePanel {
  type: SidePanelComponent;
  payload?: unknown | null;
}

export class SidePanelStore {
  sidePanelComponent: ActiveSidePanel | null = null;

  constructor() {
    makeObservable(this, {
      sidePanelComponent: observable,
      setSidePanelComponent: action,
      closeSidePanelComponent: action,
      toggleSidePanelComponent: action,
    });
  }

  setSidePanelComponent = (sidePanelComponent: ActiveSidePanel) => {
    this.sidePanelComponent = sidePanelComponent;
  };

  closeSidePanelComponent = () => {
    this.sidePanelComponent = null;
  };

  toggleSidePanelComponent = (sidePanelComponent: ActiveSidePanel) => {
    if (this.sidePanelComponent?.type === sidePanelComponent.type) {
      this.sidePanelComponent = null;
    } else {
      this.setSidePanelComponent(sidePanelComponent);
    }
  };
}
