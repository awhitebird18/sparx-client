import { useEffect } from 'react';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import ExperienceChart from './ExperienceChart';
import UpdatableAvatar from './UpdatableAvatar';
import UserAvatar from '@/features/users/components/UserAvatar';
import { useProfileStore } from '../hooks/useProfileStore';
import UserInformation from './UserProfileInfo';
import QuickStats from './QuickStats';
import ProfileDropdownMenu from './ProfileDropdownMenu';

const Profile = observer(() => {
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { findUserByUuid, currentUser, currentProfileUserId } = useStore('userStore');
  const { fetchUserExperience } = useProfileStore();
  const user = findUserByUuid(currentProfileUserId);

  useEffect(() => {
    const fn = async () => {
      if (!user?.uuid || !currentWorkspaceId) return;
      await fetchUserExperience(user.uuid, currentWorkspaceId);
    };
    fn();
  }, [currentWorkspaceId, fetchUserExperience, user?.uuid]);

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
        <UserInformation user={user} />
        <ProfileDropdownMenu />
      </div>

      <Divider />

      <div className="gap-12 flex w-full justify-between max-w-5xl px-12">
        <QuickStats />
        <ExperienceChart />
      </div>
    </div>
  );
});

export default Profile;

const Divider = () => <div className="h-px w-full flex bg-border my-12" />;
