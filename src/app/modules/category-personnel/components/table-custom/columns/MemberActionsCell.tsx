import {FC} from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import {useContext} from 'react'
import {
  CategoryPersonnelContext,
  CategoryPersonnelContextType,
} from '../../../CategoryPersonnelContext'
import {MemberData} from '../../../model/PersonnelModel'
import '../table.scss'
type Props = {
  data: MemberData
}
const MemberActionsCell: FC<Props> = ({data}) => {
  const {handleEditMember} = useContext<CategoryPersonnelContextType>(CategoryPersonnelContext)
  return (
    <Dropdown drop='start'>
      <Dropdown.Toggle
        className='d-block m-auto btn-action bg-pri'
        id='dropdown-autoclose-true'
        size='sm'
      >
        <i className='bi bi-three-dots fs-4 p-0'></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => {
            handleEditMember(data, 'all')
          }}
        >
          <i className='bi bi-pencil-fill text-primary fs-3 text-hover-info '></i>
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            handleEditMember(data, 'team')
          }}
        >
          <i className='bi bi-people-fill text-warning fs-3 text-hover-info'></i>
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            handleEditMember(data, 'history')
          }}
        >
          <i className='bi bi-clock-history text-success fs-3 text-hover-info'></i>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export {MemberActionsCell}
