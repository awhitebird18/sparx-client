import { makeObservable, observable, computed, action } from 'mobx';
import { ChannelStore } from '@/features/channels/stores/ChannelStore';
import { SectionStore } from '@/features/sections/stores/SectionStore';

export class SidebarStore {
  channelStore: ChannelStore;
  sectionStore: SectionStore;
  selectedId: string | undefined;
  sidebarWidth: number;

  constructor(channelStore: ChannelStore, sectionStore: SectionStore) {
    makeObservable(this, {
      channelStore: observable,
      sidebarWidth: observable,
      sectionStore: observable,
      selectedId: observable,
      organizedChannels: computed,
      setSelectedId: action,
    });

    this.channelStore = channelStore;
    this.sectionStore = sectionStore;
    this.selectedId = undefined;
    this.sidebarWidth = 250;
  }

  get organizedChannels() {
    const placeholder = this.sectionStore.sections
      .map((section) => ({
        ...section,
        channels: this.channelStore.subscribedChannels.filter(
          (channel) => channel.sectionId === section.uuid,
        ),
      }))
      .sort((a, b) => {
        if (a.isSystem !== b.isSystem) {
          // First sort by isSystem (true values come first)
          return Number(b.isSystem) - Number(a.isSystem);
        } else {
          // If isSystem is equal, sort by name (alphabetically)
          return a.name.localeCompare(b.name);
        }
      });

    return placeholder;
  }

  setSelectedId = (id: string) => {
    this.selectedId = id;
  };
  setSidebarWidth = (val: number) => {
    this.sidebarWidth = val;
  };
}
