import { ConnectionSide } from '@/features/channels/enums/connectionSide';
import { useStore } from '@/stores/RootStore';
import { useEffect, useState } from 'react';

const useConnectionSides = (x: number, y: number, parentChannelId?: string) => {
  const [connectionSides, setConnectionSides] = useState<ConnectionSide[]>([]);
  const { findNodeConnections } = useStore('channelStore');

  useEffect(() => {
    const nodeConnections = findNodeConnections({ x, y }, parentChannelId);
    if (nodeConnections) setConnectionSides(nodeConnections);
  }, [findNodeConnections, parentChannelId, x, y]);

  return connectionSides;
};

export default useConnectionSides;
