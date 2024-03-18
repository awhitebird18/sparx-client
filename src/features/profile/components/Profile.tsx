import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import {
  Camera,
  ChevronLeft,
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
import UserAvatar from '@/features/users/components/UserAvatar';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ModalName } from '@/components/modal/modalList';
import dayjs from 'dayjs';
import ExperienceChart from './ExperienceChart';
import taskApi from '@/features/overview/api';
import WorkspaceActivity from '@/features/overview/components/WorkspaceActivity';
import { Skeleton } from '@/components/ui/Skeleton';

interface Experience {
  date: string;
  points: number;
}

interface GroupedData {
  [key: string]: {
    date: string;
    points: number;
    label: string;
  };
}

interface Accumulator {
  totalPoints: number;
  groupedByDate: GroupedData;
}

const Profile = () => {
  const [stats, setStats] = useState<any>([]);
  const [activity, setActivity] = useState([]);
  const [totalExp, setTotalExp] = useState(0);
  const { currentWorkspaceId, currentUserWorkspaceData } = useStore('workspaceStore');
  const navigate = useNavigate();
  const { setActiveModal } = useStore('modalStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { findUserByUuid, uploadProfileImageApi, currentUser } = useStore('userStore');
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

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
    if (!userId || !currentWorkspaceId) return;

    const fetchData = async () => {
      const activityPromise = taskApi.getUserActivity(userId, currentWorkspaceId);
      const experiencePromise = taskApi.getExperience(userId, currentWorkspaceId);

      const [activity, experience] = await Promise.all([activityPromise, experiencePromise]);
      return { activity, experience };
    };

    const fn = async () => {
      const { activity, experience } = await fetchData();

      const { totalPoints, experienceGroupedByDate } =
        groupExperienceByDayAndGetTotalExp(experience);

      setTotalExp(totalPoints);
      setStats(experienceGroupedByDate);
      setActivity(activity);

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

  const handleClickBack = () => {
    navigate(-1);
  };

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

      await uploadProfileImageApi(imageBase64);
    };

    reader.readAsDataURL(file);
  };

  if (!user) return;

  const transformedImage = transformCloudinaryUrl(user.profileImage, 160, 160);

  return (
    <div className="h-full overflow-auto flex relative">
      {/* Main */}
      <div className="flex justify-between items-center px-16 h-12 flex-1 absolute top-4 left-0 w-fit z-30">
        <Button
          variant="outline"
          className="flex gap-2 h-9 px-4 rounded-xl"
          onClick={handleClickBack}
        >
          <ChevronLeft size={12} style={{ marginTop: '0.1rem' }} /> Back
        </Button>
      </div>
      <div className="h-full w-full justify-center flex flex-col">
        {/* Main */}
        <div className="flex flex-col gap-4 flex-1 w-full h-full items-center">
          {/* Header */}
          <div className="flex flex-col gap-6 relative items-center w-full">
            {/* <div className="h-52 absolute w-full rounded-xl bg-gradient-to-b to-transparent"></div> */}
            {/* Real header */}
            <div className="mt-24 flex gap-12 items-end px-16 justify-center w-full max-w-5xl">
              {/* Avatar */}
              <div className="card relative flex-shrink-0 shadow border border-border overflow-hidden rounded-xl">
                <UserAvatar size={160} userId={user.uuid} profileImage={transformedImage} />
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
                {/* Basic details */}
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
                      onClick={(e) =>
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

            {/* Separator */}
            <div className="h-px w-full border-b border-border flex" />

            {/* Body */}
            <div className="h-full gap-16 flex flex-col w-full p-6 px-16 justify-center max-w-5xl">
              {/* Quick Stats */}
              <div className="card h-min flex flex-col gap-4 flex-shrink-0">
                <div className="flex justify-between items-center prose">
                  <h3 className="text-main">Statistics</h3>
                  {!isLoading ? (
                    <h3 className="text-main">{workspaceCompletionStats.completionPercentage}</h3>
                  ) : (
                    <Skeleton className="w-10 h-full" />
                  )}
                </div>

                <div className=" flex flex-col h-full w-full">
                  <div className="grid grid-cols-3 gap-4 w-full">
                    {!isLoading ? (
                      <div className="card flex items-center gap-4 prose w-full bg-card shadow-md border-border p-6 rounded-lg">
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
                      <div className="card flex items-center gap-4 prose w-full bg-card shadow-md border-border p-6 rounded-lg">
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
                      <div className="card flex items-center gap-4 prose w-full bg-card shadow-md border-border p-6 rounded-lg">
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
              {/* Experience Chart */}
              <div className="prose flex flex-col gap-4">
                <div className="flex justify-between items-center prose">
                  <h3 className="text-main">Experience Earned</h3>
                  {!isLoading ? (
                    <h3 className="text-main">{`${totalExp} XP`}</h3>
                  ) : (
                    <Skeleton className="w-16 h-full" />
                  )}
                </div>
                {!isLoading ? (
                  <div className="w-full h-96 flex-shrink-0 card bg-card rounded-xl">
                    <ExperienceChart data={stats} />
                  </div>
                ) : (
                  <Skeleton className="w-full h-80 rounded-xl" />
                )}
              </div>
              {/* Timeline card */}
              {/* Sidebar */}
              <div className="h-full w-full flex flex-col prose gap-4">
                <h2 className="text-main font-medium">Activity</h2>

                <WorkspaceActivity activity={activity} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Profile);

function groupExperienceByDayAndGetTotalExp(data: any) {
  // Prepopulate the dates for the last 7 days, including today, with points set to 0
  const last7Days: GroupedData = {};
  for (let i = 6; i >= 0; i--) {
    let date = dayjs();
    date = date.subtract(i, 'day');
    // date.setDate(date.getDate() - i);
    // const formattedDate: string = date.toISOString().split('T')[0];
    const formattedDate: string = date.format('MMM D');
    const label: string = date.format('ddd');
    last7Days[formattedDate] = { date: formattedDate, label, points: 0 };
  }

  const { totalPoints, groupedByDate }: Accumulator = data.reduce(
    (acc: Accumulator, { date, points }: Experience) => {
      // Sum total points
      acc.totalPoints += points;

      // Convert date to a specific format if needed, for consistent key comparison
      const formattedDate: string = dayjs(date).format('MMM D');

      // Check if the date is within the last 7 days and group by date and sum points for each date
      // eslint-disable-next-line no-prototype-builtins
      if (acc.groupedByDate.hasOwnProperty(formattedDate)) {
        acc.groupedByDate[formattedDate].points += points;
      }

      return acc;
    },
    { totalPoints: 0, groupedByDate: last7Days },
  );

  // Set the total experience points

  // Convert the grouped object back into an array for stats, ensuring all last 7 days are included
  const experienceGroupedByDate = Object.values(groupedByDate);

  return { totalPoints, experienceGroupedByDate };
}

const CardSkeleton = () => (
  <Skeleton className="card h-28 flex items-center gap-4 prose w-full bg-card shadow-md border-border p-6 rounded-lg" />
);

// Badges
{
  /* <div className="card h-min flex flex-col gap-4 flex-shrink-0">
  <div className="flex justify-between items-center prose">
    <h3 className="text-main">Badges</h3>
    <Button className="text-primary font-semibold" variant="link">
      VIEW ALL
    </Button>
  </div>

  <div className="flex gap-4 w-fit">
    <div className="card flex flex-col items-center gap-4 prose w-28 bg-card shadow-lg p-6 rounded-3xl">
      <Fire className="text-rose-400" size={48} />

      <h4 className="text-main">Level 6</h4>
    </div>
    <div className="card flex flex-col items-center gap-4 prose w-28 bg-card shadow-lg p-6 rounded-3xl">
      <FileTextFill className="text-blue-400" size={48} />

      <h4 className="text-main">Level 6</h4>
    </div>
    <div className="card flex flex-col items-center gap-4 prose w-28 bg-card shadow-lg p-6 rounded-3xl">
      <StarFill className="text-yellow-400" size={48} />

      <h4 className="text-main">Level 6</h4>
    </div>
    <div className="card flex flex-col items-center gap-4 prose w-28 bg-card shadow-lg p-6 rounded-3xl">
      <ClipboardFill className="text-pink-400" size={48} />

      <h4 className="text-main">Level 6</h4>
    </div>
    <div className="card flex flex-col items-center gap-4 prose w-28 bg-card shadow-lg p-6 rounded-3xl">
      <HandThumbsUpFill className="text-orange-400" size={48} />

      <h4 className="text-main">Level 6</h4>
    </div>
    <div className="card flex flex-col items-center gap-4 prose w-28 bg-card shadow-lg p-6 rounded-3xl">
      <ChatLeftDotsFill className="text-emerald-400" size={48} />

      <h4 className="text-main">Level 6</h4>
    </div>
  </div>
</div>; */
}

// History
/* <div className=" flex flex-col rounded-xl overflow-hidden w-full prose gap-6">
<h3 className="flex items-center text-main">Progress</h3>
<div className="flex flex-col gap-6">
  {history.map((entry: any, index: number) => (
    <div className="flex gap-6 relative">
      <div className="rounded-full w-6 h-6 p-1.5  border border-complete-dark flex items-center justify-center relative shadow bg-background">
        {index !== history.length - 1 && (
          <div className="absolute left-1/2 bottom-0 translate-y-full -translate-x-1/2 h-11 w-1.5 bg-yellow-400/30" />
        )}

        <StarFill className="text-complete" size={20} />
      </div>
      <div className="flex flex-col">
        <h4 className="font-semibold leading-none mb-1.5 text-main">{`${entry.label}`}</h4>
        <p className="text-muted text-xs">{`Completed ${entry.createdOn.format(
          'MMM DD YYYY, hh:mm a',
        )}`}</p>
      </div>
    </div>
  ))}
</div>
</div> */

// const history = [
//   {
//     uuid: '1',
//     label: 'Arrays',
//     createdOn: dayjs('01/02/2024'),
//     status: CompletionStatus.Complete,
//   },
//   {
//     uuid: '2',
//     label: 'Objects',
//     createdOn: dayjs('01/03/2024'),
//     status: CompletionStatus.InProgress,
//   },
//   {
//     uuid: '3',
//     label: 'Docker',
//     createdOn: dayjs('01/05/2024'),
//     status: CompletionStatus.InProgress,
//   },
//   {
//     uuid: '4',
//     label: 'Objects',
//     createdOn: dayjs('01/03/2024'),
//     status: CompletionStatus.Complete,
//   },
//   {
//     uuid: '5',
//     label: 'Dates',
//     createdOn: dayjs('01/03/2024'),
//     status: CompletionStatus.OnHold,
//   },
//   {
//     uuid: '6',
//     label: 'React',
//     createdOn: dayjs('01/03/2024'),
//     status: CompletionStatus.Complete,
//   },
//   {
//     uuid: '7',
//     label: 'Vue',
//     createdOn: dayjs('01/03/2024'),
//     status: CompletionStatus.Complete,
//   },
//   {
//     uuid: '8',
//     label: 'Dates',
//     createdOn: dayjs('01/03/2024'),
//     status: CompletionStatus.OnHold,
//   },
//   {
//     uuid: '9',
//     label: 'React',
//     createdOn: dayjs('01/03/2024'),
//     status: CompletionStatus.Complete,
//   },
//   {
//     uuid: '10',
//     label: 'Vue',
//     createdOn: dayjs('01/03/2024'),
//     status: CompletionStatus.Complete,
//   },
// ];
