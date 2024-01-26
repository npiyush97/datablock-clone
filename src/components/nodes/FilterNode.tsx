import { Position, useEdges, useNodeId } from 'reactflow';
import { HandleType, SelectOption } from '../../types';
import CustomNode from '../CustomNode';
import InputBox from '../Inputbox';
import SelectDropdown from '../SelectDropdown';
import { useEffect, useRef, useState } from 'react';
import useGetColumns from '../../hooks/useGetColumns';
import { useAppSelector } from '../../redux/hooks';
import { FilterConditions } from '../../data/index';
import useGetSource from '../../hooks/useGetSource';
import useFilterData from '../../hooks/useFilterData';
import toast from 'react-hot-toast';

const handles: HandleType[] = [
  { type: 'target', position: Position.Left, id: 'left' },
  { type: 'source', position: Position.Right, id: 'right' }
];

const FilterNode = () => {
  const { nodeOutputs } = useAppSelector((store) => store.workflow);

  const nodeId = useNodeId();

  // inbuilt hook that gives all the edges
  const edges = useEdges();

  // custom hook to get nodeids
  const { getLeftSourceNodeId } = useGetSource();

  // get column names for selct options from custom hook
  const { getLeftColumnsForSelectOptions } = useGetColumns();

  // custom filter data hook
  const { filterBasedOnNumberCondition, filterBasedOnStringCondition } = useFilterData();

  const [columnNames, setColumnNames] = useState<SelectOption[]>([]);
  const [conditions, setConditions] = useState<SelectOption[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // get the left connected blocks columns for columns select options
    if (nodeId) {
      const selectOptions = getLeftColumnsForSelectOptions(nodeId.toString(), edges);

      if (selectOptions) {
        setColumnNames(selectOptions);
      }
    }
  }, [nodeId, edges, nodeOutputs]);

  const handleColumnChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedColumn(value);

    // get the datatype of column
    const dataType = columnNames.find((column) => column.text === value);
    if (dataType?.type === 'number') {
      setConditions(FilterConditions.number);
    } else {
      setConditions(FilterConditions.string);
    }
  };
  // first render only
  useEffect(() => {
    const first = columnNames[0];
    if (first) {
      setSelectedColumn(first.text || '');
      const type = first.type as keyof typeof FilterConditions;
      if (type) {
        const condition = FilterConditions[type];
        setConditions(condition);
        setSelectedCondition(condition[0].text);
      }
    }
  }, [columnNames]);

  const handleConditionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCondition(e.target.value);
  };

  // handle all oprations for filter
  const handleRun = () => {
    if (inputRef.current && selectedColumn && selectedCondition) {
      if (!inputRef?.current?.value) {
        toast.error('Please enter value.');
        return;
      }

      if (nodeId) {
        // get the oputput of connected node on left handle
        const id = getLeftSourceNodeId(nodeId, edges);

        if (id) {
          const data = nodeOutputs[id].output;

          // get the datatype selected of column
          const dataType = columnNames.find((column) => column.text === selectedColumn);
          if (dataType?.type === 'number') {
            // call the number filter here
            filterBasedOnNumberCondition(
              nodeId,
              data,
              selectedColumn,
              selectedCondition,
              inputRef.current.value
            );
          } else {
            // call the string string here
            filterBasedOnStringCondition(
              nodeId,
              data,
              selectedColumn,
              selectedCondition,
              inputRef.current.value
            );
          }
        }
      }
    }
  };

  return (
    <CustomNode
      title="Filter"
      showRun={columnNames.length > 0}
      handleRun={handleRun}
      handles={handles}
    >
      <SelectDropdown
        label="Column name"
        key={selectedColumn}
        options={columnNames}
        value={selectedColumn}
        onChange={handleColumnChange}
        className="nodrag"
      />

      {columnNames?.length > 0 && (
        <>
          <SelectDropdown
            key={selectedCondition}
            label="Condition"
            options={conditions}
            value={selectedCondition}
            onChange={handleConditionChange}
            className="nodrag"
          />
          {selectedCondition && <InputBox className="nodrag w-[242px]" ref={inputRef} />}
        </>
      )}
    </CustomNode>
  );
};

export default FilterNode;
