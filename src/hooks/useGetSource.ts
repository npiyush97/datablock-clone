import { Edge } from 'reactflow';

const useGetSource = () => {
  // get left source id of current node
  const getLeftSourceNodeId = (nodeId: string | '' | null, edges: Edge[]) => {
    if (nodeId) {
      const tempEdge = edges.filter(
        (edge) => edge.targetHandle === 'left' && edge.target === nodeId
      );

      return tempEdge[0]?.source;
    }
  };

  return { getLeftSourceNodeId };
};

export default useGetSource;
