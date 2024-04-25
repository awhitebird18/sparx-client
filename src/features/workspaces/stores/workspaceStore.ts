import { action, computed, makeAutoObservable, observable, reaction } from 'mobx';
import workspaceSpaceApi from '@/features/workspaces/api';
import { CreateWorkspace } from '../types';
import { Workspace } from '../types/workspace';
import { NodemapState } from '../types/nodemapState';
import { WorkspaceDetails } from '../types/workspaceDetails';

export class WorkspaceStore {
  workspaces: Workspace[] = [];
  currentWorkspaceId: string | undefined = undefined;
  userWorkspaceData: WorkspaceDetails[] = [];
  lastViewedWorkspace: WorkspaceDetails | null = null;
  nodemapState?: NodemapState;

  constructor() {
    makeAutoObservable(this, {
      workspaces: observable,
      userWorkspaceData: observable,
      currentWorkspaceId: observable,
      resetAll: action,
      currentUserWorkspaceData: computed,
    });

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

  setNodemapState = (nodemapState: NodemapState) => {
    this.nodemapState = nodemapState;
  };

  addWorkspace = (workspace: Workspace) => {
    this.workspaces.push(workspace);
  };

  setWorkspaces = (workspaces: Workspace[]) => {
    this.workspaces = workspaces;
  };

  setLastViewedWorkspace = () => {
    if (this.userWorkspaceData.length === 0) return;

    const lastViewedWorkspace = this.userWorkspaceData.reduce((latest, current) => {
      if (!latest.lastViewed) {
        return current;
      }

      const latestTime = new Date(latest.lastViewed).getTime();
      const currentTime = new Date(current.lastViewed).getTime();

      return latestTime > currentTime ? latest : current;
    });

    // Assuming you want to do something with lastViewedWorkspace after finding it
    // For example, setting it as a state or property

    const workspaceId = lastViewedWorkspace.workspaceId;

    this.lastViewedWorkspace = lastViewedWorkspace;
    this.selectWorkspace(workspaceId);
  };

  setLastViewedWorkspaceData = (userWorkspaceData: WorkspaceDetails) => {
    this.lastViewedWorkspace = userWorkspaceData;
  };

  addUserWorkspace = (userWorkspace: WorkspaceDetails) => {
    this.userWorkspaceData.push(userWorkspace);
  };

  selectWorkspace = (workspaceId: string) => {
    this.currentWorkspaceId = workspaceId;
  };

  switchWorkspaceApi = async (workspaceId: string) => {
    await workspaceSpaceApi.switchWorkspace(workspaceId);

    this.selectWorkspace(workspaceId);
  };

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

  createWorkspaceApi = async (createWorkspace: CreateWorkspace) => {
    const workspace = await workspaceSpaceApi.createWorkspace(createWorkspace);

    // Todo: add back
    // this.addWorkspace(workspace);

    return workspace;
  };

  updateWorkspaceApi = async (id: string, updateWorkspace: Partial<Workspace>) => {
    const workspace = await workspaceSpaceApi.updateWorkspace(id, updateWorkspace);

    this.updateWorkspace(workspace);
  };

  leaveWorkspaceApi = async (userId: string, workspaceId: string) => {
    await workspaceSpaceApi.leaveWorkspace(userId, workspaceId);
  };

  joinWorkspaceApi = async (id: string) => {
    const userWorkspace = await workspaceSpaceApi.joinWorkspace(id);

    this.addUserWorkspace(userWorkspace);
  };

  uploadWorkspaceImageApi = async (workspaceId: string, imgUrl: string) => {
    const workspace = await workspaceSpaceApi.uploadWorkspaceImage(workspaceId, imgUrl);

    this.updateWorkspace(workspace);
  };

  setUserWorkspaceData = (userWorkspaceData: WorkspaceDetails[]) => {
    this.userWorkspaceData = userWorkspaceData;
  };

  fetchUserWorkspacesApi = async () => {
    const workspaceData = await workspaceSpaceApi.getUserWorkspaces();

    this.setUserWorkspaceData(workspaceData);
  };

  markUserWorkspaceViewedApi = async (userWorkspaceId: string) => {
    const userWorkspaceData = await workspaceSpaceApi.markUserWorkspaceViewed(userWorkspaceId);

    this.lastViewedWorkspace = userWorkspaceData;
    // this.setLastViewedWorkspace();

    this.updateUserWorkspaceData(userWorkspaceData);
  };
}
