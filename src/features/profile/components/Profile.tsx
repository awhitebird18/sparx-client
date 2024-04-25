import { MouseEvent, useEffect, useState } from 'react';
import {
  Camera,
  Fire,
  LightningFill,
  Person,
  StarFill,
  ThreeDotsVertical,
} from 'react-bootstrap-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { ModalName } from '@/layout/modal/modalList';
import dayjs from 'dayjs';
import ExperienceChart from './ExperienceChart';
import taskApi from '@/features/tasks/api';
import { groupExperienceByDayAndGetTotalExp } from '../utils/groupExperienceByDayAndGetTotalExp';
import { DailyPoints } from '../types/dailyPoints';
import TotalExperienceBadge from './TotalExperienceBadge';
import QuickStatBadge from './QuickStatBadge';
import UpdatableAvatar from './UpdatableAvatar';
import UserAvatar from '@/features/users/components/UserAvatar';

export type Props = {
  userId: string;
};

const Profile = observer(({ userId }: Props) => {
  const [stats, setStats] = useState<DailyPoints[]>([]);
  const [totalExp, setTotalExp] = useState(0);
  const { currentWorkspaceId, currentUserWorkspaceData } = useStore('workspaceStore');
  const { findUserByUuid, currentUser, setCurrentUserProfileId } = useStore('userStore');
  const [isLoading, setIsLoading] = useState(true);
  const { userChannelData, channels } = useStore('channelStore');

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

  useEffect(() => {
    setCurrentUserProfileId(userId);
    return () => setCurrentUserProfileId(undefined);
  }, [setCurrentUserProfileId, userId]);

  useEffect(() => {
    if (!userId || !currentWorkspaceId) return;
    const fetchData = async () => {
      const experiencePromise = taskApi.getExperience(userId, currentWorkspaceId);
      const [experience] = await Promise.all([experiencePromise]);
      return { experience };
    };

    const fn = async () => {
      const { experience } = await fetchData();
      const { totalPoints, experienceGroupedByDate } =
        groupExperienceByDayAndGetTotalExp(experience);
      setTotalExp(totalPoints);
      setStats(experienceGroupedByDate);
      setIsLoading(false);
    };
    fn();
  }, [currentWorkspaceId, userId]);

  const user = findUserByUuid(userId);
  if (!user) return;

  return (
    <div className="flex flex-col gap-3 relative items-center justify-start w-full ">
      {/* Profile Header */}
      <div className="flex gap-12 items-end px-12 justify-center w-full max-w-5xl ">
        {user.uuid === currentUser?.uuid ? (
          <UpdatableAvatar />
        ) : (
          <UserAvatar
            userId={user.uuid}
            color={user.preferences.primaryColor}
            showStatus
            size={160}
            profileImage={user.profileImage}
          />
        )}

        <div className="flex flex-col gap-4 w-full">
          <span className="text-3xl font-semibold text-main">{`${user.firstName} ${user.lastName}`}</span>
          <div className="flex gap-10">
            <UserProfileInfo header="Email" body={user.email} />
            <UserProfileInfo header="Role" body={user.isAdmin ? 'Admin' : 'Member'} />
            <UserProfileInfo
              header="Last active"
              body={dayjs(user.updatedAt).format('MMM DD YYYY HH:MM a')}
            />
          </div>
        </div>
        <ProfileDropdownMenu />
      </div>

      {/* Divider */}
      <div className="h-px w-full flex bg-border my-12" />

      {/* Stats */}
      <div className="gap-12 flex w-full justify-between max-w-5xl px-12">
        {/* Quick Stats */}
        <div className="card w-1/3 flex flex-col gap-4 flex-shrink-0 ">
          <div className="flex justify-between items-center prose">
            <h3 className="text-main">Quick Stats</h3>
          </div>

          <div className=" flex flex-col h-full w-full">
            <div className="flex flex-col gap-4 w-full">
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
                count={totalExp}
                isLoading={isLoading}
              />
              <QuickStatBadge
                icon={<Fire className="text-rose-400" size={48} />}
                label="Day streak"
                count={currentUserWorkspaceData.streakCount}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Experience Chat */}
        <div className="prose dark:prose-invert flex flex-col gap-4 w-2/3">
          <div className="flex justify-between items-center prose">
            <h3 className="text-main">Experience Earned</h3>
            <TotalExperienceBadge isLoading={isLoading} totalExp={totalExp} />
          </div>

          <div className="w-full h-96 flex-shrink-0 card bg-card rounded-xl border border-border p-2">
            <ExperienceChart data={stats} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Profile;

type UserProfileInfoProps = { header: string; body: string };

const UserProfileInfo = ({ header, body }: UserProfileInfoProps) => {
  return (
    <div className="flex flex-col">
      <span className="font-medium text-main">{header}</span>
      <span className="text-secondary">{body}</span>
    </div>
  );
};

const ProfileDropdownMenu = observer(() => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser } = useStore('userStore');
  const { setActiveModal } = useStore('modalStore');

  const handleOpenModal = ({ type, payload }: { type: ModalName; payload?: unknown }) => {
    setDropdownOpen(false);
    setActiveModal({ type, payload });
  };

  const handleClickUploadImageButton = (e: MouseEvent) => {
    e.preventDefault();

    setDropdownOpen(false);
  };

  return (
    <div className="z-50 self-start">
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button className="w-9 h-9 p-2" variant="outline">
            <ThreeDotsVertical size={20} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="p-1">
          <DropdownMenuItem
            onClick={(e) => handleClickUploadImageButton(e)}
            className="flex items-center gap-3 h-8 px-4 hover:bg-card-hover"
          >
            <Camera />
            Upload profile picture
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              handleOpenModal({
                type: 'UserDetails',
                payload: { userId: currentUser?.uuid },
              })
            }
            className="flex items-center gap-3 h-8 px-4 hover:bg-card-hover"
          >
            <Person />
            Update profile
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});
