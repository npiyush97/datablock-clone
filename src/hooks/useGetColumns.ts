// return column names of the data

import { Edge } from 'reactflow';
import { useAppSelector } from '../redux/hooks';
import useGetSource from './useGetSource';

const useGetColumns = () => {
  const { nodeOutputs } = useAppSelector((store) => store.workflow);

  const { getLeftSourceNodeId } = useGetSource();

  // get columns for table along with the datatype of column
  const getColumns = (id: string) => {
    const cols: { key: string; type: string }[] = [];

    if (id && nodeOutputs[id]?.output?.length > 0) {
      const firstRow = nodeOutputs[id].output.at(0);

      if (firstRow) {
        Object.entries(firstRow).forEach(([key, value]) => {
          const type = isNaN(Number(value)) ? 'string' : 'number';
          cols.push({ key, type });
        });
      }
    }

    return cols;
  };

  // get left connected blocks data columns for select options
  const getLeftColumnsForSelectOptions = (nodeId: string, edges: Edge[]) => {
    // get the left source of node
    const sourceId = getLeftSourceNodeId(nodeId, edges);

    if (sourceId) {
      const transformedCols = getColumns(sourceId).map((item) => ({
        text: item.key,
        type: item.type
      }));

      return transformedCols;
    }
  };

  return {
    getColumns,
    getLeftColumnsForSelectOptions
  };
};

export default useGetColumns;
