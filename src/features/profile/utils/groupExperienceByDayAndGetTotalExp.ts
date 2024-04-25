import dayjs from 'dayjs';
import { Experience } from '../types/experience';

interface GroupedData {
  [key: string]: {
    date: string;
    points: number;
    label: string;
  };
}

interface Accumulator {
  totalPoints: number;
  groupedByDate: GroupedData;
}

export function groupExperienceByDayAndGetTotalExp(data: Experience[]) {
  const last7Days: GroupedData = {};
  for (let i = 6; i >= 0; i--) {
    let date = dayjs();
    date = date.subtract(i, 'day');
    const formattedDate: string = date.format('MMM D');
    const label: string = date.format('ddd');
    last7Days[formattedDate] = { date: formattedDate, label, points: 0 };
  }

  const { totalPoints, groupedByDate }: Accumulator = data.reduce(
    (acc: Accumulator, { date, points }: Experience) => {
      acc.totalPoints += points;
      const formattedDate: string = dayjs(date).format('MMM D');

      // eslint-disable-next-line no-prototype-builtins
      if (acc.groupedByDate.hasOwnProperty(formattedDate)) {
        acc.groupedByDate[formattedDate].points += points;
      }
      return acc;
    },
    { totalPoints: 0, groupedByDate: last7Days },
  );

  const experienceGroupedByDate = Object.values(groupedByDate);

  return { totalPoints, experienceGroupedByDate };
}
