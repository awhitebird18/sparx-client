import { makeObservable, observable, computed, action, runInAction } from 'mobx';

import { ChannelStore } from '@/features/channels/stores/ChannelStore';
import { SectionStore } from '@/features/sections/stores/SectionStore';
import storage from '@/utils/storage';
import React from 'react';

export class SidebarStore {
  channelStore: ChannelStore;
  sectionStore: SectionStore;
  selectedId: string | undefined;
  debounceTimeout: ReturnType<typeof setTimeout> | undefined;
  resizeTimeout: ReturnType<typeof setTimeout> | undefined;
  sidebarWidth: number;
  isSidebarAbsolute: boolean;
  isFeedOpen: boolean;
  isFlashcardsOpen: boolean;
  isNotesOpen: boolean;
  isViewNote: boolean;
  isDiscussionOpen: boolean;
  isShortcutKeysOpen: boolean;
  isMembersOpen: boolean;
  isFullscreen: boolean;
  ref: any;

  constructor(channelStore: ChannelStore, sectionStore: SectionStore) {
    makeObservable(this, {
      channelStore: observable,
      sectionStore: observable,
      sidebarWidth: observable,
      isSidebarAbsolute: observable,
      isFeedOpen: observable,
      isNotesOpen: observable,
      isViewNote: observable,
      isFlashcardsOpen: observable,
      isMembersOpen: observable,
      isDiscussionOpen: observable,
      isShortcutKeysOpen: observable,
      isFullscreen: observable,
      enterFullScreen: action,
      exitFullScreen: action,
      toggleFullScreen: action,
      toggleFeedOpen: action,
      toggleDiscussionsOpen: action,
      toggleMembersOpen: action,
      toggleShortcutKeys: action,
      setViewNote: action,
      setRef: action,
      sidebarOpen: computed,
    });

    this.channelStore = channelStore;
    this.sectionStore = sectionStore;
    this.sidebarWidth = 300;
    this.isSidebarAbsolute = false;
    this.isFeedOpen = false;
    this.isNotesOpen = false;
    this.isViewNote = false;
    this.isFlashcardsOpen = false;
    this.isMembersOpen = false;
    this.isShortcutKeysOpen = false;
    this.isDiscussionOpen = false;
    this.isFullscreen = false;
    this.ref = React.createRef();
    this.setupFullscreenListener();
  }

  setupFullscreenListener = () => {
    document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange);
  };

  handleFullscreenChange = () => {
    runInAction(() => {
      this.isFullscreen = !!document.fullscreenElement;
    });
  };

  get sidebarOpen() {
    if (this.sidebarWidth > 65) return true;
    return false;
  }

  setRef = (ref: any) => {
    this.ref = ref;
  };

  toggleFeedOpen = () => {
    const newFeedValue = !this.isFeedOpen;

    if (newFeedValue) {
      this.isMembersOpen = false;
      this.isDiscussionOpen = false;
      this.isShortcutKeysOpen = false;
      this.isNotesOpen = false;
      this.isFlashcardsOpen = false;
    }
    this.isFeedOpen = newFeedValue;
  };

  toggleShortcutKeys = () => {
    const newFeedValue = !this.isShortcutKeysOpen;

    if (newFeedValue) {
      this.isMembersOpen = false;
      this.isDiscussionOpen = false;
      this.isFeedOpen = false;
      this.isNotesOpen = false;
      this.isFlashcardsOpen = false;
    }
    this.isShortcutKeysOpen = newFeedValue;
  };

  toggleMembersOpen = () => {
    const newValue = !this.isMembersOpen;

    if (newValue) {
      this.isFeedOpen = false;
      this.isDiscussionOpen = false;
      this.isShortcutKeysOpen = false;
      this.isNotesOpen = false;
      this.isFlashcardsOpen = false;
    }
    this.isMembersOpen = newValue;
  };

  toggleDiscussionsOpen = () => {
    const newValue = !this.isDiscussionOpen;

    if (newValue) {
      this.isFeedOpen = false;
      this.isMembersOpen = false;
      this.isShortcutKeysOpen = false;
      this.isNotesOpen = false;
      this.isFlashcardsOpen = false;
    }
    this.isDiscussionOpen = newValue;
  };

  toggleNotesOpen = () => {
    const newValue = !this.isNotesOpen;

    if (newValue) {
      this.isFeedOpen = false;
      this.isMembersOpen = false;
      this.isShortcutKeysOpen = false;
      this.isFlashcardsOpen = false;
      this.isFlashcardsOpen = false;
    }
    this.isNotesOpen = newValue;
  };

  toggleFlashcardsOpen = () => {
    const newValue = !this.isFlashcardsOpen;

    if (newValue) {
      this.isFeedOpen = false;
      this.isMembersOpen = false;
      this.isShortcutKeysOpen = false;
      this.isNotesOpen = false;
    }
    this.isFlashcardsOpen = newValue;
  };

  setViewNote = (bool: boolean) => {
    this.isViewNote = bool;
  };

  enterFullScreen = () => {
    const element = this.ref.current;
    if (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        // Firefox
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        // IE/Edge
        element.msRequestFullscreen();
      }
    }
  };

  exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }

    // else if (document.mozCancelFullScreen) {

    //   document.mozCancelFullScreen();
    // } else if (document.webkitExitFullscreen) {

    //   document.webkitExitFullscreen();
    // } else if (document.msExitFullscreen) {

    //   document.msExitFullscreen();
    // }
  };

  toggleFullScreen = () => {
    if (this.isFullscreen) {
      this.exitFullScreen();
    } else {
      this.enterFullScreen();
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

  // dispose = () => {
  //   window.removeEventListener('resize', this.debouncedHandleResize);
  //   if (this.resizeTimeout) {
  //     clearTimeout(this.resizeTimeout);
  //   }
  // };

  dispose = () => {
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange);
  };
}
