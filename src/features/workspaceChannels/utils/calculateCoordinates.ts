import { ConnectionSide } from '@/features/channels/enums/connectionSide';
import { Channel } from '@/features/channels/types';

export function calculateCoordinates(nodeId: string, side: ConnectionSide, nodesData: Channel[]) {
  const unscaledWidth = 275;
  const unscaledHeight = 75;

  const node = nodesData.find((n) => n.uuid === nodeId);

  // Review this. Not a good idea to include unscaled dimensions to this.
  if (!node || !unscaledHeight || !unscaledWidth) {
    return { x: 0, y: 0, side: ConnectionSide.TOP };
  }

  // Assuming the x and y coordinates of the node are its center
  const x = node.x;
  const y = node.y;

  const scaledWidth = unscaledWidth;
  const scaledHeight = unscaledHeight;

  // Calculate the edge points based on the side
  switch (side) {
    case ConnectionSide.TOP:
      return { x: x, y: y - scaledHeight / 2, side };
    case ConnectionSide.BOTTOM:
      return { x: x, y: y + scaledHeight / 2, side };
    case ConnectionSide.LEFT:
      return { x: x - scaledWidth / 2, y: y, side };
    case ConnectionSide.RIGHT:
      return { x: x + scaledWidth / 2, y: y, side };
    default:
      return { x: x, y: y, side: ConnectionSide.TOP };
  }
}
