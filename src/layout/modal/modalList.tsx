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
  DeleteNote,
} from './lazyLoadComponents';

import { Props as ChangePasswordFormProps } from '@/features/auth/components/ChangePasswordForm';
import { RemoveUserModalProps } from '@/features/channels/components/RemoveUserModal';
import { DeletemessageProps } from '@/features/messages/components/DeleteMessage';
import { UserDetailsProps } from '@/features/profile/components/UserDetails';
import { Props as DeleteSectionProps } from '@/features/sections/components/DeleteSection';
import { DeleteNoteProps } from '@/features/notes/components/DeleteNoteModal';
import { MoveNoteProps } from '@/features/notes/components/MoveNote';
import { Props as AddChannelToSectionModalProps } from '@/features/sections/components/AddChannelToSectionModal';
import { CreateFieldModalProps } from '@/features/flashcards/components/CreateFieldModal';
import { UpdateFieldProps } from '@/features/flashcards/components/UpdateFieldModal';
import { RemoveFieldModalProps } from '@/features/flashcards/components/RemoveFieldModal';
import CreateTemplateModal from '@/features/flashcards/components/CreateTemplateModal';
import { UpdateTemplateModalProps } from '@/features/flashcards/components/UpdateTemplateModal';
import { RemoveTemplateModalProps } from '@/features/flashcards/components/RemoveTemplateModal';
import { CreateVariantModalProps } from '@/features/flashcards/components/CreateVariantModal';
import { UpdateVariantModalProps } from '@/features/flashcards/components/UpdateVariantModal';
import { RemoveVariantModalProps } from '@/features/flashcards/components/RemoveVariantModal';
import { Props as UpdateTaskProps } from '@/features/tasks/components/UpdateTask';
import { Props as DeleteTaskProps } from '@/features/tasks/components/DeleteTask';
import { CreateChannelModalProps } from '@/features/channels/components/CreateChannelModal';
import { Props as CreateSectionModalProps } from '@/features/sections/components/CreateSectionModal';
import { RemoveChannelModalProps } from '@/features/channels/components/RemoveChannelModal';

const modalList = {
  CreateChannelModal: (props: CreateChannelModalProps) => <CreateChannelModal {...props} />,
  CreateSectionModal: (props: CreateSectionModalProps) => <CreateSectionModal {...props} />,
  AddChannelToSectionModal: (props: AddChannelToSectionModalProps) => (
    <AddChannelToSectionModal {...props} />
  ),
  DeleteSectionModal: (props: DeleteSectionProps) => <DeleteSection {...props} />,
  DeleteMessageModal: (props: DeletemessageProps) => <DeleteMessage {...props} />,
  InviteUserModal: () => <InviteUserModal />,
  PreferencesModal: () => <PreferencesModal />,
  RemoveUserModal: (props: RemoveUserModalProps) => <RemoveUserModal {...props} />,
  UserDetails: (props: UserDetailsProps) => <UserDetails {...props} />,
  ChangePasswordModal: (props: ChangePasswordFormProps) => <ChangePasswordModal {...props} />,
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
};

export type ModalName = keyof typeof modalList;

export default modalList;
