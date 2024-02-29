import {FC, useEffect, useState} from 'react'
import {Modal} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import {MemberData, TeamTransferData} from '../../model/PersonnelModel'
import {getTeamTransferHistory} from '../../services/PategoryPersonnelServices'
import {TableCustom} from '../table-custom/TableCustom'
import {ColumnsTeamTransferHistory} from '../table-custom/columns/ColumnsTeamTransferHistory'
interface Props {
  handleClose: () => void
  memberData: MemberData
}
const TeamTransferHistoryDialog: FC<Props> = (props) => {
  const intl = useIntl()
  const {handleClose, memberData} = props
  const [listHistory, setListHistory] = useState<TeamTransferData[]>([])
  const getListHistory = async () => {
    const data = await getTeamTransferHistory(memberData.id)
    setListHistory(data.data.data)
  }
  useEffect(() => {
    getListHistory()
  }, [])
  return (
    <Modal show={true} size='lg' onHide={handleClose} centered animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>
          {' '}
          {intl.formatMessage({id: 'MENU.CATEGORY.PERSONNEL.MEMBER.TEAMTRANSFERHISTORY'})}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='pt-0'>
        <TableCustom<TeamTransferData> data={listHistory} columns={ColumnsTeamTransferHistory} />
      </Modal.Body>
    </Modal>
  )
}

export {TeamTransferHistoryDialog}
