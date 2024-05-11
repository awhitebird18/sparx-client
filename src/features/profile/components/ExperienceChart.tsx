import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Skeleton } from '@/components/ui/Skeleton';
import TotalExperienceBadge from './TotalExperienceBadge';
import { useProfileStore } from '../hooks/useProfileStore';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/RootStore';
import { Theme } from '@/features/preferences/enums';

const ExperienceChart = observer(() => {
  const { theme } = useStore('userPreferencesStore');
  const { groupedExperienceByDayAndTotalExperience, isLoading } = useProfileStore();

  if (isLoading) return <Skeleton className="w-full h-80 rounded-xl" />;
  const borderColor = theme === Theme.DARK ? '#303440' : '#dadde7';
  const textColor = theme === Theme.DARK ? '#6a6e7c' : '#8e93a4';

  return (
    <div className="prose dark:prose-invert flex flex-col gap-4 w-2/3">
      <ExperienceChartHeader />
      <div className="card-base w-full h-96 flex-shrink-0 rounded-xl p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={groupedExperienceByDayAndTotalExperience.experienceGroupedByDate}
            margin={{
              top: 30,
              right: 40,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid stroke={borderColor} strokeDasharray="3" />
            <XAxis dataKey="label" scale="auto" stroke={textColor} />
            <YAxis stroke={textColor} />
            <Tooltip
              contentStyle={{
                background: '#11151c',
                padding: '0.5rem',
                borderColor: '#ffffff22',
                boxShadow: '2px 2px 10px #000000AA',
                borderRadius: '0.5rem',
                color: 'white',
              }}
              labelStyle={{ lineHeight: '1rem' }}
              itemStyle={{ lineHeight: '1rem' }}
            />
            <Line
              dataKey="points"
              stroke="#10b981"
              label="Cards added"
              strokeWidth={4}
              strokeLinecap="round"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

const ExperienceChartHeader = () => {
  return (
    <div className="flex justify-between items-center prose">
      <h3 className="text-main">Experience Earned</h3>
      <TotalExperienceBadge />
    </div>
  );
};

export default ExperienceChart;
