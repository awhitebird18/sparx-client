import { makeObservable, observable, computed, action } from 'mobx';
import { ChannelStore } from '@/features/channels/stores/ChannelStore';
import { SectionStore } from '@/features/sections/stores/SectionStore';

export class SidebarStore {
  channelStore: ChannelStore;
  sectionStore: SectionStore;
  selectedId: string | undefined;
  sidebarWidth: number;
  debounceTimeout: ReturnType<typeof setTimeout> | undefined;
  resizeTimeout: ReturnType<typeof setTimeout> | undefined;
  isSidebarAbsolute: boolean;

  constructor(channelStore: ChannelStore, sectionStore: SectionStore) {
    makeObservable(this, {
      channelStore: observable,
      sidebarWidth: observable,
      sectionStore: observable,
      isSidebarAbsolute: observable,
      selectedId: observable,
      organizedChannels: computed,
      setSelectedId: action,
      dispose: action,
      handleResize: action,
    });

    this.channelStore = channelStore;
    this.sectionStore = sectionStore;
    this.selectedId = undefined;
    this.sidebarWidth = 250;
    this.isSidebarAbsolute = false;

    this.loadSidebarWidthFromLocalStorage();
  }

  handleResize = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth < 700) {
      this.setSidebarWidth(0);
      this.isSidebarAbsolute = true;
    } else {
      this.isSidebarAbsolute = false;
    }
  };

  debouncedHandleResize = () => {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(this.handleResize, 300); // 300ms delay
  };

  setSidebarWidth = (val: number) => {
    this.sidebarWidth = val;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = setTimeout(() => {
      this.saveSidebarWidthToLocalStorage(val);
    }, 300);
  };

  saveSidebarWidthToLocalStorage = (val: number) => {
    localStorage.setItem('sidebarWidth', val.toString());
  };

  loadSidebarWidthFromLocalStorage = () => {
    const savedWidth = localStorage.getItem('sidebarWidth');
    if (savedWidth) {
      this.sidebarWidth = Number(savedWidth);
    }
  };

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

  dispose = () => {
    window.removeEventListener('resize', this.debouncedHandleResize);
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  };
}
