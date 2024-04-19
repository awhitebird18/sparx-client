export const getColor = (count: any) => {
  if (count > 20) return 'bg-primary-lighter';
  if (count > 15) return 'bg-primary-light';
  if (count > 10) return 'bg-primary';
  if (count > 5) return 'bg-primary-dark';
  if (count > 0) return 'bg-primary-darkest';
  return 'bg-card';
};
