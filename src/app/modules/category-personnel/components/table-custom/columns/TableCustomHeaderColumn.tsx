import {ColumnInstance} from 'react-table'
type Props<T extends object> = {
  column: ColumnInstance<T>
}

const TableCustomHeaderColumn = <T extends object>({column}: Props<T>) => {
  return (
    <>
      {column.Header && typeof column.Header === 'string' ? (
        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
      ) : (
        column.render('Header')
      )}
    </>
  )
}
export {TableCustomHeaderColumn}
