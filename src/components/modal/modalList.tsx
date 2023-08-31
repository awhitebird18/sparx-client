import { Channel } from '@/features/channels/types';
import AddUserModal from '@/features/channels/components/AddUserModal';
import ConfirmChannelChangeModal from '@/features/channels/components/ConfirmChannelChangeModal';
import RemoveUserModal from '@/features/channels/components/RemoveUserModal';
import { Message } from '@/features/messages/types';
import DeleteMessage from '@/features/messages/components/DeleteMessage';
import PreferencesModal from '@/features/preferences/components/PreferencesModal';
import ProfileModal from '@/features/profile/components/Profile';
import DeleteSection from '@/features/sections/components/DeleteSection';
import { User } from '@/features/users/types';
import { lazy } from 'react';

const CreateChannelModal = lazy(() => import('@/features/channels/components/CreateChannelForm'));
const CreateSectionModal = lazy(() => import('@/features/sections/components/CreateSectionForm'));
const InviteUserModal = lazy(() => import('@/features/users/components/InviteUserForm'));
const ChannelDetails = lazy(() => import('@/features/channels/components/ChannelDetails'));

const modalList = {
  CreateChannelModal: (props: { id: string }) => <CreateChannelModal {...props} />,
  CreateSectionModal: (props: { id: string; name: string }) => <CreateSectionModal {...props} />,
  ChannelDetailsModal: (props: { id: string; defaultTab: string }) => <ChannelDetails {...props} />,
  DeleteSectionModal: (props: { id: string; name: string }) => <DeleteSection {...props} />,
  DeleteMessageModal: (props: { message: Message }) => <DeleteMessage {...props} />,
  InviteUserModal: () => <InviteUserModal />,
  PreferencesModal: () => <PreferencesModal />,
  AddUserModal: (props: { channel: Channel }) => <AddUserModal {...props} />,
  RemoveUserModal: (props: { user: User; channel: Channel }) => <RemoveUserModal {...props} />,
  ProfileModal: (props: { userId: string }) => <ProfileModal {...props} />,
  ConfirmChannelTypeChange: (props: { channel: Channel }) => (
    <ConfirmChannelChangeModal {...props} />
  ),
};

export type ModalName = keyof typeof modalList;

export default modalList;
