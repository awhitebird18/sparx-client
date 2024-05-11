import { Skeleton } from '@/components/ui/Skeleton';
import { useProfileStore } from '../hooks/useProfileStore';
import { observer } from 'mobx-react-lite';

const TotalExperienceBadge = observer(() => {
  const { isLoading, groupedExperienceByDayAndTotalExperience } = useProfileStore();
  if (isLoading) return <Skeleton className="w-16 h-full" />;

  const totalExperience = groupedExperienceByDayAndTotalExperience.totalPoints ?? 0;

  return <h3 className="text-main">{`${totalExperience} XP`}</h3>;
});

export default TotalExperienceBadge;
