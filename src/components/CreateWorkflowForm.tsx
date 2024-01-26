import InputBox from './Inputbox';
import Button from './Button';
import { FormEvent, useRef } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateWorkflowForm = () => {
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCreateWorkspace = (e: FormEvent) => {
    e.preventDefault();

    if (inputRef?.current?.value) {
      const data = localStorage.getItem('workflowbuilder');

      // replace space of name with - and convert to lowercase
      const name = inputRef?.current?.value.replaceAll(' ', '-').toLowerCase();

      // if data in localstorage
      if (data) {
        const localStorageData = JSON.parse(data);

        const alreadyExist = localStorageData.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) => item.name === name
        );

        if (alreadyExist) {
          toast.error('Workspace with name already exist.');
          return;
        }

        localStorageData.push({
          name: name,
          nodes: [],
          edges: []
        });

        localStorage.setItem('workflowbuilder', JSON.stringify(localStorageData));
      } else {
        // else insert new data in localstorage
        localStorage.setItem(
          'workflowbuilder',
          JSON.stringify([
            {
              name: name,
              nodes: [],
              edges: []
            }
          ])
        );
      }
      navigate(`${name}`);
    }
  };

  return (
    <form className="w-full">
      <InputBox
        label="Workspace Name"
        placeholder="Enter workspace name"
        className="w-full"
        ref={inputRef}
      />
      <Button className="rounded-md w-full" type="submit" onClick={handleCreateWorkspace}>
        Create Workspace
      </Button>
    </form>
  );
};

export default CreateWorkflowForm;
