import { useEffect, useState } from 'react';
import { useAppSelector } from '../redux/hooks';

const useNodeColsCount = (nodeId: string) => {
  const { nodeOutputs } = useAppSelector((store) => store.workflow);

  const [nodeColsCount, setNodeColsCount] = useState<number>(0);

  useEffect(() => {
    getNodeColsCount();
  }, [nodeId, nodeOutputs]);

  const getNodeColsCount = () => {
    if (nodeId && nodeOutputs[nodeId]?.output?.length > 0) {
      setNodeColsCount(nodeOutputs[nodeId].output.length);
    }
  };

  return { nodeColsCount, getNodeColsCount };
};

export default useNodeColsCount;
