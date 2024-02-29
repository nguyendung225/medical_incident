// @ts-nocheck
import {Column} from 'react-table'
import {teamTransferData} from '../../../model/PersonnelModel'
import {TableCustomCell} from './TableCustomCell'
import {TableCustomHeader} from './TableCustomHeader'
import {useIntl} from 'react-intl'
function useCustomIntl(messageId: string) {
  const intl = useIntl()
  return intl.formatMessage({id: messageId})
}
const ColumnsTeamTransferHistory: ReadonlyArray<Column<teamTransferData>> = [
  {
    Header: (props) => (
      <TableCustomHeader<teamTransferData>
        tableProps={props}
        title={useCustomIntl('TEAMTRANSFERHISTORY.TRANSFERDATE')}
        className='text-center text-light min-w-50px'
      />
    ),
    id: 'transferDate',

    Cell: ({...props}) => <TableCustomCell data={props.data[props.row.index].changeDate} />,
  },
  {
    Header: (props) => (
      <TableCustomHeader<teamTransferData>
        tableProps={props}
        title={useCustomIntl('TEAMTRANSFERHISTORY.TRANSFERTEAM')}
        className='text-center text-light min-w-50px'
      />
    ),
    id: 'transferTeam',
    Cell: ({...props}) => <TableCustomCell data={props.data[props.row.index].teamName} />,
  },
]

export {ColumnsTeamTransferHistory}
