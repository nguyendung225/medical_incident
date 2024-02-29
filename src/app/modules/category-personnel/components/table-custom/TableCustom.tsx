import {ColumnInstance, Row, useTable} from 'react-table'
import {KTCardBody} from '../../../../../_metronic/helpers'
import {TableCustomHeaderColumn} from './columns/TableCustomHeaderColumn'
import {Column} from 'react-table'
import {useIntl} from 'react-intl'
import {TableCustomRow} from './columns/TableCustomRow'

interface tableProps<T extends object> {
  data: T[]
  columns: ReadonlyArray<Column<T>>
}

function TableCustom<T extends object>(props: tableProps<T>) {
  const {data, columns} = props
  const intl = useIntl()
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data: data,
  })

  return (
    <KTCardBody className='pt-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer rounded-top overflow-hidden '
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0 border '>
              {headers.map((column: ColumnInstance<T>) => (
                <TableCustomHeaderColumn<T> key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold bg-white border' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<T>, i) => {
                prepareRow(row)

                return <TableCustomRow<T> row={row} key={`row-${i}-${row.id}`} />
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    {intl.formatMessage({id: 'TABLE.DATA.EMPTY'})}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </KTCardBody>
  )
}

export {TableCustom}
