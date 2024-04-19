export const formatReviewInterval = (interval: number) => {
  if (interval === 1) {
    return '1 day';
  } else {
    return `${interval} days`;
  }
};
