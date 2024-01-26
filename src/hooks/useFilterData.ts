/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from 'react-hot-toast';
import { useAppDispatch } from '../redux/hooks';
import { setNodeOutput } from '../redux/slices/workflow';

const useFilterData = () => {
  const dispatch = useAppDispatch();

  const filterBasedOnStringCondition = (
    nodeId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[],
    columnName: string,
    condition: string,
    inputValue: string
  ) => {
    if (!nodeId || !data || !columnName || !condition || !inputValue) {
      return;
    }

    const filteredData = data?.filter((item: { [x: string]: any }) => {
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
        case 'data matches regex':
          // eslint-disable-next-line no-case-declarations
          const regex = new RegExp(inputValue);
          return regex.test(columnValue);
        default:
          return true;
      }
    });

    dispatch(setNodeOutput({ id: nodeId, data: filteredData }));
  };

  const filterBasedOnNumberCondition = (
    nodeId: string,
    data: any,
    columnName: string,
    condition: string,
    inputValue: string
  ) => {
    if (!nodeId || !data || !columnName || !condition || !inputValue) {
      return;
    }
    if (condition !== 'data matches regex' && isNaN(Number(inputValue))) {
      toast.error('Please enter valid number');
      return;
    }

    const inputNumber = parseFloat(inputValue);

    const filteredData = data?.filter((item: any) => {
      const columnValue = item[columnName];

      if (!columnValue) return;
      switch (condition) {
        case 'number equals':
          return columnValue == inputNumber;
        case 'number is greater than':
          return columnValue > inputNumber;
        case 'number is greater than or equals':
          return columnValue >= inputNumber;
        case 'number is less than':
          return columnValue < inputNumber;
        case 'number is less than or equals':
          return columnValue <= inputNumber;
        case 'data is not empty or null':
          return columnValue !== null && columnValue !== undefined && columnValue !== '';
        case 'data matches regex':
          // eslint-disable-next-line no-case-declarations
          const regex = new RegExp(inputValue);
          return regex.test(columnValue);
        default:
          return true;
      }
    });

    dispatch(setNodeOutput({ id: nodeId, data: filteredData }));
  };

  return {
    filterBasedOnStringCondition,
    filterBasedOnNumberCondition
  };
};

export default useFilterData;
