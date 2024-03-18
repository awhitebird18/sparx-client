export interface NodeData {
  uuid: string;
  label: string;
  x: number;
  y: number;
  offset?: { x: number; y: number };
  status: string;
}
