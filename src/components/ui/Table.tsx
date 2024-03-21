import { observer } from 'mobx-react-lite';
import { useTable, Column, TableOptions } from 'react-table';
import { Checkbox } from './Checkbox';
import { cn } from '@/utils/utils';
import { Skeleton } from './Skeleton';

// Define a generic type for the TableProps
interface TableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  activeId?: string;
  isLoading?: boolean;
  headerClasses?: string;
  rowClasses?: string;
}

// Create a generic Table component
function Table<T extends object>({
  columns,
  data,
  onRowClick,
  activeId,
  isLoading = false,
  headerClasses = '',
  rowClasses = '',
}: TableProps<T>): JSX.Element {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<T>({
    columns,
    data,
    getRowId: (row: any) => row.uuid,
  } as TableOptions<T>);

  // Render the UI for your table
  return (
    <div className="w-full border border-border card rounded-xl bg-card shadow-sm">
      <table {...getTableProps()} className="m-0 w-full border-collapse">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="w-full">
              <th className={cn('w-20 m-0 p-0 h-12 align-middle text-center ', headerClasses)}>
                <Checkbox className="bg-blue mt-1" />
              </th>
              {headerGroup.headers.map((column, index) => (
                <th
                  {...column.getHeaderProps()}
                  className={cn(
                    `p-0 h-12 text-left align-middle font-medium text-main text-base `,
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
                    `cursor-pointer text-main hover:bg-hover border-b border-border ${
                      index !== rows.length && ''
                    } h-16 not-prose`,
                    rowClasses,
                  )}
                  // May need to add back in row styles. Its used when an item is selected like in the flashcard templates table
                  // ${
                  //   activeId === row.id && 'bg-primary-transparent hover:bg-primary-transparent'
                  // }
                >
                  <td className="w-20 h-full text-center">
                    <Checkbox />
                  </td>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className="h-full text-base text-secondary">
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
