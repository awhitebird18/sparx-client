import { makeObservable, observable, action } from "mobx";

interface Space {
  id: string;
  name: string;
  // Add more fields as necessary for your application
}

interface UpdateSpace {
  id: string;
  name?: string;
  // Add more fields as necessary for your application
}

export class SpacesStore {
  spaces: Space[] = [];

  constructor() {
    makeObservable(this, {
      spaces: observable,
      addWorkspace: action,
      updateWorkspace: action,
      deleteWorkspace: action,
    });
  }

  addWorkspace(workspace: Space) {
    this.spaces.push(workspace);
  }

  updateWorkspace(updatedFields: UpdateSpace) {
    const workspaceIndex = this.spaces.findIndex(
      (workspace) => workspace.id === updatedFields.id
    );

    if (workspaceIndex !== -1) {
      this.spaces[workspaceIndex] = {
        ...this.spaces[workspaceIndex],
        ...updatedFields,
      };
    }
  }

  deleteWorkspace(id: string) {
    this.spaces = this.spaces.filter((workspace) => workspace.id !== id);
  }
}
