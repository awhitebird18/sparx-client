export const createCurvePath = (
  startPoint: { x: number; y: number },
  endPoint: { x: number; y: number },
) => {
  const finalEndPoint = endPoint;
  if (!finalEndPoint) return '';
  const controlPointX = (startPoint.x + finalEndPoint.x) / 2;
  return `M ${startPoint.x},${startPoint.y} Q ${controlPointX},${startPoint.y} ${finalEndPoint.x},${finalEndPoint.y}`;
};
