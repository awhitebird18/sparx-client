import { gridSize } from './gridSize';

export function snapToGrid(value: number) {
  return Math.round(value / gridSize) * gridSize;
}
