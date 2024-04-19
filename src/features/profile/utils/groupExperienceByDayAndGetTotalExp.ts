import dayjs from 'dayjs';

interface Experience {
  date: string;
  points: number;
}

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

export function groupExperienceByDayAndGetTotalExp(data: any) {
  // Prepopulate the dates for the last 7 days, including today, with points set to 0
  const last7Days: GroupedData = {};
  for (let i = 6; i >= 0; i--) {
    let date = dayjs();
    date = date.subtract(i, 'day');
    // date.setDate(date.getDate() - i);
    // const formattedDate: string = date.toISOString().split('T')[0];
    const formattedDate: string = date.format('MMM D');
    const label: string = date.format('ddd');
    last7Days[formattedDate] = { date: formattedDate, label, points: 0 };
  }

  const { totalPoints, groupedByDate }: Accumulator = data.reduce(
    (acc: Accumulator, { date, points }: Experience) => {
      // Sum total points
      acc.totalPoints += points;

      // Convert date to a specific format if needed, for consistent key comparison
      const formattedDate: string = dayjs(date).format('MMM D');

      // Check if the date is within the last 7 days and group by date and sum points for each date
      // eslint-disable-next-line no-prototype-builtins
      if (acc.groupedByDate.hasOwnProperty(formattedDate)) {
        acc.groupedByDate[formattedDate].points += points;
      }

      return acc;
    },
    { totalPoints: 0, groupedByDate: last7Days },
  );

  // Set the total experience points

  // Convert the grouped object back into an array for stats, ensuring all last 7 days are included
  const experienceGroupedByDate = Object.values(groupedByDate);

  return { totalPoints, experienceGroupedByDate };
}
