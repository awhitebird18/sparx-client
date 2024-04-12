import { makeObservable, observable, computed, action } from 'mobx';

import { ChannelStore } from '@/features/channels/stores/ChannelStore';
import { SectionStore } from '@/features/sections/stores/SectionStore';
import storage from '@/utils/storage';

export class SidebarStore {
  channelStore: ChannelStore;
  sectionStore: SectionStore;
  selectedId: string | undefined;
  sidebarWidth: number;
  debounceTimeout: ReturnType<typeof setTimeout> | undefined;
  resizeTimeout: ReturnType<typeof setTimeout> | undefined;
  isSidebarAbsolute: boolean;
  isFeedOpen: boolean;
  ref: any;

  constructor(channelStore: ChannelStore, sectionStore: SectionStore) {
    makeObservable(this, {
      channelStore: observable,
      sidebarWidth: observable,
      sectionStore: observable,
      isSidebarAbsolute: observable,
      isFeedOpen: observable,
      toggleFeedOpen: action,
      enterFullScreen: action,
      selectedId: observable,
      organizedChannels: computed,
      setSelectedId: action,
      handleResize: action,
      setSidebarWidth: action,
      loadSidebarWidthFromLocalStorage: action,
      sidebarOpen: computed,
      toggleSidebar: action,
      ref: observable,
      setRef: action,
    });

    this.channelStore = channelStore;
    this.sectionStore = sectionStore;
    this.selectedId = undefined;
    this.sidebarWidth = 300;
    this.isSidebarAbsolute = false;
    this.isFeedOpen = false;

    this.loadSidebarWidthFromLocalStorage();
  }

  get sidebarOpen() {
    if (this.sidebarWidth > 65) return true;
    return false;
  }

  setRef = (ref: any) => {
    this.ref = ref;
  };

  toggleFeedOpen = () => {
    this.isFeedOpen = !this.isFeedOpen;
  };

  enterFullScreen = () => {
    if (this.ref.current) {
      if (this.ref.current.requestFullscreen) {
        this.ref.current.requestFullscreen();
      } else if (this.ref.current.mozRequestFullScreen) {
        /* Firefox */
        this.ref.current.mozRequestFullScreen();
      } else if (this.ref.current.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.ref.current.webkitRequestFullscreen();
      } else if (this.ref.current.msRequestFullscreen) {
        /* IE/Edge */
        this.ref.current.msRequestFullscreen();
      }
    }
  };

  handleResize = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth < 700) {
      this.setSidebarWidth(65);
      this.isSidebarAbsolute = true;
    } else {
      this.isSidebarAbsolute = false;
    }
  };

  toggleSidebar = () => {
    if (this.sidebarOpen) {
      this.setSidebarWidth(65);
    } else {
      this.setSidebarWidth(300);
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

  saveSidebarWidthToLocalStorage = (width: number) => {
    storage.setSidebarWidth(width);
  };

  loadSidebarWidthFromLocalStorage = () => {
    const savedWidth = storage.getSidebarWidth();

    this.sidebarWidth = savedWidth || this.sidebarWidth;
  };

  get organizedChannels() {
    const placeholder = this.sectionStore.sections
      // .map((section) => ({
      //   ...section,
      //   // channels: this.channelStore.subscribedChannels.filter(
      //   //   // Todo: channel does not have sectionId
      //   //   (channel) => channel.sectionId === section.uuid,
      //   // ),
      // }))
      .slice()
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
