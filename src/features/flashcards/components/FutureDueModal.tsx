import Modal from '@/layout/modal/Modal';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
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

const FutureDueModal = observer(() => {
  const { getFutureDue } = useStore('flashcardStore');
  const [stats, setStats] = useState<any>([]);

  useEffect(() => {
    const fn = async () => {
      const data = await getFutureDue();

      setStats(data);
    };

    fn();
  }, [getFutureDue]);

  return (
    <Modal title="Future Due">
      <div className="h-96 w-[40rem]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
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

            <Bar dataKey="new" stackId="a" fill="#10b981" label="Cards added" />
            <Bar dataKey="young" stackId="a" fill="#a855f7" label="Cards added" />
            <Bar dataKey="mature" stackId="a" fill="#f97316" label="Cards added" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Modal>
  );
});

export default FutureDueModal;
