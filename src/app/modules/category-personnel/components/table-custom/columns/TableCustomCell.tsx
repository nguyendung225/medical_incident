import clsx from 'clsx'
import {FC, useContext} from 'react'
import {
  CategoryPersonnelContext,
  CategoryPersonnelContextType,
} from '../../../CategoryPersonnelContext'
import '../table.scss'
type Props = {
  data: string
  id?: string
}

const TableCustomCell: FC<Props> = ({data, id}) => {
  const {getListMemberByTeamId} = useContext<CategoryPersonnelContextType>(CategoryPersonnelContext)
  return (
    <div
      onClick={() => {
        if (id) {
          getListMemberByTeamId(id)
        }
      }}
      className={clsx({
        'text-center': true,
        'team-name-cell': id,
        'text-system': true,
      })}
    >
      {data}
    </div>
  )
}

export {TableCustomCell}
