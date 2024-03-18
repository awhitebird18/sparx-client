import { ConnectionSide } from '@/features/channels/enums/connectionSide';

export type Line = {
  uuid?: string;
  start: { nodeId: string; side: ConnectionSide };
  end?: { nodeId: string; side: ConnectionSide; x?: number; y?: number } | null;
};
