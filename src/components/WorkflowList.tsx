import { FC } from 'react';
import { Workflow } from '../types';
import { Link } from 'react-router-dom';

interface WorkflowListProps {
  workflows: Workflow[];
}

const WorkflowList: FC<WorkflowListProps> = ({ workflows }) => {
  if (workflows.length < 1) {
    return null;
  }

  return (
    <div>
      <h3 className="text-white text-sm tracking-wider text-center mb-2">Created workflows</h3>
      <div>
        {workflows.map((workflow, index) => (
          <p className="text-gray-300 text-sm text-center" key={index}>
            {workflow?.name}
            <Link to={workflow?.name} className="underline font-light text-xs text-blue-400 ml-2">
              Click here
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
};

export default WorkflowList;
