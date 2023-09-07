import { CreateUserStatus } from '@/features/userStatus/types/createUserStatus';
import { UpdateUserStatus } from '@/features/userStatus/types/updateUserStatus';
import { UserStatus } from '@/features/userStatus/types/userStatus';
import { makeObservable, observable, action, computed } from 'mobx';

import { userStatusApi } from '@/features/userStatus/api';

export class UserStatusStore {
  userStatuses: UserStatus[] = [];

  constructor() {
    makeObservable(this, {
      userStatuses: observable,
      createUserStatusApi: action,
      updateUserStatusApi: action,
      removeUserStatusApi: action,
      findUserStatusByUuid: action,
      addUserStatus: action,
      activeUserStatus: computed,
    });
  }

  get activeUserStatus(): UserStatus | undefined {
    return this.userStatuses.find((u: UserStatus) => u.isActive);
  }

  setUserStatuses = (userStatuses: UserStatus[]) => {
    this.userStatuses = userStatuses;
  };

  addUserStatus = (userStatus: UserStatus) => {
    const userStatusFound = this.findUserStatusByUuid(userStatus.uuid);

    if (userStatusFound) return;

    this.userStatuses.push(userStatus);
  };

  removeUserStatus = (uuid: string) => {
    this.userStatuses = this.userStatuses.filter((u: UserStatus) => u.uuid !== uuid);
  };

  findUserStatusByUuid = (userStatusUuid: string) => {
    return this.userStatuses.find((u: UserStatus) => u.uuid === userStatusUuid);
  };

  updateUserStatus = (userStatus: UserStatus) => {
    const userStatusFound = this.findUserStatusByUuid(userStatus.uuid);

    if (!userStatusFound) return;

    Object.assign(userStatusFound, userStatus);
  };

  createUserStatusApi = async (createUserStatus: CreateUserStatus) => {
    const userStatus = await userStatusApi.createUserStatus(createUserStatus);

    this.addUserStatus(userStatus);
  };

  updateUserStatusApi = async (userStatusUuid: string, updatedStatus: UpdateUserStatus) => {
    const updatedUserStatus = await userStatusApi.updateUserStatus(userStatusUuid, updatedStatus);
    console.log(updatedUserStatus);

    this.updateUserStatus(updatedUserStatus);
  };

  removeUserStatusApi = async (userStatusUuid: string) => {
    await userStatusApi.removeUserStatus(userStatusUuid);

    this.removeUserStatus(userStatusUuid);
  };
}
