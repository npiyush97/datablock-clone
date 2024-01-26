import { FC } from 'react';
import Table from './Table';
import ExportCSV from './ExportCSV';

const OutputPanel: FC = () => {
  return (
    <div className="h-full border-t border-navy-500 z-10 bg-navy-700">
      <div className="flex gap-2 w-[100%] items-center border-b border-b-navy-500 p-1">
        <p className="text-white uppercase text-xs font-medium tracking-wider my-1">Output</p>
        <ExportCSV />
      </div>
      <div className="overflow-y-auto max-h-[400px]">
        <Table />
      </div>
    </div>
  );
};

export default OutputPanel;
