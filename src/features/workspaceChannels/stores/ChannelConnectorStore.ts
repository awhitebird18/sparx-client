import { action, makeObservable, observable } from 'mobx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Line } from '../types/line';
import channelApi from '@/features/channels/api';
import { ConnectionSide } from '@/features/channels/enums/connectionSide';
import { CreateChannelConnector } from '@/features/channels/types/createChannelConnector';

dayjs.extend(utc);
dayjs.extend(timezone);

export class ChannelConnectorStore {
  channelConnectors: Line[] = [];
  isLoading = false;
  selectedLineId: string | null = null;

  constructor() {
    makeObservable(this, {
      channelConnectors: observable,
      selectedLineId: observable,
      removeChannelConnectorByIndex: action,
      removeChannelConnectorApi: action,
      setSelectedLineId: action,
      handleCreateLine: action,
    });
  }

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  setChannelConnectors = (channels: Line[]) => {
    this.channelConnectors = channels;
  };

  setSelectedLineId = (id: string | null) => {
    this.selectedLineId = id;
  };

  addChannelConnector = (channelConnector: Line) => {
    const channelConnectorFound = this.channelConnectors.find(
      (el: Line) => el.uuid === channelConnector.uuid,
    );

    if (channelConnectorFound) return;

    this.channelConnectors.push(channelConnector);
  };

  removeChannelConnector = (uuid: string) => {
    this.channelConnectors = this.channelConnectors.filter((el: Line) => el.uuid !== uuid);
  };

  createChannelConnectorApi = async (
    channelConnector: CreateChannelConnector,
    workspaceId: string,
  ) => {
    const newChannelConnector = await channelApi.createChannelConnector(
      channelConnector,
      workspaceId,
    );

    const channelConnectorFound = this.channelConnectors.find(
      (el: Line) => el.uuid === newChannelConnector.uuid,
    );

    if (channelConnectorFound) {
      this.updateChannelConnector(newChannelConnector);
    } else {
      this.addChannelConnector(newChannelConnector);
    }
  };

  updateChannelConnector = (channelConnector: Partial<Line>) => {
    const channelConnectorFound = this.channelConnectors.find(
      (channel) => channel.uuid === channelConnector.uuid,
    );

    if (!channelConnectorFound) return;

    Object.assign(channelConnectorFound, channelConnector);
  };

  removeChannelConnectorApi = async (uuid: string, workspaceId: string) => {
    this.channelConnectors = this.channelConnectors.filter((el: Line) => el.uuid !== uuid);
    await channelApi.removeChannelConnector(uuid, workspaceId);

    this.removeChannelConnector(uuid);
  };

  removeChannelConnectorByIndex = (index: number) => {
    this.channelConnectors = this.channelConnectors.filter((_, i) => i !== index);
  };

  handleCreateLine = async (nodeId: string, side: ConnectionSide, workspaceId: string) => {
    const prevLines = this.channelConnectors;
    const isAssigningEndNode = prevLines.length > 0 && prevLines[prevLines.length - 1].end === null;

    if (isAssigningEndNode) {
      const updatedLines = prevLines.filter((line) => line.end?.nodeId !== nodeId);
      const lastLine = updatedLines[updatedLines.length - 1];

      const createChannelConnectorDto = {
        parentChannelId: lastLine.start.nodeId,
        parentSide: lastLine.start.side,
        childChannelId: nodeId,
        childSide: side,
      };

      try {
        const response = await channelApi.createChannelConnector(
          createChannelConnectorDto,
          workspaceId,
        );

        // Update the state with the new end node
        this.setChannelConnectors([
          ...updatedLines.slice(0, -1),
          {
            ...lastLine,
            end: { nodeId, side },
            uuid: response.uuid,
          },
        ]);
      } catch (error) {
        console.error('Error creating connection:', error);
      }
    } else {
      this.setChannelConnectors([...prevLines, { start: { nodeId, side }, end: null }]);
    }
  };

  fetchWorkspaceChannelConnectorsApi = async (workspaceId: string) => {
    this.setIsLoading(true);
    const lines = await channelApi.getChannelConnectors(workspaceId);

    this.setChannelConnectors(lines);

    this.setIsLoading(false);
  };
}
