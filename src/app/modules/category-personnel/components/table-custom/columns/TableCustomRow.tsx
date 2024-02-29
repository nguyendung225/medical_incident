import clsx from 'clsx'
import {Row} from 'react-table'
type Props<T extends object> = {
  row: Row<T>
}
const TableCustomRow = <T extends object>({row}: Props<T>) => (
  <tr {...row.getRowProps()}>
    {row.cells.map((cell) => {
      return (
        <td
          {...cell.getCellProps()}
          className={clsx({
            'text-end min-w-100px': cell.column.id === 'actions',
            'team-name-td': cell.column.id === 'teamName',
          })}
        >
          {cell.render('Cell')}
        </td>
      )
    })}
  </tr>
)

export {TableCustomRow}
