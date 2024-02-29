// @ts-nocheck
import {Column} from 'react-table'
import {TableCustomHeader} from './TableCustomHeader'
import {TableCustomCell} from './TableCustomCell'
import {memberData} from '../../../model/PersonnelModel'
import {MemberActionsCell} from './MemberActionsCell'
import {useIntl} from 'react-intl'
import {MemberStatusCell} from './MemberStatusCell'
import {teamData} from '../../../model/PersonnelModel'
import moment from 'moment'
function useCustomIntl(messageId: string) {
  const intl = useIntl()
  return intl.formatMessage({id: messageId})
}
const ColumnsMemberTable: ReadonlyArray<Column<memberData>> = [
  {
    Header: (props) => (
      <TableCustomHeader<teamData>
        tableProps={props}
        title={useCustomIntl('TABLE.INDEX')}
        className='text-center text-light min-w-60px'
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
    Cell: (props) => <MemberActionsCell data={props.cell.row.original} />,
  },
  {
    Header: (props) => (
      <TableCustomHeader<teamData>
        tableProps={props}
        title={useCustomIntl('MENU.CATEGORY.PERSONNEL.MEMBER.CODE')}
        className='text-center text-light min-w-150px'
      />
    ),
    id: 'memberCode',
    Cell: ({...props}) => <TableCustomCell data={props.data[props.row.index].code} />,
  },
  {
    Header: (props) => (
      <TableCustomHeader<teamData>
        tableProps={props}
        title={useCustomIntl('MENU.CATEGORY.PERSONNEL.MEMBER')}
        className='text-center text-light min-w-175px'
      />
    ),
    id: 'memberName',
    Cell: ({...props}) => <TableCustomCell data={props.data[props.row.index].name} />,
  },
  {
    Header: (props) => (
      <TableCustomHeader<teamData>
        tableProps={props}
        title={useCustomIntl('MENU.CATEGORY.PERSONNEL.MEMBER.DATEJOIN')}
        className='text-center text-light min-w-125px'
      />
    ),
    id: 'dateJoin',
    Cell: ({...props}) => (
      <TableCustomCell data={moment(props.data[props.row.index].dateJoin).format('L')} />
    ),
  },
  {
    Header: (props) => (
      <TableCustomHeader<teamData>
        tableProps={props}
        title={useCustomIntl('MENU.CATEGORY.PERSONNEL.MEMBER.STATUS')}
        className='text-center text-light  min-w-125px'
      />
    ),
    id: 'status',
    Cell: ({...props}) => (
      <MemberStatusCell
        status={props.data[props.row.index].status}
        level={props.data[props.row.index].level}
      />
    ),
  },
]

export {ColumnsMemberTable}
