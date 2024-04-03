import { observer } from 'mobx-react-lite';
import { useTable, Column, TableOptions } from 'react-table';
import { cn } from '@/utils/utils';
import { Skeleton } from './Skeleton';

interface TableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  activeId?: string;
  isLoading?: boolean;
  tableClasses?: string | undefined;
  headerClasses?: string;
  rowClasses?: string;
}

function Table<T extends object>({
  columns,
  data,
  onRowClick,
  isLoading = false,
  tableClasses = '',
  headerClasses = '',
  rowClasses = '',
}: TableProps<T>): JSX.Element {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<T>({
    columns,
    data,
    getRowId: (row: any) => row.uuid,
  } as TableOptions<T>);

  return (
    <div
      className={`w-full border border-border card rounded-xl bg-card shadow-sm overflow-auto ${tableClasses}`}
    >
      <table {...getTableProps()} className="m-0 w-full border-collapse">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="w-full">
              {/* <th
                className={cn(
                  'w-20 m-0 p-0 h-12 align-middle border-b border-border text-center ',
                  headerClasses,
                )}
              >
                <Checkbox className="bg-blue mt-1" />
              </th> */}
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className={cn(
                    `py-0 h-12 text-left align-middle font-medium text-main text-base border-b border-border truncate`,
                    headerClasses,
                  )}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()} className="divide-y">
          {!isLoading &&
            rows.map((row, index) => {
              prepareRow(row);

              return (
                <tr
                  {...row.getRowProps()}
                  onDoubleClick={() => onRowClick && onRowClick(row.original)}
                  className={cn(
                    `cursor-pointer text-main hover:bg-hover border-border rounded-xl ${
                      index === rows.length && 'border-none'
                    } h-16 not-prose`,
                    rowClasses,
                  )}
                >
                  {/* <td className="w-20 h-full text-center">
                    <Checkbox />
                  </td> */}
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="py-0 h-full text-base text-secondary truncate"
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>

      {isLoading && <Skeleton className="w-full h-16 rounded-none" />}
    </div>
  );
}

export default observer(Table);
