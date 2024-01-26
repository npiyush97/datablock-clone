import { useEffect, useState } from 'react';
import { Workflow } from '../types';
import WorkflowList from '../components/WorkflowList';
import CreateWorkflowForm from '../components/CreateWorkflowForm';

const Home = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('workflowbuilder');

    if (data) {
      const json = JSON.parse(data);
      setWorkflows(json);
    }
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-5 sm:w-[400px] sm:m-auto p-5">
      <h1 className="text-white text-xl font-medium tracking-wider mb-3">Worlflow Builder</h1>
      <CreateWorkflowForm />

      <WorkflowList workflows={workflows} />
    </div>
  );
};

export default Home;
