import { Position, useEdges, useNodeId } from 'reactflow';
import { HandleType, SelectOption } from '../../types';
import CustomNode from '../CustomNode';
import SelectDropdown from '../SelectDropdown';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import useGetSource from '../../hooks/useGetSource';
import { useEffect, useState } from 'react';
import useGetColumns from '../../hooks/useGetColumns';
import { setNodeOutput } from '../../redux/slices/workflow';

const orders: SelectOption[] = [
  {
    text: 'Ascending'
  },
  {
    text: 'Descending'
  }
];

const handles: HandleType[] = [
  { type: 'target', position: Position.Left, id: 'left' },
  { type: 'source', position: Position.Right, id: 'right' }
];

const SortNode = () => {
  const dispatch = useAppDispatch();
  const { nodeOutputs } = useAppSelector((store) => store.workflow);

  // nodeid inbuilt hook
  const nodeId = useNodeId();

  // inbuilt hook that gives all the edges
  const edges = useEdges();

  // custom hook to get nodeids
  const { getLeftSourceNodeId } = useGetSource();

  // get column names for selct options from custom hook
  const { getLeftColumnsForSelectOptions } = useGetColumns();

  // states
  const [columnNames, setColumnNames] = useState<SelectOption[]>([]);
  const [sortOption, setSortOption] = useState<{
    column: string | '';
    order: string | '';
  }>({
    column: '',
    order: ''
  });

  useEffect(() => {
    // get the left connected blocks columns for columns select options
    if (nodeId) {
      const selectOptions = getLeftColumnsForSelectOptions(nodeId.toString(), edges);

      if (selectOptions) {
        setColumnNames(selectOptions);
      }
    }
  }, [nodeId, edges, nodeOutputs]);

  // handle change
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setSortOption((prevSortOption) => ({
      ...prevSortOption,
      [name]: value
    }));
  };

  // handle all oprations for filter
  const handleRun = () => {
    if (nodeId) {
      const id = getLeftSourceNodeId(nodeId, edges);

      if (id) {
        const data = nodeOutputs[id].output;

        // sorting data
        if (sortOption.column && sortOption.order) {
          const sortedData = [...data].sort((a, b) => {
            const colA = a[sortOption.column];
            const colB = b[sortOption.column];

            if (sortOption.order === 'Ascending') {
              return colA < colB ? -1 : colA > colB ? 1 : 0;
            } else if (sortOption.order === 'Descending') {
              return colA > colB ? -1 : colA < colB ? 1 : 0;
            }

            return 0;
          });

          dispatch(setNodeOutput({ id: nodeId.toString(), data: sortedData }));
        }
      }
    }
  };
  return (
    <CustomNode
      title="Sort"
      showRun={columnNames.length > 0}
      handleRun={handleRun}
      handles={handles}
    >
      <SelectDropdown
        label="Column name"
        options={columnNames}
        key={sortOption.column}
        name="column"
        value={sortOption.column}
        onChange={handleChange}
        className="nodrag"
      />
      <SelectDropdown
        label="Order"
        key={sortOption.order}
        options={orders}
        name="order"
        value={sortOption.order}
        onChange={handleChange}
        className="nodrag"
      />
    </CustomNode>
  );
};

export default SortNode;
