export const createAngledPath = (
  startPoint: { x: number; y: number },
  endPoint: { x: number; y: number },
) => {
  let path = `M ${startPoint.x},${startPoint.y} `;

  const midX = (startPoint.x + endPoint.x) / 2;

  path += `L ${midX},${startPoint.y} `;
  path += `L ${midX},${endPoint.y} `;

  path += `L ${endPoint.x},${endPoint.y}`;

  return path;
};
