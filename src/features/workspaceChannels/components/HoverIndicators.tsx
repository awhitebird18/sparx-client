import { ConnectionSide } from '@/features/channels/enums/connectionSide';

// HoverIndicators.tsx
const HoverIndicators = ({
  uuid,
  handleCreateLine,
  workspaceId,
}: {
  uuid: string;
  handleCreateLine: (uuid: string, connectionSide: ConnectionSide, workspaceId?: string) => void;
  workspaceId: string | undefined;
}) => {
  return (
    <>
      <div
        className="connector cursor-pointer indicator absolute top-1.5 left-1/2 transform -translate-x-1/2 -translate-y-full indicator w-4 h-4 rounded-full overflow-hidden border-2 border-background bg-primary-dark"
        onClick={() => handleCreateLine(uuid, ConnectionSide.TOP, workspaceId)}
      ></div>

      <div
        className="connector cursor-pointer indicator absolute bottom-1.5 left-1/2 transform -translate-x-1/2 translate-y-full indicator w-4 h-4 rounded-full overflow-hidden border-2 border-background bg-primary-dark"
        onClick={() => handleCreateLine(uuid, ConnectionSide.BOTTOM, workspaceId)}
      ></div>

      <div
        className="connector cursor-pointer indicator absolute left-1.5 top-1/2 transform -translate-x-full -translate-y-1/2 indicator w-4 h-4 rounded-full overflow-hidden border-2 border-background bg-primary-dark"
        onClick={() => handleCreateLine(uuid, ConnectionSide.LEFT, workspaceId)}
      ></div>

      <div
        className="connector cursor-pointer indicator absolute right-1.5 top-1/2 transform translate-x-full -translate-y-1/2 indicator w-4 h-4 rounded-full overflow-hidden border-2 border-background bg-primary-dark"
        onClick={() => handleCreateLine(uuid, ConnectionSide.RIGHT, workspaceId)}
      ></div>
    </>
  );
};

export default HoverIndicators;
