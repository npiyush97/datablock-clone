export interface WorkflowItem {
  name: string;
  nodes: Node[];
  edges: Edge[];
}

export interface Node {
  id: string;
  type: string;
  data: {
    label: string;
  };
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  selected: boolean;
  positionAbsolute: {
    x: number;
    y: number;
  };
  dragging: boolean;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
}
