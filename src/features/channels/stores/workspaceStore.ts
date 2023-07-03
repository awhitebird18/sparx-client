import { makeObservable, observable, action } from "mobx";

interface Workspace {
  id: string;
  name: string;
  // Add more fields as necessary for your application
}

interface UpdateWorkspace {
  id: string;
  name?: string;
  // Add more fields as necessary for your application
}

export class WorkspaceStore {
  workspaces: Workspace[] = [];

  constructor() {
    makeObservable(this, {
      workspaces: observable,
      addWorkspace: action,
      updateWorkspace: action,
      deleteWorkspace: action,
    });
  }

  addWorkspace(workspace: Workspace) {
    this.workspaces.push(workspace);
  }

  updateWorkspace(updatedFields: UpdateWorkspace) {
    const workspaceIndex = this.workspaces.findIndex(
      (workspace) => workspace.id === updatedFields.id
    );

    if (workspaceIndex !== -1) {
      this.workspaces[workspaceIndex] = {
        ...this.workspaces[workspaceIndex],
        ...updatedFields,
      };
    }
  }

  deleteWorkspace(id: string) {
    this.workspaces = this.workspaces.filter(
      (workspace) => workspace.id !== id
    );
  }
}
