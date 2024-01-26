import { ChevronDown } from 'lucide-react';
import { useAppSelector } from '../redux/hooks';
import Button from './Button';
import Papa from 'papaparse';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const fileTypes: string[] = ['.csv', '.json'];

const ExportCSV = () => {
  const { currentSelected, nodeOutputs } = useAppSelector((store) => store.workflow);

  const [showUl, setShowUl] = useState<boolean>(false);

  const handleExportToCSV = (extension: string) => {
    let type = { type: 'text/csv' };

    if (extension === '.json') {
      type = { type: 'application/json' };
    }

    if (currentSelected) {
      const data = nodeOutputs[currentSelected]?.output;

      if (!data) return;

      let blob = new Blob([JSON.stringify(data)], type);

      if (extension === '.csv') {
        const csv = Papa.unparse(data);
        blob = new Blob([csv], type);
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `data${extension}`;
      a.click();
      window.URL.revokeObjectURL(url);
    }

    setShowUl(false);
  };

  if (!currentSelected || nodeOutputs[currentSelected]?.output?.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <Button
        className="w-fit p-1 text-xs font-semibold hover:bg-navy-400 flex items-center gap-1"
        onClick={() => setShowUl(!showUl)}
      >
        Export <ChevronDown className="w-3 h-3" />
      </Button>
      <ul
        className={twMerge(
          `absolute bg-navy-400 mt-2 w-[100px] text-xs text-white border border-navy-200 rounded-md hidden transition ${
            showUl && 'block'
          }`
        )}
      >
        {fileTypes?.map((filetype) => (
          <li
            className="p-2 cursor-pointer transition hover:bg-navy-300"
            onClick={() => handleExportToCSV(filetype)}
            key={filetype}
          >
            {filetype}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExportCSV;
