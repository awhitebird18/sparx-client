import { observer } from 'mobx-react-lite';
import { useTable, Column, TableOptions } from 'react-table';
import { Skeleton } from './Skeleton';
import { ReactNode } from 'react';

interface RowData {
  uuid: string;
}

interface Props<T extends object, R extends object> {
  columns: Column<R>[];
  data: T[];
  onRowClick?: (row: T) => void;
  activeId?: string;
  isLoading?: boolean;
  tableClasses?: string;
  headerClasses?: string;
  rowClasses?: string;
  emptyElement?: ReactNode;
}

const Table = observer(
  <T extends object, R extends object>({
    columns,
    data,
    onRowClick,
    isLoading = true,
    tableClasses = '',
    headerClasses = '',
    rowClasses = '',
    emptyElement,
  }: Props<T, R>): JSX.Element => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<T>({
      columns,
      data,
      getRowId: (row: RowData) => row.uuid,
    } as TableOptions<T>);

    return (
      <div
        className={`card-base border-none w-full h-fit rounded-none shadow-none overflow-auto ${tableClasses}`}
      >
        <table {...getTableProps()} className="m-0 w-full border-collapse">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="w-full">
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className={`text-sm font-normal text-main px-3 py-2 !border-transparent border-b !bg-hover text-base truncate ${headerClasses}`}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="divide-y rounded-none">
            {rows.map((row, index) => {
              prepareRow(row);

              return (
                <tr
                  {...row.getRowProps()}
                  onDoubleClick={() => onRowClick && onRowClick(row.original)}
                  className={`cursor-pointer text-main hover:bg-hover border-border ${
                    index === rows.length && 'border-none'
                  } h-16 px-2 not-prose ${rowClasses}`}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps({
                          style: {
                            minWidth: cell.column.minWidth,
                            width: cell.column.width,
                          },
                        })}
                        className="px-3 h-full text-base text-secondary truncate"
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

        {isLoading ? (
          <Skeleton className="w-full h-16 rounded-none bg-card dark:bg-slate-500/5" />
        ) : null}
        {!isLoading && !rows.length && emptyElement ? (
          <div className="w-full flex items-center justify-center">{emptyElement}</div>
        ) : null}
      </div>
    );
  },
);

export default Table;
