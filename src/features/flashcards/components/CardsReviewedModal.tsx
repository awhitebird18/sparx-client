import Modal from '@/components/modal/Modal';
import { useStore } from '@/stores/RootStore';
import { useEffect, useState } from 'react';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CardsReviewedModal = () => {
  const { getReviewHistoryApi } = useStore('flashcardStore');
  const [stats, setStats] = useState<any>([]);

  useEffect(() => {
    const fn = async () => {
      const data = await getReviewHistoryApi();

      setStats(data);
    };

    fn();
  }, [getReviewHistoryApi]);

  return (
    <Modal title="Cards Reviewed">
      <div className="h-96 w-[40rem]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={600}
            height={400}
            data={stats}
            margin={{
              top: 20,
              right: 0,
              bottom: 0,
              left: -20,
            }}
          >
            <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
            <XAxis dataKey="date" scale="auto" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                background: '#11151c',
                borderColor: '#ffffff22',
                boxShadow: '2px 2px 10px #000000AA',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />

            <Bar dataKey="easy" stackId="a" fill="#10b981" label="Cards added" />
            <Bar dataKey="good" stackId="a" fill="#a855f7" label="Cards added" />
            <Bar dataKey="hard" stackId="a" fill="#f97316" label="Cards added" />
            <Bar dataKey="again" stackId="a" fill="#f43f5e" label="Cards added" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Modal>
  );
};

export default CardsReviewedModal;
