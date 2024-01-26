/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Edge, Node } from 'reactflow';
import { NodeOutput } from '../../../types';

interface WorkflowInitialState {
  nodes: Node[];
  edges: Edge[];
  currentSelected: string | null;
  nodeOutputs: NodeOutput;
}

const initialState: WorkflowInitialState = {
  nodes: [],
  edges: [],
  currentSelected: null,
  nodeOutputs: {}
};

export const workflowSlice = createSlice({
  name: 'workflow',
  initialState: initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);

      const { id } = action.payload;

      state.nodeOutputs = {
        ...state.nodeOutputs,
        [id]: { id, output: [] }
      };
    },
    removeNode: (state, action: PayloadAction<string>) => {
      const nodeIdToDelete = action.payload;

      // delete node
      const updatedNodes = state.nodes.filter((node) => node.id != nodeIdToDelete);

      // delete associated edges
      const updatedEdges = state.edges.filter((edge) => !edge.id.includes(nodeIdToDelete));

      return {
        ...state,
        nodes: updatedNodes,
        edges: updatedEdges
      };
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    addEdge: (state, action: PayloadAction<Edge>) => {
      const edgeId = action.payload.id;

      const edgeExist = state.edges.find((item) => item.id === edgeId);

      if (!edgeExist) {
        state.edges.push(action.payload);
      }
    },
    setCurrentSelected: (state, action: PayloadAction<string | null>) => {
      state.currentSelected = action.payload;
    },
    setNodeOutput: (state, action: PayloadAction<{ id: string; data: any }>) => {
      const { id, data } = action.payload;

      state.nodeOutputs = {
        ...state.nodeOutputs,
        [id]: { id, output: data }
      };
    }
  }
});

export const {
  setNodes,
  addNode,
  removeNode,
  setEdges,
  addEdge,
  setCurrentSelected,
  setNodeOutput
} = workflowSlice.actions;

export default workflowSlice.reducer;
