/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { setNodeOutput } from '../redux/slices/workflow';

const useFindData = () => {
  // data -> left block output
  // colunmName
  // condition
  // inputValue

  const dispatch = useAppDispatch();

  const [finddata, setFindData] = useState({});
  const findBasedOnStringCondition = (
    nodeId: string,
    data: any,
    columnName: string,
    condition: string,
    inputValue: string,
    type: string
  ) => {
    if (!nodeId || !data || !columnName || !condition || !inputValue) {
      return;
    }

    if (type === 'number') {
      const foundData = data?.find((item: any) => {
        const columnValue = Number(item[columnName]);
        if (!columnValue) return;
        const val = Number(inputValue);
        switch (condition) {
          case 'number equals':
            return columnValue === val;
          case 'number is greater than':
            return columnValue > val;
          case 'number is greater than or equal':
            return columnValue >= val;
          case 'number is less than':
            return columnValue < val;
          case 'data is less than or equal':
            return columnValue <= val;
          // case 'data matches regex':
          //   const regex = new RegExp(value);
          //   return regex.test(columnValue);
          default:
            return true;
        }
      });
      setFindData(foundData);
    } else {
      const foundData = data?.find((item: any) => {
        const columnValue = item[columnName];

        if (!columnValue) return;
        switch (condition) {
          case 'text is exactly':
            return columnValue === inputValue;
          case 'text is not exactly':
            return columnValue !== inputValue;
          case 'text includes':
            return columnValue.includes(inputValue);
          case 'text does not includes':
            return !columnValue.includes(inputValue);
          case 'data is not empty or null':
            return columnValue !== null && columnValue !== undefined && columnValue !== '';
          // case 'data matches regex':
          //   const regex = new RegExp(value);
          //   return regex.test(columnValue);
          default:
            return true;
        }
      });
      setFindData(foundData);
    }
    if (finddata) {
      dispatch(setNodeOutput({ id: nodeId, data: [finddata] }));
    } else {
      dispatch(setNodeOutput({ id: nodeId, data: [] }));
    }
  };

  return { findBasedOnStringCondition };
};

export default useFindData;
