export const calculateCurrentInterval = (nextReviewDate: string) => {
  const today: Date = new Date();
  today.setHours(0, 0, 0, 0);
  const reviewDate: Date = new Date(nextReviewDate);
  const diffTime = Math.abs(reviewDate.getMilliseconds() - today.getMilliseconds());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
