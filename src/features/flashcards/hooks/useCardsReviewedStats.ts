import { useStore } from '@/stores/RootStore';
import { useEffect, useState } from 'react';
import { StatReviewHistoryCount } from '../types/statReviewHistoryCount';

function useCardReviewStats() {
  const { getReviewHistoryApi } = useStore('flashcardStore');
  const [stats, setStats] = useState<StatReviewHistoryCount[]>([]);

  useEffect(() => {
    const fn = async () => {
      const data = await getReviewHistoryApi();
      setStats(data);
    };
    fn();
  }, [getReviewHistoryApi]);

  return stats;
}

export default useCardReviewStats;
