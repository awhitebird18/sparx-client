import { CreateUserStatus } from '@/features/userStatus/types/createUserStatus';
import { UpdateUserStatus } from '@/features/userStatus/types/updateUserStatus';
import { UserStatus } from '@/features/userStatus/types/userStatus';
import { makeAutoObservable } from 'mobx';
import { userStatusApi } from '@/features/userStatus/api';

export class UserStatusStore {
  userStatuses: UserStatus[] = [];

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  // Computed values
  get activeUserStatus(): UserStatus | undefined {
    return this.userStatuses.find((u: UserStatus) => u.isActive);
  }

  // Setters
  setUserStatuses = (userStatuses: UserStatus[]) => {
    this.userStatuses = userStatuses;
  };

  // Getters
  findUserStatusByUuid = (userStatusUuid: string) => {
    return this.userStatuses.find((u: UserStatus) => u.uuid === userStatusUuid);
  };

  // Create
  addUserStatus = (userStatus: UserStatus) => {
    const userStatusFound = this.findUserStatusByUuid(userStatus.uuid);
    if (userStatusFound) return;
    this.userStatuses.push(userStatus);
  };

  // Remove
  removeUserStatus = (uuid: string) => {
    this.userStatuses = this.userStatuses.filter((u: UserStatus) => u.uuid !== uuid);
  };

  // Update
  updateUserStatus = (userStatus: UserStatus) => {
    const userStatusFound = this.findUserStatusByUuid(userStatus.uuid);
    if (!userStatusFound) return;
    Object.assign(userStatusFound, userStatus);
  };

  // Api Operations
  createUserStatusApi = async (createUserStatus: CreateUserStatus) => {
    const userStatus = await userStatusApi.createUserStatus(createUserStatus);
    this.addUserStatus(userStatus);
  };

  updateUserStatusApi = async (userStatusUuid: string, updatedStatus: UpdateUserStatus) => {
    const updatedUserStatus = await userStatusApi.updateUserStatus(userStatusUuid, updatedStatus);
    this.updateUserStatus(updatedUserStatus);
  };

  removeUserStatusApi = async (userStatusUuid: string) => {
    await userStatusApi.removeUserStatus(userStatusUuid);
    this.removeUserStatus(userStatusUuid);
  };
}
