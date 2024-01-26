import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { useAppSelector } from '../redux/hooks';
import { TableColumn } from '../types';
import useGetColumns from '../hooks/useGetColumns';
import { Loader } from 'lucide-react';
import { ROWS_PER_SCROLL } from '../data';

const Table: React.FC = () => {
  const { currentSelected, nodeOutputs } = useAppSelector((store) => store.workflow);

  const [columns, setColumns] = useState<TableColumn[]>([]);
  const [data, setData] = useState<object[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const { getColumns } = useGetColumns();

  useEffect(() => {
    const cols = getColumns(currentSelected || '');

    if (currentSelected && nodeOutputs[currentSelected]?.output?.length > 0 && cols) {
      const tableColumns: TableColumn[] = cols.map((col) => ({
        Header: col.key,
        accessor: col.key
      }));
      setColumns(tableColumns);
      setData(nodeOutputs[currentSelected]?.output?.slice(0, ROWS_PER_SCROLL));
    } else {
      setColumns([]);
      setData([]);
    }
  }, [currentSelected, nodeOutputs]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const bottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 1;

    if (bottom && !isLoading && hasMore) {
      setIsLoading(true);

      setScrollPosition(target.scrollTop);

      setTimeout(() => {
        // Update data state with the new chunk of data
        if (currentSelected) {
          const newChunk = nodeOutputs[currentSelected]?.output?.slice(
            data.length,
            data.length + ROWS_PER_SCROLL
          );

          if (newChunk.length > 0) {
            setData((prevData) => [...prevData, ...newChunk]);
          } else {
            setHasMore(false);
          }
        }

        setIsLoading(false);
      }, 1000);
    }
  };

  if (currentSelected && nodeOutputs[currentSelected]?.output?.length < 1) {
    return (
      <div className="mx-2 mt-1 text-xs tracking-wider">
        <span className="text-blue-400">root:</span>{' '}
        <span className="text-gray-600"> &#91; &#93; </span>
        <span className="text-gray-600 align-text-top">0 items</span>
      </div>
    );
  }

  return (
    <div
      onScroll={handleScroll}
      style={{
        maxHeight: '400px',
        overflowY: 'scroll',
        paddingBottom: '20px'
      }}
    >
      <table {...getTableProps()} className="border-collapse">
        <thead className="bg-navy-600 text-white font-semibold text-xs">
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()} className="text-left" key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  {...header.getHeaderProps()}
                  className="min-w-[150px] border border-navy-500 p-1"
                  key={header.id}
                >
                  {header.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="text-white text-xs"
          key={scrollPosition} // Update when scroll position changes
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="border border-navy-500 p-1 truncate"
                    key={cell.row.index + '-' + cell.column.id}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {isLoading && (
        <div className="text-gray-300 text-xs tracking-wider flex gap-1 my-2">
          <span>Loading...</span> <Loader className="animate-spin w-4 h-4" />
        </div>
      )}
    </div>
  );
};

export default Table;
