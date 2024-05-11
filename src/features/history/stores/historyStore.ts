import { autorun, makeAutoObservable, reaction } from 'mobx';
import dayjs from 'dayjs';
import { HistoryItem } from '../types';
import { RenderHistory } from '../types/renderHistory';
import { GroupedHistoryByDate } from '../types/groupedHistoryByDate';

export class HistoryStore {
  history: HistoryItem[] = [];
  populatedHistory = {};

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });

    autorun(() => this.fetchHistory());

    reaction(
      () => this?.history?.length,
      () => {
        localStorage.setItem('navigationHistory', JSON.stringify(this.history));
      },
    );
  }

  // Computed values
  get lastHistoryItem(): HistoryItem | undefined {
    return this.history[this.history.length - 1];
  }

  get finalHistoryFormat(): RenderHistory[] {
    // Sort
    const sortedHistory = this.history.slice().sort((a, b) => b.timestamp - a.timestamp);
    // Remove duplicates
    const seenNodeIds = new Set();
    const filteredAndSortedHistory = sortedHistory.filter((item) => {
      if (!seenNodeIds.has(item.nodeId)) {
        seenNodeIds.add(item.nodeId);
        return true;
      }
      return false;
    });
    // Group by date
    const groupedHistoryByDate: GroupedHistoryByDate = filteredAndSortedHistory.reduce(
      (acc: GroupedHistoryByDate, item: HistoryItem) => {
        const dateKey = dayjs(item.timestamp).format('YYYY-MM-DD');
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(item);
        return acc;
      },
      {},
    );
    // Convert to final format
    const finalHistoryDisplayFormat = Object.entries(groupedHistoryByDate);
    return finalHistoryDisplayFormat;
  }

  // Setters
  setHistory(history: HistoryItem[]) {
    this.history = history;
  }

  fetchHistory = () => {
    const historyJson = localStorage.getItem('navigationHistory');
    const history: HistoryItem[] = historyJson ? JSON.parse(historyJson) : [];
    this.setHistory(history);
  };

  // Create
  addNewHistoryItem = (historyItem: HistoryItem) => {
    this.history.push(historyItem);
  };
}
