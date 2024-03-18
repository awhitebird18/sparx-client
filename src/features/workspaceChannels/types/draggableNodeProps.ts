import { ConnectionSide } from '@/features/channels/enums/connectionSide';

export interface DraggableNodeProps {
  uuid: string;
  label: string;
  x: number;
  y: number;
  isDefault?: boolean;
  onDrop: (uuid: string, x: number, y: number) => void;
  handleCreateLine?: (nodeId: string, side: ConnectionSide, workspaceId: string) => void;
  updateDragState?: any;
  isEditing?: boolean;
  showStats?: boolean;
  hideUnstarted?: boolean;
  onRemoveNode?: (nodeId: string) => void;
}
