import { action, makeObservable, observable } from 'mobx';

import { SidePanelComponent } from './componentList';

interface ActiveSidePanel {
  type: SidePanelComponent;
  payload?: unknown | null;
}

export class SidePanelStore {
  sidePanelComponent: ActiveSidePanel | undefined = undefined;

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
    this.sidePanelComponent = undefined;
  };

  toggleSidePanelComponent = (sidePanelComponent: ActiveSidePanel) => {
    if (this.sidePanelComponent?.type === sidePanelComponent.type) {
      this.sidePanelComponent = undefined;
    } else {
      this.setSidePanelComponent(sidePanelComponent);
    }
  };
}
