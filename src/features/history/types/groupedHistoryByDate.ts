import { HistoryItem } from './historyItem';

export type GroupedHistoryByDate = {
  [date: string]: HistoryItem[];
};
