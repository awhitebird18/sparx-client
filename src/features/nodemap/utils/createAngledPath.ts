import { ConnectionSide } from '@/features/channels/enums/connectionSide';

export const createAngledPath = (
  startPoint: { x: number; y: number; side: ConnectionSide },
  endPoint: { x: number; y: number; side: ConnectionSide },
) => {
  const finalEndPoint = endPoint;

  let path = `M ${startPoint.x},${startPoint.y} `;

  // Determine if the line starts from the side and ends at the top or bottom
  const startsFromSide =
    startPoint.side === ConnectionSide.LEFT || startPoint.side === ConnectionSide.RIGHT;
  const endsAtTopOrBottom =
    finalEndPoint.side === ConnectionSide.TOP || finalEndPoint.side === ConnectionSide.BOTTOM;

  // Determine if the line starts from the top or bottom and ends at the side
  const startsFromTopOrBottom =
    startPoint.side === ConnectionSide.TOP || startPoint.side === ConnectionSide.BOTTOM;
  const endsAtSide =
    finalEndPoint.side === ConnectionSide.LEFT || finalEndPoint.side === ConnectionSide.RIGHT;

  if (startsFromSide && endsAtTopOrBottom) {
    // Case where the line starts from the side and ends at the top or bottom
    path += `L ${finalEndPoint.x},${startPoint.y} `;
    path += `L ${finalEndPoint.x},${finalEndPoint.y}`;
  } else if (startsFromTopOrBottom && endsAtSide) {
    // Case where the line starts from the top or bottom and ends at the side
    // This would result in a 90-degree turn from top/bottom to the side
    path += `L ${startPoint.x},${finalEndPoint.y} `;
    path += `L ${finalEndPoint.x},${finalEndPoint.y}`;
  } else {
    // Original logic for other cases
    const midX = (startPoint.x + finalEndPoint.x) / 2;
    const midY = (startPoint.y + finalEndPoint.y) / 2;

    if (startsFromSide) {
      path += `L ${midX},${startPoint.y} `;
      path += `L ${midX},${finalEndPoint.y} `;
    } else if (startsFromTopOrBottom) {
      path += `L ${startPoint.x},${midY} `;
      path += `L ${finalEndPoint.x},${midY} `;
    }
  }

  // Finish the path to the final end point if not already done
  if (!(startsFromSide && endsAtTopOrBottom) && !(startsFromTopOrBottom && endsAtSide)) {
    path += `L ${finalEndPoint.x},${finalEndPoint.y}`;
  }

  return path;
};
