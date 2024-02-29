export interface TeamData {
  code: string
  name: string
  description: string
  createdBy?: string
  id?: string
}

export interface BreadcrumbItems {
  text: string
  url: string
}
export interface MemberData {
  createdBy?: string
  id?: string
  name: string
  code: string
  dateJoin: string
  status: string
  team: TeamData
  email: string
  level: string
  gender: string
  type: string
  position: string
}
export interface TeamTransferData {
  createdBy?: string
  changeDate: string
  teamName: string
}
export interface PaginationType {
  team: {pageIndex: number; pageSize: number}
  member: {pageIndex: number; pageSize: number}
}
export interface PageType {
  pageIndex: number
  pageSize: number
}
export interface TotalPages {
  team: number
  member: number
}
export interface OptionType {
  id: number
  title: string
  value: string
}
