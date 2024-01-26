import { FC, ReactNode } from 'react';
import { X, GripVertical } from 'lucide-react';
import Button from './Button';
import { Handle } from 'reactflow';
import { HandleType } from '../types';
import { useNodeId } from 'reactflow';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { removeNode, setCurrentSelected } from '../redux/slices/workflow';
import { twMerge } from 'tailwind-merge';
import DatasetInformation from './DatasetInformation';

interface CustomNodeProps {
  title: string;
  children: ReactNode;
  showRun?: boolean;
  handleRun?: () => void;
  handles?: HandleType[];
}

const CustomNode: FC<CustomNodeProps> = ({
  title,
  children,
  showRun = false,
  handleRun,
  handles
}) => {
  const dispatch = useAppDispatch();
  const { currentSelected } = useAppSelector((store) => store.workflow);

  // inbuilt hook to get id of node
  const nodeId = useNodeId();

  const handleRemoveNode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (nodeId) {
      dispatch(removeNode(nodeId.toString()));
    }
  };

  const handleSelect = () => {
    if (nodeId) {
      dispatch(setCurrentSelected(nodeId.toString()));
    }
  };

  return (
    <div onClick={handleSelect}>
      <div className="flex">
        <div
          className={twMerge(
            `bg-navy-600 border border-navy-500 ${
              currentSelected === nodeId && 'border-l-navy-200 border-t-navy-200 border-b-navy-200'
            }`
          )}
        >
          <div className="flex items-center justify-between border-b border-navy-500 p-2 gap-20">
            <div className="text-white flex items-center tracking-wider gap-1">
              <GripVertical className="w-4 h-4" />
              {title}
            </div>
            <button onClick={handleRemoveNode}>
              <X className="w-4 h-4 text-navy-400" />
            </button>
          </div>

          <div className="p-2">{children}</div>
          {showRun && (
            <Button onClick={handleRun} className="nodrag disabled:bg-navy-500/55">
              RUN
            </Button>
          )}
        </div>
        <div className="w-7 bg-navy-300 rounded-r-lg"></div>
      </div>
      {handles?.map((handle, index) => (
        <Handle key={index} type={handle.type} position={handle.position} id={handle.id} />
      ))}

      <DatasetInformation nodeId={nodeId?.toString() || ''} />
    </div>
  );
};

export default CustomNode;
