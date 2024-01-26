/* eslint-disable @typescript-eslint/no-explicit-any */
import Canvas from '../components/Canvas';
import OutputPanel from '../components/OutputPanel';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { setEdges, setNodes } from '../redux/slices/workflow';
import Button from '../components/Button';
import { Plus } from 'lucide-react';
import { onOpen } from '../redux/slices/blockmodal';
import { WorkflowItem } from './types';

const WorkflowBuilder = () => {
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const workflowName = pathname.slice(1, pathname.length);

    const data = localStorage.getItem('workflowbuilder');

    if (data) {
      const localStorageData = JSON.parse(data);
      const currentWorkflowData = localStorageData.find(
        (item: WorkflowItem) => item.name === workflowName
      );

      dispatch(setNodes(currentWorkflowData.nodes));
      dispatch(setEdges(currentWorkflowData.edges));
    }
  }, [pathname]);

  return (
    <>
      <div
        className="flex h-full resizable-pane relative"
        style={{
          minHeight: '30%',
          maxHeight: '90%',
          resize: 'vertical',
          overflow: 'hidden'
        }}
      >
        <Button
          className="flex gap-1 bg-navy-700 font-semibold border border-navy-100 rounded-full hover:bg-navy-600 w-fit px-3 absolute m-2 z-40 lowercase"
          onClick={() => dispatch(onOpen())}
        >
          <Plus className="w-4 h-4" /> block
        </Button>

        <Canvas />
      </div>
      <OutputPanel />
    </>
  );
};

export default WorkflowBuilder;
