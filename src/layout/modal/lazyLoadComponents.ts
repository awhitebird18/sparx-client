import { lazy } from 'react';
const CreateChannelModal = lazy(() => import('@/features/channels/components/CreateChannelModal'));
const CreateSectionModal = lazy(() => import('@/features/sections/components/CreateSectionForm'));
const InviteUserModal = lazy(() => import('@/features/users/components/InviteUserModal'));
const NewCardsModal = lazy(() => import('@/features/flashcards/components/NewCardsModal'));
const FutureDueModal = lazy(() => import('@/features/flashcards/components/FutureDueModal'));
const CardsReviewedModal = lazy(
  () => import('@/features/flashcards/components/CardsReviewedModal'),
);
const CardCountModal = lazy(() => import('@/features/flashcards/components/CardCountModal'));
const CardCalendarModal = lazy(() => import('@/features/flashcards/components/CardCalendarModal'));
const RemoveChannelModal = lazy(() => import('@/features/channels/components/RemoveChannelModal'));
const RemoveUserModal = lazy(() => import('@/features/channels/components/RemoveUserModal'));
const DeleteMessage = lazy(() => import('@/features/messages/components/DeleteMessage'));
const PreferencesModal = lazy(() => import('@/features/preferences/components/PreferencesModal'));
const UserDetails = lazy(() => import('@/features/profile/components/UserDetails'));
const DeleteSection = lazy(() => import('@/features/sections/components/DeleteSection'));
const ChangePasswordModal = lazy(() => import('@/features/auth/components/ChangePasswordForm'));
const UserStatusModal = lazy(() => import('@/features/userStatus/components/UserStatusModal'));
const DeleteNote = lazy(() => import('@/features/notes/components/DeleteNoteModal'));
const MoveNote = lazy(() => import('@/features/notes/components/MoveNote'));
const AddChannelToSectionModal = lazy(
  () => import('@/features/sections/components/AddChannelToSectionModal'),
);
const CreateFieldModal = lazy(() => import('@/features/flashcards/components/CreateFieldModal'));
const UpdateFieldModal = lazy(() => import('@/features/flashcards/components/UpdateFieldModal'));
const RemoveFieldModal = lazy(() => import('@/features/flashcards/components/RemoveFieldModal'));
const CreateTemplateModal = lazy(
  () => import('@/features/flashcards/components/CreateTemplateModal'),
);
const UpdateTemplateModal = lazy(
  () => import('@/features/flashcards/components/UpdateTemplateModal'),
);
const RemoveTemplateModal = lazy(
  () => import('@/features/flashcards/components/RemoveTemplateModal'),
);
const CreateVariantModal = lazy(
  () => import('@/features/flashcards/components/CreateVariantModal'),
);
const UpdateVariantModal = lazy(
  () => import('@/features/flashcards/components/UpdateVariantModal'),
);
const RemoveVariantModal = lazy(
  () => import('@/features/flashcards/components/RemoveVariantModal'),
);
const CreateWorkspaceModal = lazy(
  () => import('@/features/workspaces/components/CreateWorkspaceModal'),
);
const UpdateWorkspaceModal = lazy(
  () => import('@/features/workspaces/components/UpdateWorkspaceModal'),
);
const LeaveWorkspaceModal = lazy(
  () => import('@/features/workspaces/components/LeaveWorkspaceModal'),
);
const UpdateTask = lazy(() => import('@/features/tasks/components/UpdateTask'));
const DeleteTask = lazy(() => import('@/features/tasks/components/DeleteTask'));
const GenerateRoadmap = lazy(() => import('@/features/nodemap/components/GenerateRoadmap'));

export {
  CreateChannelModal,
  CreateSectionModal,
  InviteUserModal,
  NewCardsModal,
  FutureDueModal,
  CardsReviewedModal,
  CardCountModal,
  CardCalendarModal,
  RemoveChannelModal,
  RemoveUserModal,
  DeleteMessage,
  PreferencesModal,
  UserDetails,
  DeleteSection,
  ChangePasswordModal,
  UserStatusModal,
  DeleteNote,
  MoveNote,
  AddChannelToSectionModal,
  CreateFieldModal,
  UpdateFieldModal,
  RemoveFieldModal,
  CreateTemplateModal,
  UpdateTemplateModal,
  RemoveTemplateModal,
  CreateVariantModal,
  UpdateVariantModal,
  RemoveVariantModal,
  CreateWorkspaceModal,
  UpdateWorkspaceModal,
  LeaveWorkspaceModal,
  UpdateTask,
  DeleteTask,
  GenerateRoadmap,
};
