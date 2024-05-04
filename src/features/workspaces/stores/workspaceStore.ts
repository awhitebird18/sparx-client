import { makeAutoObservable, reaction } from 'mobx';
import workspaceApi from '@/features/workspaces/api';
import { CreateWorkspace } from '../types';
import { Workspace } from '../types/workspace';
import { WorkspaceDetails } from '../types/workspaceDetails';
import dayjs from 'dayjs';

export class WorkspaceStore {
  workspaces: Workspace[] = [];
  currentWorkspaceId: string | undefined = undefined;
  userWorkspaceData: WorkspaceDetails[] = [];
  lastViewedWorkspace: WorkspaceDetails | null = null;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });

    reaction(
      () => this.userWorkspaceData,
      (curr) => {
        if (curr.length) {
          this.setLastViewedWorkspace();
        }
      },
    );
  }

  resetAll = () => {
    this.workspaces = [];
    this.userWorkspaceData = [];
    this.lastViewedWorkspace = null;
    this.currentWorkspaceId = undefined;
  };

  // Computed values
  get currentUserWorkspaceData(): WorkspaceDetails | undefined {
    const userWorkspace = this.userWorkspaceData.find(
      (userWorkspace) => userWorkspace.workspaceId === this.currentWorkspaceId,
    );
    return userWorkspace;
  }

  get currentWorkspace(): Workspace | undefined {
    const channel = this.workspaces.find((workspace) => workspace.uuid === this.currentWorkspaceId);
    return channel;
  }

  // Create
  addWorkspace = (workspace: Workspace) => {
    this.workspaces.push(workspace);
  };

  addUserWorkspace = (userWorkspace: WorkspaceDetails) => {
    this.userWorkspaceData.push(userWorkspace);
  };

  // Setters
  setWorkspaces = (workspaces: Workspace[]) => {
    this.workspaces = workspaces;
  };

  setUserWorkspaceData = (userWorkspaceData: WorkspaceDetails[]) => {
    this.userWorkspaceData = userWorkspaceData;
  };

  setLastViewedWorkspace = () => {
    if (this.userWorkspaceData.length === 0) return;
    const lastViewedWorkspace = this.userWorkspaceData?.reduce((prev, curr) => {
      if (!prev) {
        return curr;
      }
      return dayjs(curr.lastViewed).isAfter(dayjs(prev.lastViewed)) ? curr : prev;
    });

    const workspaceId = lastViewedWorkspace.workspaceId;
    this.lastViewedWorkspace = lastViewedWorkspace;
    this.selectWorkspace(workspaceId);
  };

  setLastViewedWorkspaceData = (userWorkspaceData: WorkspaceDetails) => {
    this.lastViewedWorkspace = userWorkspaceData;
  };

  selectWorkspace = (workspaceId: string) => {
    this.currentWorkspaceId = workspaceId;
  };

  // Update
  updateWorkspace = (updatedWorkspace: Partial<Workspace>) => {
    const workspaceFound = this.workspaces.find(
      (workspace) => workspace.uuid === updatedWorkspace.uuid,
    );
    if (!workspaceFound) return;
    Object.assign(workspaceFound, updatedWorkspace);
  };

  updateUserWorkspaceData = (updatedUserWorkspace: WorkspaceDetails) => {
    const workspaceFound = this.userWorkspaceData.find(
      (workspace) => workspace.uuid === updatedUserWorkspace.uuid,
    );
    if (!workspaceFound) return;
    Object.assign(workspaceFound, updatedUserWorkspace);
  };

  // Api Operations
  async createWorkspaceAndJoinApi(createWorkspace: CreateWorkspace) {
    const workspace = await workspaceApi.createWorkspace(createWorkspace);

    await this.joinWorkspaceApi(workspace.uuid);
    this.addWorkspace(workspace);
    return workspace;
  }

  async updateWorkspaceApi(id: string, updateWorkspace: Partial<Workspace>) {
    const workspace = await workspaceApi.updateWorkspace(id, updateWorkspace);
    this.updateWorkspace(workspace);
  }

  async switchWorkspaceApi(workspaceId: string) {
    await workspaceApi.switchWorkspace(workspaceId);
    this.selectWorkspace(workspaceId);
  }

  async leaveWorkspaceApi(userId: string, workspaceId: string) {
    await workspaceApi.leaveWorkspace(userId, workspaceId);
  }

  async joinWorkspaceApi(workspaceId: string) {
    const userWorkspace = await workspaceApi.joinWorkspace(workspaceId);
    this.addUserWorkspace(userWorkspace);
    return userWorkspace;
  }

  async uploadWorkspaceImageApi(workspaceId: string, imgUrl: string) {
    const workspace = await workspaceApi.uploadWorkspaceImage(workspaceId, imgUrl);
    this.updateWorkspace(workspace);
  }

  async fetchUserWorkspacesApi() {
    const workspaceData = await workspaceApi.getUserWorkspaces();
    this.setUserWorkspaceData(workspaceData);
  }

  async markUserWorkspaceViewedApi(userWorkspaceId: string) {
    const userWorkspaceData = await workspaceApi.markUserWorkspaceViewed(userWorkspaceId);
    this.lastViewedWorkspace = userWorkspaceData;
    this.updateUserWorkspaceData(userWorkspaceData);
  }

  async removeTemporaryWorkspaceApi(): Promise<void> {
    if (!this.currentWorkspaceId) return;
    await workspaceApi.removeTemporaryWorkspace(this.currentWorkspaceId);
  }
}
