import { Position, useEdges, useNodeId } from 'reactflow';
import { HandleType } from '../../types';
import CustomNode from '../CustomNode';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import useGetSource from '../../hooks/useGetSource';
import InputBox from '../Inputbox';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { setNodeOutput } from '../../redux/slices/workflow';

const handles: HandleType[] = [
  { type: 'target', position: Position.Left, id: 'left' },
  { type: 'source', position: Position.Right, id: 'right' }
];

const SliceNode = () => {
  const dispatch = useAppDispatch();
  const { nodeOutputs } = useAppSelector((store) => store.workflow);

  // nodeid inbuilt hook
  const nodeId = useNodeId();

  // inbuilt hook that gives all the edges
  const edges = useEdges();

  // custom hook to get nodeids
  const { getLeftSourceNodeId } = useGetSource();

  // input refs
  const fromIndexRef = useRef<HTMLInputElement>(null);
  const toIndexRef = useRef<HTMLInputElement>(null);

  // handle all oprations for filter
  const handleRun = () => {
    if (!fromIndexRef?.current?.value || !toIndexRef?.current?.value) {
      toast.error('Please enter from and to index.');
      return;
    }

    if (nodeId) {
      const id = getLeftSourceNodeId(nodeId, edges);

      if (id) {
        const data = nodeOutputs[id].output;

        // slice data
        const slicedData = data.slice(
          parseInt(fromIndexRef?.current?.value),
          parseInt(toIndexRef?.current?.value)
        );

        dispatch(setNodeOutput({ id: nodeId.toString(), data: slicedData }));
      }
    }
  };

  return (
    <CustomNode title="Slice" showRun={true} handleRun={handleRun} handles={handles}>
      <InputBox className="nodrag" ref={fromIndexRef} label="From index" type="number" min={0} />
      <InputBox className="nodrag" ref={toIndexRef} label="To index" type="number" min={0} />
    </CustomNode>
  );
};

export default SliceNode;
