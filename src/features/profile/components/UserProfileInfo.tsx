import { User } from '@/features/users/types';
import dayjs from 'dayjs';

type UserInformationProps = {
  user: User;
};
const UserInformation = ({ user }: UserInformationProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <span className="text-3xl font-semibold text-main">{`${user.firstName} ${user.lastName}`}</span>
      <div className="flex gap-10">
        <UserProfileInfo header="Email" body={user.email} />
        <UserProfileInfo header="Role" body={user.isAdmin ? 'Admin' : 'Member'} />
        <UserProfileInfo
          header="Last active"
          body={dayjs(user.userWorkspaces[0].lastViewed).format('MMM DD YYYY HH:MM a')}
        />
      </div>
    </div>
  );
};

type UserProfileInfoProps = { header: string; body: string };
const UserProfileInfo = ({ header, body }: UserProfileInfoProps) => {
  return (
    <div className="flex flex-col">
      <span className="font-medium text-main">{header}</span>
      <span className="text-secondary">{body}</span>
    </div>
  );
};

export default UserInformation;
