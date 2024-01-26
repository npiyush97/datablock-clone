// import { useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import useGetColumns from './useGetColumns';

const useGetDatasetInformation = () => {
  const { nodeOutputs } = useAppSelector((store) => store.workflow);

  const { getColumns } = useGetColumns();

  const getDatasetInfo = (nodeId: string) => {
    // rows count
    if (nodeId && nodeOutputs[nodeId]?.output && nodeOutputs[nodeId]?.output.length > 0) {
      return {
        rowsCount: nodeOutputs[nodeId].output.length,
        colsCount: getColumns(nodeId).length
      };
    }

    return {
      rowsCount: 0,
      colsCount: 0
    };
  };

  return { getDatasetInfo };
};

export default useGetDatasetInformation;
