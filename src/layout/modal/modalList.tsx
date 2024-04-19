import {
  CardCalendarModal,
  CardCountModal,
  CardsReviewedModal,
  CreateChannelModal,
  CreateSectionModal,
  FutureDueModal,
  InviteUserModal,
  NewCardsModal,
  RemoveChannelModal,
  AddUserModal,
  RemoveUserModal,
  DeleteMessage,
  PreferencesModal,
  UserDetails,
  DeleteSection,
  ChangePasswordModal,
  UserStatusModal,
  MoveNote,
  AddChannelToSectionModal,
  CreateFieldModal,
  UpdateFieldModal,
  RemoveFieldModal,
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
  DeleteNote,
} from './lazyLoadComponents';

import { AddUserModalProps } from '@/features/channels/components/AddUserModal';
import { RemoveUserModalProps } from '@/features/channels/components/RemoveUserModal';
import { DeletemessageProps } from '@/features/messages/components/DeleteMessage';
import { UserDetailsProps } from '@/features/profile/components/UserDetails';
import { DeleteSectionProps } from '@/features/sections/components/DeleteSection';
import { DeleteNoteProps } from '@/features/notes/components/DeleteNote';
import { MoveNoteProps } from '@/features/notes/components/MoveNote';
import { AddChannelToSectionModalProps } from '@/features/sections/components/AddChannelToSectionModal';
import { CreateFieldModalProps } from '@/features/flashcards/components/CreateFieldModal';
import { UpdateFieldProps } from '@/features/flashcards/components/UpdateFieldModal';
import { RemoveFieldModalProps } from '@/features/flashcards/components/RemoveFieldModal';
import CreateTemplateModal from '@/features/flashcards/components/CreateTemplateModal';
import { UpdateTemplateModalProps } from '@/features/flashcards/components/UpdateTemplateModal';
import { RemoveTemplateModalProps } from '@/features/flashcards/components/RemoveTemplateModal';
import { CreateVariantModalProps } from '@/features/flashcards/components/CreateVariantModal';
import { UpdateVariantModalProps } from '@/features/flashcards/components/UpdateVariantModal';
import { RemoveVariantModalProps } from '@/features/flashcards/components/RemoveVariantModal';
import { UpdateTaskProps } from '@/features/overview/components/UpdateTask';
import { DeleteTaskProps } from '@/features/overview/components/DeleteTask';
import { CreateChannelModalProps } from '@/features/channels/components/CreateChannelModal';
import { createSectionModalProps } from '@/features/sections/components/CreateSectionForm';
import { RemoveChannelModalProps } from '@/features/channels/components/RemoveChannelModal';

const modalList = {
  CreateChannelModal: (props: CreateChannelModalProps) => <CreateChannelModal {...props} />,
  CreateSectionModal: (props: createSectionModalProps) => <CreateSectionModal {...props} />,
  AddChannelToSectionModal: (props: AddChannelToSectionModalProps) => (
    <AddChannelToSectionModal {...props} />
  ),
  DeleteSectionModal: (props: DeleteSectionProps) => <DeleteSection {...props} />,
  DeleteMessageModal: (props: DeletemessageProps) => <DeleteMessage {...props} />,
  InviteUserModal: () => <InviteUserModal />,
  PreferencesModal: () => <PreferencesModal />,
  AddUserModal: (props: AddUserModalProps) => <AddUserModal {...props} />,
  RemoveUserModal: (props: RemoveUserModalProps) => <RemoveUserModal {...props} />,
  UserDetails: (props: UserDetailsProps) => <UserDetails {...props} />,
  ChangePasswordModal: () => <ChangePasswordModal />,
  UserStatusModal: () => <UserStatusModal />,
  NewCardsModal: () => <NewCardsModal />,
  FutureDueModal: () => <FutureDueModal />,
  CardsReviewedModal: () => <CardsReviewedModal />,
  DeleteNote: (props: DeleteNoteProps) => <DeleteNote {...props} />,
  MoveNote: (props: MoveNoteProps) => <MoveNote {...props} />,
  CreateField: (props: CreateFieldModalProps) => <CreateFieldModal {...props} />,
  UpdateFieldModal: (props: UpdateFieldProps) => <UpdateFieldModal {...props} />,
  RemoveFieldModal: (props: RemoveFieldModalProps) => <RemoveFieldModal {...props} />,
  CreateTemplateModal: () => <CreateTemplateModal />,
  UpdateTemplateModal: (props: UpdateTemplateModalProps) => <UpdateTemplateModal {...props} />,
  RemoveTemplateModal: (props: RemoveTemplateModalProps) => <RemoveTemplateModal {...props} />,
  CreateVariantModal: (props: CreateVariantModalProps) => <CreateVariantModal {...props} />,
  UpdateVariantModal: (props: UpdateVariantModalProps) => <UpdateVariantModal {...props} />,
  RemoveVariantModal: (props: RemoveVariantModalProps) => <RemoveVariantModal {...props} />,
  CardCountModal: () => <CardCountModal />,
  CardCalendarModal: () => <CardCalendarModal />,
  RemoveChannelModal: (props: RemoveChannelModalProps) => <RemoveChannelModal {...props} />,
  CreateWorkspaceModal: () => <CreateWorkspaceModal />,
  UpdateWorkspaceModal: () => <UpdateWorkspaceModal />,
  LeaveWorkspaceModal: () => <LeaveWorkspaceModal />,
  UpdateTask: (props: UpdateTaskProps) => <UpdateTask {...props} />,
  DeleteTask: (props: DeleteTaskProps) => <DeleteTask {...props} />,
  GenerateRoadmap: () => <GenerateRoadmap />,
};

export type ModalName = keyof typeof modalList;

export default modalList;
