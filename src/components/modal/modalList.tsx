import PreferencesModal from '@/features/preferences/components/PreferencesModal';
import ProfileModal from '@/features/profile/components/Profile';
import DeleteSection from '@/features/sections/components/DeleteSection';
import { lazy } from 'react';

const CreateChanneModal = lazy(() => import('@/features/channels/components/CreateChannelForm'));
const CreateSectionModal = lazy(() => import('@/features/sections/components/CreateSectionForm'));
const InviteUserModal = lazy(() => import('@/features/users/components/InviteUserForm'));
const ChannelDetails = lazy(() => import('@/features/channels/components/ChannelDetails'));

const modalList = {
  CreateChannelModal: () => <CreateChanneModal />,
  CreateSectionModal: (props: { id: string; name: string }) => <CreateSectionModal {...props} />,
  ChannelDetailsModal: (props: { id: string }) => <ChannelDetails {...props} />,
  DeleteSectionModal: (props: { id: string; name: string }) => <DeleteSection {...props} />,
  InviteUserModal: () => <InviteUserModal />,
  PreferencesModal: () => <PreferencesModal />,
  ProfileModal: () => <ProfileModal />,
};

export type ModalName = keyof typeof modalList; // this line is new

export default modalList;
