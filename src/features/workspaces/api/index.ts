import { createWorkspace } from './createWorkspace';
import { updateWorkspace } from './updateWorkspace';
import { leaveWorkspace } from './removeWorkspace';
import { joinWorkspace } from './joinWorkspace';
import { getUserWorkspaces } from './getUserWorkspaces';
import { switchWorkspace } from './switchWorkspace';
import { uploadWorkspaceImage } from './uploadWorkspaceImage';
import { markUserWorkspaceViewed } from './markUserWorkspaceViewed';
import { removeTemporaryWorkspace } from './removeTemporaryWorkspace';

export default {
  createWorkspace,
  updateWorkspace,
  leaveWorkspace,
  joinWorkspace,
  getUserWorkspaces,
  switchWorkspace,
  uploadWorkspaceImage,
  markUserWorkspaceViewed,
  removeTemporaryWorkspace,
};
