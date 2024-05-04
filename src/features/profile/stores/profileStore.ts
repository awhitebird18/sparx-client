import { makeAutoObservable } from 'mobx';
import taskApi from '@/features/tasks/api';
import { Experience } from '../types/experience';
import { groupExperienceByDayAndGetTotalExp } from '../utils/groupExperienceByDayAndGetTotalExp';

export class ProfileStore {
  isLoading = false;
  experience: Experience[] = [];

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  get groupedExperienceByDayAndTotalExperience() {
    const data = groupExperienceByDayAndGetTotalExp(this.experience);

    return data;
  }

  setIsLoading(bool: boolean) {
    this.isLoading = bool;
  }

  fetchUserExperience = async (userId: string, workspaceId: string) => {
    this.setIsLoading(true);
    await taskApi.getExperience(userId, workspaceId);

    this.setIsLoading(false);
  };
}
