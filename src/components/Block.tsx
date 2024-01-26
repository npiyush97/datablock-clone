import { FC } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { addNode } from '../redux/slices/workflow';
import generateUuid from '../utils/generateUuid';
import { onClose } from '../redux/slices/blockmodal';

interface BlockProps {
  title: string;
  type: string;
  desc: string;
  input?: string;
  output?: string;
}

const Block: FC<{ data: BlockProps }> = ({ data }) => {
  const dispatch = useAppDispatch();

  const handleAddBlock = () => {
    const uuid = generateUuid();

    dispatch(
      addNode({
        id: uuid.toString(),
        type: data.type,
        data: { label: `${data.type}-${uuid}` },
        position: { x: 0, y: 0 }
      })
    );

    dispatch(onClose());
  };

  return (
    <div
      className="p-3 rounded-md bg-navy-500 border border-transparent hover:scale-105 hover:border-navy-300 transition cursor-pointer"
      onClick={handleAddBlock}
    >
      <div className="text-white font-semibold">{data.title}</div>
      <div className="text-gray-300 font-light tracking-wider text-xs my-2 mb-4">{data.desc}</div>
      <div className="text-gray-300 font-light tracking-wider text-xs">
        <p>Input:- {data.input}</p>
        <p>Output:- {data.output}</p>
      </div>
    </div>
  );
};

export default Block;
