import { makeAutoObservable } from 'mobx';
import { Activity } from '../types/activity';
import activityApi from '@/features/activity/api';

export class ActivityStore {
  activities: Activity[] = [];
  isLoading = true;
  hasMore = true;
  page = 1;

  constructor() {
    makeAutoObservable(this);
  }

  setHasMore = (val: boolean) => {
    this.hasMore = val;
  };

  incrementPage = () => {
    this.page += 1;
  };

  setIsLoading = (val: boolean) => {
    this.isLoading = val;
  };

  fetchMoreActivities = async (endpoint: string) => {
    this.setIsLoading(true);
    const minimumLoadingTimePromise = new Promise((resolve) => setTimeout(resolve, 400));
    const [data] = await Promise.all([
      activityApi.getWorkspaceActivities(`${endpoint}?page=${this.page}`),
      minimumLoadingTimePromise,
    ]);

    if (data.length < 10) {
      this.setIsLoading(false);
      this.setHasMore(false);
    }
    this.setActivities([...this.activities, ...data]);
    this.setIsLoading(false);
  };

  setActivities = (activities: Activity[]) => {
    this.activities = activities;
  };
}
