import { observer } from 'mobx-react-lite';
import { useTable, Column, TableOptions } from 'react-table';
import { Skeleton } from './Skeleton';
import { ReactNode } from 'react';

interface RowData {
  uuid: string;
}

interface Props<T extends object> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  activeId?: string;
  isLoading?: boolean;
  tableClasses?: string | undefined;
  headerClasses?: string;
  rowClasses?: string;
  emptyElement?: ReactNode;
}

const Table = observer(
  <T extends object>({
    columns,
    data,
    onRowClick,
    isLoading = true,
    tableClasses = '',
    headerClasses = '',
    rowClasses = '',
    emptyElement,
  }: Props<T>): JSX.Element => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<T>({
      columns,
      data,
      getRowId: (row: RowData) => row.uuid,
    } as TableOptions<T>);

    return (
      <div
        className={`w-full border border-border bg-card card rounded-xl h-fit shadow-sm overflow-auto ${tableClasses}`}
      >
        <table {...getTableProps()} className="m-0 w-full border-collapse">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="w-full">
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className={`py-3 h-12 text-left align-middle font-medium text-main text-base border-b border-border truncate ${headerClasses}`}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        </table>

        {!isLoading && rows.length ? (
          <div className="h-full w-full">
            <table {...getTableProps()} className="m-0 w-full border-collapse">
              <tbody {...getTableBodyProps()} className="divide-y">
                {rows.map((row, index) => {
                  prepareRow(row);

                  return (
                    <tr
                      {...row.getRowProps()}
                      onDoubleClick={() => onRowClick && onRowClick(row.original)}
                      className={`cursor-pointer text-main hover:bg-hover border-border rounded-xl ${
                        index === rows.length && 'border-none'
                      } h-16 not-prose ${rowClasses}`}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="py-3 h-full text-base text-secondary truncate"
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
          </div>
        ) : null}

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
