import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
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
import { transformCloudinaryUrl } from '@/utils/transformCloudinaryUrl';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { ModalName } from '@/layout/modal/modalList';
import dayjs from 'dayjs';
import ExperienceChart from './ExperienceChart';
import taskApi from '@/features/tasks/api';
import { Skeleton } from '@/components/ui/Skeleton';
import UserAvatar from '@/features/users/components/UserAvatar';
import { groupExperienceByDayAndGetTotalExp } from '../utils/groupExperienceByDayAndGetTotalExp';
import { CardSkeleton } from './CardSkeleton';

export type Props = {
  userId: string;
};

const Profile = observer(({ userId }: Props) => {
  const [stats, setStats] = useState<any>([]);
  const [totalExp, setTotalExp] = useState(0);
  const { currentWorkspaceId, currentUserWorkspaceData } = useStore('workspaceStore');
  const { setActiveModal } = useStore('modalStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { findUserByUuid, uploadProfileImageApi, currentUser, setCurrentUserProfileId } =
    useStore('userStore');

  const [isLoading, setIsLoading] = useState(true);
  const [tempImage, setTempImage] = useState<any>(null);

  // Modules complete
  const { userChannelData, subscribedChannels } = useStore('channelStore');
  const channelCount = subscribedChannels.length;

  const modulesCompleteCount = userChannelData
    .filter((channel: any) => channel.type !== 'direct')
    .reduce((acc: any, channel: any) => {
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

  const handleOpenModal = ({ type, payload }: { type: ModalName; payload?: unknown }) => {
    setDropdownOpen(false);
    setActiveModal({ type, payload });
  };

  const fileInput = useRef<HTMLInputElement | null>(null);

  // Need to throw error if no userId
  if (!userId) return null;

  const handleClickUploadImageButton = (e: MouseEvent) => {
    e.preventDefault();

    if (fileInput.current) {
      fileInput.current.click();
    }
    setDropdownOpen(false);
  };
  const user = findUserByUuid(userId);

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const imageBase64 = reader.result as string;
      setTempImage(imageBase64);

      await uploadProfileImageApi(imageBase64);
      setTempImage(null);
    };

    reader.readAsDataURL(file);
  };

  if (!user) return;

  const transformedImage = user.profileImage ? (
    transformCloudinaryUrl(user.profileImage, 160, 160)
  ) : (
    <Person />
  );

  return (
    <div className="h-full flex relative w-full overflow-auto">
      <div className="h-full w-full justify-center flex flex-col">
        <div className="flex flex-col gap-4 flex-1 w-full h-full items-center">
          <div className="flex flex-col gap-2 relative items-center w-full">
            <div className="flex gap-12 items-end px-12 justify-center w-full max-w-5xl">
              <div
                className={`card relative flex-shrink-0 shadow rounded-xl bg-gradient-to-tr from-primary to-${user.preferences.primaryColor}-400`}
              >
                {tempImage ? (
                  <img
                    src={tempImage ?? transformedImage}
                    style={{ width: '160px', height: '160px' }}
                    className="rounded-xl"
                  />
                ) : (
                  <UserAvatar
                    userId={user.uuid}
                    color={user.preferences.primaryColor}
                    showStatus
                    size={160}
                    profileImage={user.profileImage}
                  />
                )}

                {user.uuid === currentUser?.uuid && (
                  <Button
                    className={`absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 hover:bg-black/40`}
                    variant="ghost"
                    onClick={(e) => handleClickUploadImageButton(e)}
                  >
                    <Camera size={60} className="text-white/60" />
                  </Button>
                )}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInput}
                  onChange={handleSelectImage}
                />
              </div>

              <div className="flex justify-between w-full">
                <div className="flex flex-col gap-4">
                  <span className="text-3xl font-semibold text-main">{`${user.firstName} ${user.lastName}`}</span>
                  <div className="flex gap-10">
                    <div className="flex flex-col">
                      <span className="font-medium text-main">Email</span>
                      <span className="text-secondary">{user.email}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-main">Role</span>
                      <span className="text-secondary">{user.isAdmin ? 'Admin' : 'Member'}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-main">Last active</span>
                      <span className="text-secondary">
                        {dayjs(user.updatedAt).format('MMM DD YYYY HH:MM a')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
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
            </div>

            <div className="h-px w-full flex bg-border my-12" />

            <div className="gap-12 flex w-full justify-between max-w-5xl px-12">
              <div className="card w-1/3 flex flex-col gap-4 flex-shrink-0">
                <div className="flex justify-between items-center prose">
                  <h3 className="text-main">Quick Stats</h3>
                </div>

                <div className=" flex flex-col h-full w-full">
                  <div className="flex flex-col gap-4 w-full">
                    {!isLoading ? (
                      <div className="card flex items-center gap-4 prose w-full bg-card shadow-md border border-border p-6 rounded-lg">
                        <StarFill className="text-yellow-400" size={48} />
                        <div>
                          <h3 className="text-main">
                            {workspaceCompletionStats.modulesCompleteCount}
                          </h3>
                          <p className="text-secondary">
                            {workspaceCompletionStats.modulesCompleteCount > 1
                              ? 'Modules Completed'
                              : 'Module Complete'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <CardSkeleton />
                    )}

                    {!isLoading ? (
                      <div className="card flex items-center gap-4 prose w-full bg-card shadow-md border border-border p-6 rounded-lg">
                        <LightningFill className="text-emerald-400" size={48} />
                        <div>
                          <h3 className="text-main">{totalExp}</h3>
                          <p className="text-secondary">Experience Earned</p>
                        </div>
                      </div>
                    ) : (
                      <CardSkeleton />
                    )}
                    {!isLoading ? (
                      <div className="card flex items-center gap-4 prose w-full bg-card shadow-md border border-border p-6 rounded-lg">
                        <Fire className="text-rose-400" size={48} />
                        <div>
                          <h3 className="text-main">{currentUserWorkspaceData.streakCount}</h3>
                          <p className="text-secondary">Day streak</p>
                        </div>
                      </div>
                    ) : (
                      <CardSkeleton />
                    )}
                  </div>
                </div>
              </div>

              <div className="prose dark:prose-invert flex flex-col gap-4 w-2/3">
                <div className="flex justify-between items-center prose">
                  <h3 className="text-main">Experience Earned</h3>
                  {!isLoading ? (
                    <h3 className="text-main">{`${totalExp} XP`}</h3>
                  ) : (
                    <Skeleton className="w-16 h-full" />
                  )}
                </div>
                {!isLoading ? (
                  <div className="w-full h-96 flex-shrink-0 card bg-card rounded-xl border border-border p-2">
                    <ExperienceChart data={stats} />
                  </div>
                ) : (
                  <Skeleton className="w-full h-80 rounded-xl" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Profile;
