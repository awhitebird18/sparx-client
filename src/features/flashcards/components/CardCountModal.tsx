import Modal from '@/components/modal/Modal';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie } from 'recharts';

const CardCountModal = () => {
  const { getCardMaturityStats } = useStore('flashcardStore');
  const [stats, setStats] = useState<any>([]);

  useEffect(() => {
    const fn = async () => {
      const data = await getCardMaturityStats();

      setStats(data);
    };

    fn();
  }, [getCardMaturityStats]);

  return (
    <Modal title="Cards Reviewed">
      <div className="h-96 w-[40rem] flex items-center">
        <div className="w-2/3 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={stats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={130}
                fill="#8884d8"
                dataKey="count"
              >
                {/* Review */}
                {/* {stats.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))} */}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-6">
          {stats.map((stat: any, index: number) => (
            <div className="flex gap-4 items-center">
              <div
                className="bg-emerald-200 w-8 h-8 rounded-lg"
                style={{ background: COLORS[index % COLORS.length] }}
              />
              <p>{stat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default observer(CardCountModal);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
