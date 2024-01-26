import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import Button from './Button';
import toast from 'react-hot-toast';

const Header = () => {
  const { nodes, edges } = useAppSelector((store) => store.workflow);

  const { pathname } = useLocation();
  const workflowName = pathname.slice(1, pathname.length);

  // check already exist, if exist then update otherwise create new
  const handleSaveWorkflow = () => {
    const workflowName = pathname.slice(1, pathname.length);
    console.log(workflowName);
    const data = localStorage.getItem('workflowbuilder');
    console.log(workflowName, data);
    if (!data) {
      localStorage.setItem(
        'workflowbuilder',
        JSON.stringify([{ name: workflowName, nodes, edges }])
      );
    } else {
      const localStorageData = JSON.parse(data);

      const newData = localStorageData.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => item.name !== workflowName
      );
      newData.push({ name: workflowName, nodes, edges });

      localStorage.setItem('workflowbuilder', JSON.stringify(newData));
    }

    toast.success('Worlflow saved.');
  };

  return (
    <header className="flex items-center justify-between p-2 border-b border-navy-500">
      <Link to="/" className="text-white uppercase font-medium text-sm tracking-wider p-1.5">
        Workflow Builder
      </Link>
      <span className="text-white">{workflowName}</span>
      {pathname.slice(1, pathname.length).length > 0 && (
        <Button
          className="hover:text-gray-100 hover:bg-navy-400 w-fit rounded-sm"
          onClick={handleSaveWorkflow}>
          Save workflow
        </Button>
      )}
    </header>
  );
};

export default Header;
