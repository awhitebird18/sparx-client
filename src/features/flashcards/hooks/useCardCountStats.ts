import { useStore } from '@/stores/RootStore';
import { useEffect, useState } from 'react';
import { StatCardMaturityCount } from '../types/statCardMaturityCount';

function useCardCountStats() {
  const { getCardMaturityStats } = useStore('flashcardStore');
  const [stats, setStats] = useState<StatCardMaturityCount[]>([]);

  useEffect(() => {
    const fn = async () => {
      const data = await getCardMaturityStats();
      setStats(data);
    };
    fn();
  }, [getCardMaturityStats]);

  return stats;
}

export default useCardCountStats;
