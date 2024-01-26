import { Position, useNodeId } from 'reactflow';
import { HandleType, SelectOption } from '../../types';
import CustomNode from '../CustomNode';
import SelectDropdown from '../SelectDropdown';
import { CSVData } from '../../data';
import { useState } from 'react';
import useCSVData from '../../hooks/useCSVData';
import toast from 'react-hot-toast';
import { setNodeOutput } from '../../redux/slices/workflow';
import { useAppDispatch } from '../../redux/hooks';
// import { Loader2 } from 'lucide-react';

const options: SelectOption[] = CSVData;

const handles: HandleType[] = [{ type: 'source', position: Position.Right, id: 'right' }];

const FileNode = () => {
  const dispatch = useAppDispatch();

  const nodeId = useNodeId();

  const [fileName, setFileName] = useState<string>('');

  // read csv hook
  const { loading, readCSVData } = useCSVData();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value) {
      setFileName(value);

      try {
        const data = await readCSVData(value);

        if (data && nodeId) {
          dispatch(setNodeOutput({ id: nodeId, data }));
        }
      } catch (error) {
        toast.error('Something went wong. Try again');
        console.error(error);
      }
    }
  };

  return (
    <CustomNode title="File" handles={handles}>
      <p className="text-gray-400 text-sm mb-2">Allowed types: csv</p>

      {loading ? (
        <div>
          <p className="text-sm outline-none bg-navy-600 border border-navy-400 text-gray-300 p-1 rounded-md px-2 min-w-[230px]">
            Loading file...
          </p>
        </div>
      ) : fileName ? (
        <div>
          <label className="text-gray-400 text-sm">Selected file:</label>
          <p className="text-sm outline-none bg-navy-600 border border-navy-400 text-white p-1 rounded-md px-2 min-w-[230px]">
            {fileName}
          </p>
        </div>
      ) : (
        <SelectDropdown
          key={fileName}
          label="File name"
          options={options}
          value={fileName}
          onChange={handleChange}
          disabled={fileName.length > 0}
        />
      )}
    </CustomNode>
  );
};

export default FileNode;
