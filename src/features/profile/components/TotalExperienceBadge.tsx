import { Skeleton } from '@/components/ui/Skeleton';

type Props = { isLoading: boolean; totalExp: number };

const TotalExperienceBadge = ({ isLoading, totalExp }: Props) => {
  return (
    <>
      {!isLoading ? (
        <h3 className="text-main">{`${totalExp} XP`}</h3>
      ) : (
        <Skeleton className="w-16 h-full" />
      )}
    </>
  );
};

export default TotalExperienceBadge;
