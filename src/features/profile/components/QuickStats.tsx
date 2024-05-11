import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import QuickStatBadge from './QuickStatBadge';
import { Fire, LightningFill, StarFill } from 'react-bootstrap-icons';
import { useProfileStore } from '../hooks/useProfileStore';

const QuickStats = observer(() => {
  const { userChannelData, channels } = useStore('channelStore');
  const { currentUserWorkspaceData } = useStore('workspaceStore');
  const { isLoading, groupedExperienceByDayAndTotalExperience } = useProfileStore();
  const channelCount = channels.length;
  const modulesCompleteCount = userChannelData.reduce((acc, channel) => {
    if (channel.status === 'Complete') {
      return (acc += 1);
    } else return acc;
  }, 0);

  const completionPercentage = `${Math.round(
    (channelCount > 1 ? modulesCompleteCount / (channelCount - 1) : 0) * 100,
  )}%`;
  const workspaceCompletionStats = {
    totalModulesCount: channelCount,
    modulesCompleteCount,
    completionPercentage,
  };

  return (
    <div className="card w-1/3 flex flex-col gap-4 flex-shrink-0">
      <div className="flex justify-between items-center prose">
        <h3 className="text-main">Quick Stats</h3>
      </div>
      <div className=" flex flex-col h-full w-full gap-4 justify-between">
        <QuickStatBadge
          icon={<StarFill className="text-yellow-400" size={48} />}
          label={
            workspaceCompletionStats.modulesCompleteCount > 1
              ? 'Modules Completed'
              : 'Module Complete'
          }
          count={workspaceCompletionStats.modulesCompleteCount}
          isLoading={isLoading}
        />
        <QuickStatBadge
          icon={<LightningFill className="text-emerald-400" size={48} />}
          label="Experience Earned"
          count={groupedExperienceByDayAndTotalExperience.totalPoints}
          isLoading={isLoading}
        />
        <QuickStatBadge
          icon={<Fire className="text-rose-400" size={48} />}
          label="Day streak"
          count={currentUserWorkspaceData?.streakCount ?? 0}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
});

export default QuickStats;
