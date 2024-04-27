import { makeAutoObservable } from 'mobx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import nodemapApi from '@/features/nodemap/api';
import { NodemapSettings } from '../types/nodemapSettings';

dayjs.extend(utc);
dayjs.extend(timezone);

export class NodemapStore {
  zoomLevel = 1.0;
  isFullscreen = false;
  isDraggingNode = false;
  isLoading = false;
  isControlPressed = false;
  nodemapSettings: Partial<NodemapSettings> = {
    userCountVisible: false,
    flashcardsDueVisible: false,
    unreadMessageCountVisible: false,
    xPosition: 4000,
    yPosition: 4000,
    zoomLevel: 1,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setIsLoading(bool: boolean) {
    this.isLoading = bool;
  }

  fetchNodemapSettingsApi = async (workspaceId: string) => {
    const nodemapSettings = await nodemapApi.getNodemapSettings(workspaceId);
    if (!nodemapSettings) {
      await nodemapApi.createNodemapSettings(workspaceId);
    }

    console.log(nodemapSettings);
    this.setNodemapSettings(nodemapSettings);
  };

  setNodemapSettings = (nodemapSettings: NodemapSettings) => {
    this.nodemapSettings = nodemapSettings;
  };

  updateNodemapSettings = (nodemapSettings: NodemapSettings) => {
    Object.assign(this.nodemapSettings, nodemapSettings);
  };

  updateNodemapSettingsApi = async (
    workspaceId: string,
    updateFields: Partial<NodemapSettings>,
  ) => {
    const nodemapSettings = await nodemapApi.updateNodemapSettings(workspaceId, updateFields);
    this.updateNodemapSettings(nodemapSettings);
  };

  setZoomLevel = (value: number) => {
    this.zoomLevel = value;
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
}
