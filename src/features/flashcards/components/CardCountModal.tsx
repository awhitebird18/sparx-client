import Modal from '@/layout/modal/Modal';
import { ResponsiveContainer, PieChart, Pie } from 'recharts';
import { COLORS } from '../utils/cardCountUtils';
import CustomChartLabel from './CustomChartLabel';
import useCardCountStats from '../hooks/useCardCountStats';

const CardCountModal = () => {
  const stats = useCardCountStats();

  const totalCardCount = stats.reduce((acc, curr) => {
    return acc + curr.count;
  }, 0);

  return (
    <Modal title="Cards Reviewed" className="h-96 w-[40rem] flex items-center gap-6">
      <div className="w-2/3 h-full prose dark:prose-invert">
        {totalCardCount > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={stats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={CustomChartLabel}
                outerRadius={130}
                fill="#8884d8"
                dataKey="count"
              ></Pie>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="card-base w-full h-full items-center justify-center flex">
            <h3 className="text-secondary">No data to show</h3>
          </div>
        )}
      </div>
      <div className="space-y-6">
        {stats.map((stat, index: number) => {
          const value = stat.name.toString();
          const label = `${value[0].toUpperCase()}${value.substring(1)}`;

          return (
            <div className="flex gap-4 items-center prose dark:prose-invert">
              <div
                className="bg-emerald-200 w-8 h-8 rounded-lg"
                style={{ background: COLORS[index % COLORS.length] }}
              />
              <p className="text-main">{label}</p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default CardCountModal;
