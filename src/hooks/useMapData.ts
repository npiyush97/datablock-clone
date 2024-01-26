/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from 'react-hot-toast';
import { useAppDispatch } from '../redux/hooks';
import { setNodeOutput } from '../redux/slices/workflow';

const useMapData = () => {
  const dispatch = useAppDispatch();

  const mapBasedOnStringCondition = (
    nodeId: string,
    data: any,
    columnName: string,
    condition: string,
    inputValue: string
  ) => {
    if (!nodeId || !data || !columnName || !condition) {
      return;
    }

    const mappedData = data?.map((item: { [x: string]: any }) => {
      const columnValue = item[columnName];

      if (!columnValue) return item;

      switch (condition) {
        case 'change to uppercase':
          return { ...item, [columnName]: columnValue.toUpperCase() };
        case 'change to lowercase':
          return { ...item, [columnName]: columnValue.toLowerCase() };
        case 'concatinate the string':
          return { ...item, [columnName]: columnValue + inputValue };
        case 'trim':
          return { ...item, [columnName]: columnValue.trim() };
        default:
          return item;
      }
    });

    dispatch(setNodeOutput({ id: nodeId, data: mappedData }));
  };

  const mapBasedOnNumberCondition = (
    nodeId: string,
    data: any,
    columnName: string,
    condition: string,
    inputValue: string
  ) => {
    if (!nodeId || !data || !columnName || !condition) {
      return;
    } else if (
      ['addition', 'multiplication', 'division', 'subtraction'].includes(condition) &&
      !inputValue
    ) {
      toast.error('Please enter a value');
      return;
    }

    const inputNumber = parseFloat(inputValue);

    const mappedData = data?.map((item: any) => {
      const columnValue = parseFloat(item[columnName]);

      if (!columnValue) return item;

      switch (condition) {
        case 'addition':
          return { ...item, [columnName]: columnValue + inputNumber };
        case 'subtraction':
          return { ...item, [columnName]: columnValue - inputNumber };
        case 'division':
          return { ...item, [columnName]: columnValue / inputNumber };
        case 'multiplication':
          return { ...item, [columnName]: columnValue * inputNumber };
        case 'round numbers to the nearest integer':
          return { ...item, [columnName]: Math.round(columnValue) };
        case 'round down':
          return { ...item, [columnName]: Math.floor(columnValue) };
        case 'round up':
          return { ...item, [columnName]: Math.ceil(columnValue) };
        default:
          return item;
      }
    });

    dispatch(setNodeOutput({ id: nodeId, data: mappedData }));
  };

  return {
    mapBasedOnStringCondition,
    mapBasedOnNumberCondition
  };
};

export default useMapData;
