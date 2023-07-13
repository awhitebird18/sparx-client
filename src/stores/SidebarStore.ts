import { makeObservable, observable, computed } from 'mobx';
import { ChannelStore } from '@/features/channels/stores/ChannelStore';
import { SectionStore } from '@/features/sections/stores/SectionStore';

export class SidebarStore {
  channelStore: ChannelStore;
  sectionStore: SectionStore;

  constructor(channelStore: ChannelStore, sectionStore: SectionStore) {
    makeObservable(this, {
      channelStore: observable,
      sectionStore: observable,
      organizedChannels: computed,
    });

    this.channelStore = channelStore;
    this.sectionStore = sectionStore;
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
}
