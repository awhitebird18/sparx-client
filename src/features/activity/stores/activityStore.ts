import { makeAutoObservable } from 'mobx';
import { Activity } from '../types/activity';
import activityApi from '@/features/activity/api';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

export class ActivityStore {
  activities: Activity[] = [];
  isLoading = true;
  hasMore = true;
  initialLoad = true;
  page = 1;

  constructor() {
    makeAutoObservable(this);
  }

  // Setters
  setHasMore = (val: boolean) => {
    this.hasMore = val;
  };

  setIsLoading = (val: boolean) => {
    this.isLoading = val;
  };

  setInitialLoad = (bool: boolean) => {
    this.initialLoad = bool;
  };

  incrementPage = () => {
    this.page += 1;
  };

  get displayActivities() {
    console.log(
      this.activities.map((activity) => ({
        ...activity,
        createdAt: dayjs(activity.createdAt).fromNow(),
      })),
    );
    return this.activities.map((activity) => ({
      ...activity,
      createdAt: dayjs(activity.createdAt).fromNow(),
    }));
  }

  // Create
  addActivities = (activity: Activity[]) => {
    this.activities = [...this.activities, ...activity];
  };

  // Api Operations
  fetchActivities = async (workspaceId: string, userId?: string) => {
    this.setIsLoading(true);
    try {
      const endpoint = userId
        ? `/activity/workspace/${workspaceId}/user/${userId}?page=${this.page}`
        : `/activity/workspace/${workspaceId}?page=${this.page}`;
      const data = await activityApi.getActivities(endpoint);

      this.addActivities(data);
      this.setHasMore(data.length === 10);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    } finally {
      this.setIsLoading(false);
    }
  };
}
