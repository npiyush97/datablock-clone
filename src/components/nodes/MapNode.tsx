import { Position, useEdges, useNodeId } from 'reactflow';
import { HandleType, SelectOption } from '../../types';
import CustomNode from '../CustomNode';
import InputBox from '../Inputbox';
import SelectDropdown from '../SelectDropdown';
import { useEffect, useRef, useState } from 'react';
import useGetColumns from '../../hooks/useGetColumns';
import { useAppSelector } from '../../redux/hooks';
import { MapConditions } from '../../data/index';
import useGetSource from '../../hooks/useGetSource';
// import toast from 'react-hot-toast';
import useMapData from '../../hooks/useMapData';

const handles: HandleType[] = [
  { type: 'target', position: Position.Left, id: 'left' },
  { type: 'source', position: Position.Right, id: 'right' }
];

const MapNode = () => {
  const { nodeOutputs } = useAppSelector((store) => store.workflow);

  const nodeId = useNodeId();

  // inbuilt hook that gives all the edges
  const edges = useEdges();

  // custom hook to get nodeids
  const { getLeftSourceNodeId } = useGetSource();

  // get column names for selct options from custom hook
  const { getLeftColumnsForSelectOptions } = useGetColumns();

  // custom map data hook
  const { mapBasedOnNumberCondition, mapBasedOnStringCondition } = useMapData();

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
      setConditions(MapConditions.number);
    } else {
      setConditions(MapConditions.string);
    }
  };

  const handleConditionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCondition(e.target.value);
  };

  // handle all oprations for filter
  const handleRun = () => {
    if (selectedColumn && selectedCondition) {
      if (nodeId) {
        // get the oputput of connected node on left handle
        const id = getLeftSourceNodeId(nodeId, edges);

        if (id) {
          const data = nodeOutputs[id].output;

          // get the datatype selected of column
          const dataType = columnNames.find((column) => column.text === selectedColumn);
          if (dataType?.type === 'number') {
            // call the number mapper here
            mapBasedOnNumberCondition(
              nodeId,
              data,
              selectedColumn,
              selectedCondition,
              inputRef?.current?.value || ''
            );
          } else {
            // call the string mapper here
            mapBasedOnStringCondition(
              nodeId,
              data,
              selectedColumn,
              selectedCondition,
              inputRef?.current?.value || ''
            );
          }
        }
      }
    }
  };

  // first render only
  useEffect(() => {
    const first = columnNames[0];
    if (first) {
      setSelectedColumn(first.text || '');
      const type = first.type as keyof typeof MapConditions;
      if (type) {
        const condition = MapConditions[type];
        setConditions(condition);
        setSelectedCondition(condition[0].text);
      }
    }
  }, [columnNames]);

  // Input render function
  const renderInputBoxForInteger = () => {
    if (selectedCondition) {
      if (
        selectedCondition === 'addition' ||
        selectedCondition === 'multiplication' ||
        selectedCondition === 'division' ||
        selectedCondition === 'subtraction' ||
        selectedCondition === 'concatinate the string'
      ) {
        return <InputBox className="nodrag w-[272px]" ref={inputRef} placeholder="Enter value" />;
      }
    }
    return null;
  };

  return (
    <CustomNode
      title="Map"
      showRun={columnNames.length > 0}
      handleRun={handleRun}
      handles={handles}
    >
      <SelectDropdown
        key={selectedColumn}
        label="Column name"
        options={columnNames}
        value={selectedColumn}
        onChange={handleColumnChange}
        className="nodrag"
      />

      {columnNames?.length > 0 && (
        <>
          <SelectDropdown
            label="Condition"
            key={selectedCondition}
            options={conditions}
            value={selectedCondition}
            onChange={handleConditionChange}
            className="nodrag"
          />
          {selectedCondition && renderInputBoxForInteger()}
        </>
      )}
    </CustomNode>
  );
};

export default MapNode;
