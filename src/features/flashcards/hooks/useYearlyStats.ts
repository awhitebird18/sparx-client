import { useStore } from '@/stores/RootStore';
import { useEffect, useState } from 'react';
import { StatDailyStudiedCount } from '../types/statDailyStudiedCount';

function useYearlyStats() {
  const { getYearlyStats } = useStore('flashcardStore');
  const [stats, setStats] = useState<StatDailyStudiedCount[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getYearlyStats();
      setStats(data);
    };

    fetchData();
  }, [getYearlyStats]);

  return stats;
}

export default useYearlyStats;
