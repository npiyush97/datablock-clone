import { useCallback } from 'react';
import ReactFlow, {
  applyNodeChanges,
  applyEdgeChanges,
  Edge,
  DefaultEdgeOptions,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Background,
  Controls,
  MiniMap
} from 'reactflow';

import { FileNode, FilterNode, SliceNode, SortNode, FindNode, MapNode } from './nodes';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addEdge, setNodes, setEdges } from '../redux/slices/workflow';

// custom nodes
const nodeTypes = {
  fileNode: FileNode,
  sortNode: SortNode,
  filterNode: FilterNode,
  sliceNode: SliceNode,
  findNode: FindNode,
  mapNode: MapNode
};

// edge options
const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true
};

// App
export default function App() {
  const dispatch = useAppDispatch();

  const { nodes, edges } = useAppSelector((store) => store.workflow);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      const updatedNodes = applyNodeChanges(changes, nodes);
      dispatch(setNodes(updatedNodes));
    },
    [dispatch, nodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      const updatedEdges = applyEdgeChanges(changes, edges);
      dispatch(setEdges(updatedEdges));
    },
    [dispatch, edges]
  );

  const onConnect: OnConnect = useCallback(
    (connection) => {
      // create new edge and add
      const newEdge: Edge = {
        id: `edge-${connection.source}-${connection.target}`,
        source: connection.source || '0',
        target: connection.target || '0',
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle
      };

      dispatch(addEdge(newEdge));
    },
    [dispatch]
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls color="rgb(34, 33, 56)" />
        <MiniMap
          pannable
          zoomable
          maskColor="rgb(34, 33, 56)"
          nodeColor="rgb(34, 33, 56)"
          className="bg-navy-100"
        />
      </ReactFlow>
    </div>
  );
}
