import { makeObservable, observable, action } from 'mobx';
import { spaces } from '@/utils/seeds';
import { Space, UpdateSpace } from '@/features/spaces';

export class SpacesStore {
  spaces: Space[] = [];

  constructor() {
    makeObservable(this, {
      spaces: observable,
      addSpace: action,
      updateSpace: action,
      deleteSpace: action,
      fetchSpaces: action,
    });
  }

  setSpaces = (spaces: Space[]) => {
    this.spaces = spaces;
  };

  addSpace(space: Space) {
    this.spaces.push(space);
  }

  updateSpace(updatedFields: UpdateSpace) {
    const spaceIndex = this.spaces.findIndex((space) => space.uuid === updatedFields.uuid);

    if (spaceIndex !== -1) {
      this.spaces[spaceIndex] = {
        ...this.spaces[spaceIndex],
        ...updatedFields,
      };
    }
  }

  deleteSpace(uuid: string) {
    this.spaces = this.spaces.filter((space) => space.uuid !== uuid);
  }

  fetchSpaces = () => {
    this.setSpaces(spaces);
  };
}
