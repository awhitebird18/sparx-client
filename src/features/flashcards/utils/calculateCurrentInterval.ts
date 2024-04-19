export const calculateCurrentInterval = (nextReviewDate: any) => {
  const today: any = new Date();
  today.setHours(0, 0, 0, 0); // Reset hours to start of day
  const reviewDate: any = new Date(nextReviewDate);
  const diffTime = Math.abs(reviewDate - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
