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
  isEditing = false;
  isFullscreen = false;
  isDraggingNode = false;
  isControlPressed = false;
  nodemapSettings: Partial<NodemapSettings> = {
    userCountVisible: false,
    flashcardsDueVisible: false,
    unreadMessageCountVisible: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  fetchNodemapSettingsApi = async (workspaceId: string) => {
    const nodemapSettings = await nodemapApi.getNodemapSettings(workspaceId);
    if (!nodemapSettings) {
      await nodemapApi.createNodemapSettings(workspaceId);
    }
    this.setNodemapSettings(nodemapSettings);
  };

  setNodemapSettings = (nodemapSettings: NodemapSettings) => {
    this.nodemapSettings = nodemapSettings;
  };

  updateNodemapSettings = (nodemapSettings: NodemapSettings) => {
    Object.assign(this.nodemapSettings, nodemapSettings);
  };

  updateNodemapSettingsApi = async (uuid: string, updateFields: Partial<NodemapSettings>) => {
    const nodemapSettings = await nodemapApi.updateNodemapSettings(uuid, updateFields);
    this.updateNodemapSettings(nodemapSettings);
  };

  setZoomLevel = (value: number) => {
    this.zoomLevel = value;
  };

  setIsEditing = (bool: boolean) => {
    this.isEditing = bool;
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
