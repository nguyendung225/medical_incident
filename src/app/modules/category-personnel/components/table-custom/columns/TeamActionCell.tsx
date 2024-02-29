import {FC, useContext} from 'react'
import {Button} from 'react-bootstrap'
import {
  CategoryPersonnelContext,
  CategoryPersonnelContextType,
} from '../../../CategoryPersonnelContext'
import {TeamData} from '../../../model/PersonnelModel'
import '../table.scss'
type Props = {
  data: TeamData
}
const TeamActionCell: FC<Props> = ({data}) => {
  const {handleEditTeam} = useContext<CategoryPersonnelContextType>(CategoryPersonnelContext)
  return (
    <Button
      className='d-block m-auto btn-action bg-pri'
      size='sm'
      onClick={() => {
        handleEditTeam(data)
      }}
    >
      <i className=' bi bi-pencil-fill p-0'></i>
    </Button>
  )
}

export {TeamActionCell}
