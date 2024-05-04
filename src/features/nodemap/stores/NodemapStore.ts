import { makeAutoObservable, runInAction } from 'mobx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import nodemapApi from '@/features/nodemap/api';
import { NodemapSettings } from '../types/nodemapSettings';
import { Coordinates } from '../types/coordinates';
import React from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);

export class NodemapStore {
  scale = 1.0;
  initialCoordinates: Coordinates = { x: 0, y: 0 };
  isFullscreen = false;
  isDraggingNode = false;
  isLoading = false;
  isControlPressed = false;
  userCountVisible = false;
  flashcardsDueVisible = false;
  unreadMessageCountVisible = false;
  ref: React.RefObject<HTMLDivElement> | null;
  readonly = false;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });

    this.ref = React.createRef();
    this.setupFullscreenListener();
  }

  setupFullscreenListener() {
    document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange);
  }

  setReadonly(val: boolean) {
    this.readonly = val;
  }

  setRef = (ref: React.RefObject<HTMLDivElement> | null) => {
    if (ref) {
      this.ref = ref;
    } else {
      this.ref = React.createRef(); // Reset to a new ref
    }
  };

  handleFullscreenChange() {
    runInAction(() => {
      this.isFullscreen = !!document.fullscreenElement;
    });
  }

  toggleFullScreen = () => {
    if (this.isFullscreen) {
      this.exitFullScreen();
    } else {
      this.enterFullScreen();
    }
  };

  enterFullScreen = () => {
    const element = this?.ref?.current;
    if (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen().catch((err) => {
          console.error('Failed to enable full screen mode:', err);
        });
      } else {
        console.error('Fullscreen API not supported on this element:', element);
      }
    } else {
      console.error('Element is not defined or not attached.');
    }
  };

  exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  loadNodemapSettings() {
    const settingsJson = localStorage.getItem('nodemapSettings');
    if (settingsJson) {
      const settings = JSON.parse(settingsJson);

      const defaultScale = 1;
      const defaultX = 0;
      const defaultY = 0;

      if (!settings) return;
      this.setNodemapSettings({
        userCountVisible: settings.userCountVisible,
        flashcardsDueVisible: settings.flashcardsDueVisible,
        unreadMessageCountVisible: settings.unreadMessageCountVisible,
        scale: settings.scale ?? defaultScale,
        x: settings.x ?? defaultX,
        y: settings.y ?? defaultY,
      });
    }
  }

  getNodemapSettings() {
    const settingsJson = localStorage.getItem('nodemapSettings');
    if (settingsJson) {
      const settings = JSON.parse(settingsJson);

      return { scale: settings.scale, x: settings.x, y: settings.y };
    }
  }

  formatNodemapSettings() {
    const nodemapSettings = {
      userCountVisible: this.userCountVisible,
      flashcardsDueVisible: this.flashcardsDueVisible,
      unreadMessageCountVisible: this.unreadMessageCountVisible,
      scale: this.scale,
      x: this.initialCoordinates.x,
      y: this.initialCoordinates.y,
    };

    return nodemapSettings;
  }

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  setUserCountVisible = (userCountVisible: boolean) => {
    this.userCountVisible = userCountVisible;
  };

  setFlashcardsDueVisible = (userCountVisible: boolean) => {
    this.userCountVisible = userCountVisible;
  };

  setUnreadMessageCountVisible = (userCountVisible: boolean) => {
    this.userCountVisible = userCountVisible;
  };

  setInitialCoordinates = (coordinates: Coordinates) => {
    this.initialCoordinates = coordinates;
  };

  setScale = (scale: number) => {
    this.scale = scale;
  };

  setNodemapSettings = (nodemapSettings: NodemapSettings) => {
    const { userCountVisible, flashcardsDueVisible, unreadMessageCountVisible, x, y, scale } =
      nodemapSettings;

    this.setUserCountVisible(userCountVisible);
    this.setFlashcardsDueVisible(flashcardsDueVisible);
    this.setUnreadMessageCountVisible(unreadMessageCountVisible);
    this.setInitialCoordinates({ x, y });
    this.setScale(scale);
  };

  saveNodemapSettingsToLocalStorage() {
    const nodemapSettings = {
      userCountVisible: this.userCountVisible,
      flashcardsDueVisible: this.flashcardsDueVisible,
      unreadMessageCountVisible: this.unreadMessageCountVisible,
      scale: this.scale,
      x: this.initialCoordinates.x,
      y: this.initialCoordinates.y,
    };

    const settingsJson = JSON.stringify(nodemapSettings);
    localStorage.setItem('nodemapSettings', settingsJson);
  }

  fetchNodemapSettingsApi = async (workspaceId: string) => {
    const nodemapSettings = await nodemapApi.getNodemapSettings(workspaceId);
    const { userCountVisible, flashcardsDueVisible, unreadMessageCountVisible } = nodemapSettings;
    this.setUserCountVisible(userCountVisible);
    this.setFlashcardsDueVisible(flashcardsDueVisible);
    this.setUnreadMessageCountVisible(unreadMessageCountVisible);
  };

  updateNodemapSettingsApi = async (
    workspaceId: string,
    updateFields: Partial<NodemapSettings>,
  ) => {
    await nodemapApi.updateNodemapSettings(workspaceId, updateFields);
    // this.setNodemapSettings(nodemapSettings);
  };

  setIsDraggingNode = (bool: boolean) => {
    this.isDraggingNode = bool;
  };

  setIsFullscreen = (bool: boolean) => {
    this.isFullscreen = bool;
  };
  setIsControlPressed = (bool: boolean) => {
    this.isControlPressed = bool;
  };

  dispose = () => {
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange);
  };
}
