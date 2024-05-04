import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Form } from '@/components/ui/Form';
import { Button } from '@/components/ui/Button';
import Modal from '@/layout/modal/Modal';
import { useStore } from '@/stores/RootStore';
import { useUserProfileForm } from '../hooks/useUserProfileForm';
import UserDetailsFormField from './UserDetailsFormField';

export type UserDetailsProps = { userId: string };

const fields: ('firstName' | 'lastName' | 'location' | 'bio' | 'goal' | 'webUrl')[] = [
  'firstName',
  'lastName',
  'location',
  'bio',
  'goal',
  'webUrl',
];

const UserDetails = observer(({ userId }: UserDetailsProps) => {
  const { findUserByUuid } = useStore('userStore');
  const [userWorkspaceData] = useState({ location: '', bio: '', goal: '', webUrl: '' });
  const user = findUserByUuid(userId);

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    location: userWorkspaceData?.location,
    bio: userWorkspaceData?.bio,
    goal: userWorkspaceData?.goal,
    webUrl: userWorkspaceData?.webUrl,
  };
  const { formMethods, handleSubmit } = useUserProfileForm(initialValues);

  return (
    <Modal title="Profile">
      <Form {...formMethods}>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-8 w-80">
          <div className="flex flex-col space-y-4">
            {fields.map(
              (field: 'firstName' | 'lastName' | 'location' | 'bio' | 'goal' | 'webUrl') => (
                <UserDetailsFormField
                  form={formMethods}
                  name={field}
                  label={`${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  placeholder={`Enter your ${field}`}
                />
              ),
            )}
          </div>
          <Button type="submit" className="w-full bg-primary-dark border border-primary-lighter">
            Save Changes
          </Button>
        </form>
      </Form>
    </Modal>
  );
});

export default UserDetails;
