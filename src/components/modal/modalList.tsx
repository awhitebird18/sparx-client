import { LexicalEditor } from 'lexical';
import { Channel } from '@/features/channels/types';
import AddUserModal from '@/features/channels/components/AddUserModal';
import ConfirmChannelChangeModal from '@/features/channels/components/ConfirmChannelChangeModal';
import RemoveUserModal from '@/features/channels/components/RemoveUserModal';
import { Message } from '@/features/messages/types';
import DeleteMessage from '@/features/messages/components/DeleteMessage';
import PreferencesModal from '@/features/preferences/components/PreferencesModal';
import UserDetails from '@/features/profile/components/UserDetails';
import DeleteSection from '@/features/sections/components/DeleteSection';
import { User } from '@/features/users/types';
import { lazy } from 'react';
import ChangePasswordModal from '@/features/auth/components/ChangePasswordModal';
import UserStatusModal from '@/features/userStatus/components/UserStatusModal';
import { InsertImageUploadedDialogBody } from '@/features/textEditor/plugins/ImagePlugin';
import DeleteNote from '@/features/notes/components/DeleteNote';
import MoveNote from '@/features/notes/components/MoveNote';

import AddChannelToSectionModal from '@/features/sections/components/AddChannelToSectionModal';

// Card modals
import AddFlashcardModal from '@/features/flashcards/components/AddFlashcardModal';
import StudyFlashcardsModal from '@/features/flashcards/components/StudyFlashcardsModal';

// Card field modals
import CreateFieldModal from '@/features/flashcards/components/CreateFieldModal';
import UpdateFieldModal from '@/features/flashcards/components/UpdateFieldModal';
import { Field } from '@/features/flashcards/types/Field';
import RemoveFieldModal from '@/features/flashcards/components/RemoveFieldModal';

// Template modals
import CreateTemplateModal from '@/features/flashcards/components/CreateTemplateModal';
import UpdateTemplateModal from '@/features/flashcards/components/UpdateTemplateModal';
import RemoveTemplateModal from '@/features/flashcards/components/RemoveTemplateModal';

// Variant modals
import CreateVariantModal from '@/features/flashcards/components/CreateVariantModal';
import UpdateVariantModal from '@/features/flashcards/components/UpdateVariantModal';
import RemoveVariantModal from '@/features/flashcards/components/RemoveVariantModal';

// Workspace modals
import CreateWorkspaceModal from '@/features/workspaces/components/CreateWorkspaceModal';
import UpdateWorkspaceModal from '@/features/workspaces/components/UpdateWorkspaceModal';
import LeaveWorkspaceModal from '@/features/workspaces/components/LeaveWorkspaceModal';

// Types
import { Variant } from '@/features/flashcards/types/variant';
import { Template } from '@/features/flashcards/types/template';
import UpdateTask from '@/features/overview/components/UpdateTask';
import DeleteTask from '@/features/overview/components/DeleteTask';

import GenerateRoadmap from '@/features/workspaceChannels/components/GenerateRoadmap';

import UsersModal from '@/features/users/components/UsersModal';
import FlashcardsModal from '@/features/flashcards/components/FlashcardsModal';
import DiscussionsModal from '@/features/chatroom/components/DiscussionsModal';
import NotesModal from '@/features/notes/components/NotesModal';

const CreateChannelModal = lazy(() => import('@/features/channels/components/CreateChannelForm'));
const CreateSectionModal = lazy(() => import('@/features/sections/components/CreateSectionForm'));
const InviteUserModal = lazy(() => import('@/features/users/components/InviteUserModal'));
const ChannelDetails = lazy(() => import('@/features/channels/components/ChannelDetails'));

// Flashcards modals
// const CreateFlashcardModal = lazy(() => import('@/features/flashcards/components/CreateFlashcard'));
const NewCardsModal = lazy(() => import('@/features/flashcards/components/NewCardsModal'));
const FutureDueModal = lazy(() => import('@/features/flashcards/components/FutureDueModal'));
const CardsReviewedModal = lazy(
  () => import('@/features/flashcards/components/CardsReviewedModal'),
);
const CardCountModal = lazy(() => import('@/features/flashcards/components/CardCountModal'));
const CardCalendarModal = lazy(() => import('@/features/flashcards/components/CardCalendarModal'));

const RemoveChannelModal = lazy(() => import('@/features/channels/components/RemoveChannelModal'));

// General
const ShortcutMenu = lazy(() => import('@/components/shortcutMenu/ShortcutMenu'));

const modalList = {
  CreateChannelModal: (props: { id: string; x: number; y: number }) => (
    <CreateChannelModal {...props} />
  ),
  CreateSectionModal: (props: { id: string; name: string }) => <CreateSectionModal {...props} />,
  AddChannelToSectionModal: (props: { channelId: string }) => (
    <AddChannelToSectionModal {...props} />
  ),
  ChannelDetailsModal: (props: { id: string; defaultTab: string }) => <ChannelDetails {...props} />,
  DeleteSectionModal: (props: { id: string; name: string }) => <DeleteSection {...props} />,
  DeleteMessageModal: (props: { message: Message }) => <DeleteMessage {...props} />,
  InviteUserModal: () => <InviteUserModal />,
  PreferencesModal: () => <PreferencesModal />,
  AddUserModal: (props: { channel: Channel }) => <AddUserModal {...props} />,
  RemoveUserModal: (props: { user: User; channel: Channel }) => <RemoveUserModal {...props} />,
  UserDetails: (props: { userId: string }) => <UserDetails {...props} />,
  ChangePasswordModal: () => <ChangePasswordModal />,
  ConfirmChannelTypeChange: (props: { channel: Channel }) => (
    <ConfirmChannelChangeModal {...props} />
  ),
  UserStatusModal: () => <UserStatusModal />,
  NewCardsModal: () => <NewCardsModal />,
  FutureDueModal: () => <FutureDueModal />,
  CardsReviewedModal: () => <CardsReviewedModal />,
  InsertImageModal: (props: { activeEditor: LexicalEditor; onClose: () => void }) => (
    <InsertImageUploadedDialogBody {...props} />
  ),
  DeleteNote: (props: { noteId: string }) => <DeleteNote {...props} />,
  MoveNote: (props: { noteId: string; channelId: string }) => <MoveNote {...props} />,
  CreateField: (props: { templateId: string }) => <CreateFieldModal {...props} />,
  UpdateFieldModal: (props: { uuid: string; updateFields: Partial<Field> }) => (
    <UpdateFieldModal {...props} />
  ),
  RemoveFieldModal: (props: { uuid: string }) => <RemoveFieldModal {...props} />,
  CreateTemplateModal: () => <CreateTemplateModal />,
  UpdateTemplateModal: (props: { uuid: string; updateFields: Partial<Template> }) => (
    <UpdateTemplateModal {...props} />
  ),
  RemoveTemplateModal: (props: { uuid: string }) => <RemoveTemplateModal {...props} />,
  CreateVariantModal: (props: { templateId: string }) => <CreateVariantModal {...props} />,
  UpdateVariantModal: (props: { uuid: string; updateFields: Partial<Variant> }) => (
    <UpdateVariantModal {...props} />
  ),
  RemoveVariantModal: (props: { uuid: string }) => <RemoveVariantModal {...props} />,
  AddFlashcardModal: () => <AddFlashcardModal />,
  StudyFlashcardsModal: () => <StudyFlashcardsModal />,
  CardCountModal: () => <CardCountModal />,
  CardCalendarModal: () => <CardCalendarModal />,
  RemoveChannelModal: (props: { uuid: string; pointsToConnect: any; setPointsToConnect: any }) => (
    <RemoveChannelModal {...props} />
  ),
  CreateWorkspaceModal: () => <CreateWorkspaceModal />,
  UpdateWorkspaceModal: () => <UpdateWorkspaceModal />,
  LeaveWorkspaceModal: () => <LeaveWorkspaceModal />,
  ShortcutMenu: () => <ShortcutMenu />,
  UpdateTask: (props: any) => <UpdateTask {...props} />,
  DeleteTask: (props: { task: any; onDelete: (id: string) => void }) => <DeleteTask {...props} />,
  GenerateRoadmap: () => <GenerateRoadmap />,
  members: () => <UsersModal />,
  discussions: () => <DiscussionsModal />,
  flashcards: () => <FlashcardsModal />,
  notes: () => <NotesModal />,
};

export type ModalName = keyof typeof modalList;

export default modalList;
