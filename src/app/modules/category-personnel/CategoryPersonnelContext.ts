import {createContext} from 'react'
import {MemberData, TeamData} from './model/PersonnelModel'
export type CategoryPersonnelContextType = {
  handleEditTeam: (data: TeamData) => void
  handleEditMember: (data: MemberData, method: string) => void
  getListMemberByTeamId: (id: string | undefined) => void
}
export const CategoryPersonnelContext = createContext<CategoryPersonnelContextType>({
  handleEditTeam: (data: TeamData) => {},
  handleEditMember: (data: MemberData, method: string) => {},
  getListMemberByTeamId: (id: string | undefined) => {},
})
