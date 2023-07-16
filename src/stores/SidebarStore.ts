import { makeObservable, observable, computed, action } from 'mobx';
import { ChannelStore } from '@/features/channels/stores/ChannelStore';
import { SectionStore } from '@/features/sections/stores/SectionStore';

export class SidebarStore {
  channelStore: ChannelStore;
  sectionStore: SectionStore;
  selectedId: string | undefined;

  constructor(channelStore: ChannelStore, sectionStore: SectionStore) {
    makeObservable(this, {
      channelStore: observable,
      sectionStore: observable,
      selectedId: observable,
      organizedChannels: computed,
      setSelectedId: action,
    });

    this.channelStore = channelStore;
    this.sectionStore = sectionStore;
    this.selectedId = undefined;
  }

  get organizedChannels() {
    const placeholder = this.sectionStore.sections.map((section) => ({
      ...section,
      channels: this.channelStore.subscribedChannels.filter(
        (channel) => channel.sectionId === section.uuid,
      ),
    }));

    return placeholder;
  }

  setSelectedId = (id: string) => {
    this.selectedId = id;
  };
}
