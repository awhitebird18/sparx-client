import dayjs, { Dayjs } from 'dayjs';

export const formatDate = (date: Dayjs) => {
  const messageDate = dayjs(date);
  const todaysDate = dayjs();

  if (messageDate.isSame(todaysDate, 'day')) return 'Today';

  if (messageDate.add(1, 'day').isSame(todaysDate, 'day')) return 'Yesterday';

  return messageDate.format('MMM DD YYYY');
};
