import {FC} from 'react'
import {Badge} from 'react-bootstrap'
import {useIntl} from 'react-intl'
import {STAFFSTATUS, INTERNSTATUS} from '../../../const/PersonnelConst'
type Props = {
  status: string
  level: string
}

const MemberStatusCell: FC<Props> = ({status, level}) => {
  const intl = useIntl()
  return (
    <div className='text-left'>
      {status === STAFFSTATUS && (
        <Badge bg='primary'>{intl.formatMessage({id: 'MEMBER.STATUS.STAFF'})}</Badge>
      )}
      {status === INTERNSTATUS && (
        <Badge bg='success'>{intl.formatMessage({id: 'MEMBER.STATUS.INTERN'})}</Badge>
      )}
      <Badge className=' m-2 bg-pri'>{level}</Badge>
    </div>
  )
}

export {MemberStatusCell}
