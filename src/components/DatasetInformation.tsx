import { FC, useEffect, useState } from 'react';
import useGetDatasetInformation from '../hooks/useGetDatasetInformation';
import { useAppSelector } from '../redux/hooks';

interface DatasetInformationProps {
  nodeId: string;
}

const DatasetInformation: FC<DatasetInformationProps> = ({ nodeId = '' }) => {
  const { nodeOutputs } = useAppSelector((store) => store.workflow);

  const { getDatasetInfo } = useGetDatasetInformation();

  const [rowsCount, setRowsCount] = useState<number>(0);
  const [colsCount, setColsCount] = useState<number>(0);

  useEffect(() => {
    const data = getDatasetInfo(nodeId);

    setRowsCount(data.rowsCount);
    setColsCount(data.colsCount);
  }, [nodeId, nodeOutputs[nodeId]]);

  if (!nodeId) {
    return null;
  }

  return (
    <p className="text-xs mt-1 text-gray-200">
      [Dataset] {rowsCount} rows | {colsCount} columns
    </p>
  );
};

export default DatasetInformation;
