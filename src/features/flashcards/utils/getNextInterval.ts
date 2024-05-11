import { PerformanceRating } from '../enums/performanceRating';

export const getNextInterval = (
  currentInterval: number,
  easeFactor: number,
  rating: PerformanceRating,
) => {
  let newInterval;
  switch (rating) {
    case 'again':
      newInterval = 1;
      break;
    case 'hard':
      newInterval = Math.max(currentInterval * (easeFactor - 0.2), 1);
      break;
    case 'good':
      newInterval = currentInterval * easeFactor;
      break;
    case 'easy':
      newInterval = currentInterval * (easeFactor + 0.1);
      break;
    default:
      throw new Error('Invalid rating');
  }
  return Math.ceil(newInterval);
};
