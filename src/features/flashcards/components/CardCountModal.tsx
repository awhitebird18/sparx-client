import Modal from '@/layout/modal/Modal';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie } from 'recharts';
import { COLORS } from '../utils/cardCountUtils';
import CustomChartLabel from './CustomChartLabel';

const CardCountModal = observer(() => {
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
                label={CustomChartLabel}
                outerRadius={130}
                fill="#8884d8"
                dataKey="count"
              ></Pie>
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
});

export default CardCountModal;
