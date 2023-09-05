import { CreateUserStatus } from '@/features/userStatus/types/createUserStatus';
import { UpdateUserStatus } from '@/features/userStatus/types/updateUserStatus';
import { UserStatus } from '@/features/userStatus/types/userStatus';
import { makeObservable, observable, action } from 'mobx';

import { userStatusApi } from '@/features/userStatus/api';

export class UserStatusStore {
  userStatuses: UserStatus[] = [];

  constructor() {
    makeObservable(this, {
      userStatuses: observable,
      createUserStatusApi: action,
      updateUserStatusApi: action,
      removeUserStatusApi: action,
    });
  }

  addUserStatus = (userStatus: UserStatus) => {
    const userStatusFound = this.findUserStatusByUuid(userStatus.uuid);

    if (userStatusFound) return;

    this.userStatuses.push(userStatus);
  };

  findUserStatusByUuid = (userStatusUuid: string) => {
    return this.userStatuses.find((u: UserStatus) => u.uuid === userStatusUuid);
  };

  updateUserStatus = (userStatus: UserStatus) => {
    const userStatusFound = this.findUserStatusByUuid(userStatus.uuid);

    if (!userStatusFound) return;

    Object.assign(userStatusFound, userStatus);
  };

  async createUserStatusApi(createUserStatus: CreateUserStatus) {
    const userStatus = await userStatusApi.createUserStatus(createUserStatus);

    this.addUserStatus(userStatus);
  }

  async updateUserStatusApi(userStatusUuid: string, updatedStatus: UpdateUserStatus) {
    const updatedUserStatus = await userStatusApi.updateUserStatus(userStatusUuid, updatedStatus);

    this.updateUserStatus(updatedUserStatus);
  }

  async removeUserStatusApi(userStatusUuid: string) {
    await userStatusApi.removeUserStatus(userStatusUuid);
  }
}
