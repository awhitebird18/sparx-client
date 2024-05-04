import { MainPanelComponent } from '@/layout/mainPanel/componentList';
import { SidePanelComponent } from '@/layout/sidePanel/componentList';

export type HistoryItem = {
  timestamp: number;
  nodeId: string;
  sidePanel?: SidePanelComponent;
  mainPanel?: MainPanelComponent;
};
