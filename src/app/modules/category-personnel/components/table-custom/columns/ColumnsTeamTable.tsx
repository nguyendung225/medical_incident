// @ts-nocheck
import {useIntl} from 'react-intl'
import {Column} from 'react-table'
import {teamData} from '../../../model/PersonnelModel'
import {TableCustomCell} from './TableCustomCell'
import {TeamActionCell} from './TeamActionCell'
import {TableCustomHeader} from './TableCustomHeader'
function useCustomIntl(messageId: string) {
  const intl = useIntl()
  return intl.formatMessage({id: messageId})
}
const ColumnsTeamTable: ReadonlyArray<Column<teamData>> = [
  {
    Header: (props) => (
      <TableCustomHeader<teamData>
        tableProps={props}
        title={useCustomIntl('TABLE.INDEX')}
        className='text-center text-light min-w-50px'
      />
    ),
    id: 'index',

    Cell: ({...props}) => <TableCustomCell data={props.row.index + 1} />,
  },
  {
    Header: (props) => (
      <TableCustomHeader<teamData>
        tableProps={props}
        title={useCustomIntl('TABLE.ACTION')}
        className='text-center text-light min-w-100px'
      />
    ),
    id: 'actions',
    Cell: (props) => <TeamActionCell data={props.cell.row.original} />,
  },
  {
    Header: (props) => (
      <TableCustomHeader<teamData>
        tableProps={props}
        title={useCustomIntl('MENU.CATEGORY.PERSONNEL.TEAM')}
        className='text-center text-light min-w-150px'
      />
    ),
    id: 'teamName',
    Cell: ({...props}) => (
      <TableCustomCell
        id={props.data[props.row.index].id}
        data={props.data[props.row.index].name}
      />
    ),
  },
]

export {ColumnsTeamTable}
