import {OptionType} from '../model/PersonnelModel'

export const MAX_PAGE_SIZE = 1000
export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_PAGE_INDEX = 1
export const DEFAULT_TOTAL_PAGES = 0
export const RESPONSE_CODE_SUCCESS = 200
export const STAFFSTATUS = 'STAFF'
export const INTERNSTATUS = 'INTERNSHIP'
export const MEMBER_GENDERS: OptionType[] = [
  {
    id: 1,
    title: 'OPTION.GENDER.MALE',
    value: 'MALE',
  },
  {
    id: 2,

    title: 'OPTION.GENDER.FEMALE',
    value: 'FEMALE',
  },
  {
    id: 3,
    title: 'OPTION.GENDER.LGBT',
    value: 'LGBT',
  },
  {
    id: 4,
    title: 'OPTION.GENDER.ETC',
    value: 'ETC',
  },
]
export const MEMBER_TYPES: OptionType[] = [
  {
    id: 1,
    title: 'OPTION.MEMBER.TYPE.LEADER',
    value: 'LEADER',
  },
  {
    id: 2,
    title: 'OPTION.MEMBER.TYPE.DEPUTY_LEADER',
    value: 'DEPUTY_TEAM_LEADER',
  },
  {
    id: 3,
    title: 'OPTION.MEMBER.TYPE.MEMBER',
    value: 'MEMBER',
  },
]
export const MEMBER_LEVELS: OptionType[] = [
  {
    id: 1,
    title: 'L0',
    value: 'L0',
  },
  {
    id: 2,
    title: 'L1',
    value: 'L1',
  },
  {
    id: 3,
    title: 'L2',
    value: 'L2',
  },
  {
    id: 4,
    title: 'L3',
    value: 'L3',
  },
  {
    id: 5,
    title: 'L4',
    value: 'L4',
  },
]
export const MEMBER_STATUS: OptionType[] = [
  {
    id: 5,
    title: 'MEMBER.STATUS.STAFF',
    value: STAFFSTATUS,
  },
  {
    id: 5,
    title: 'MEMBER.STATUS.INTERN',
    value: INTERNSTATUS,
  },
]
export const MEMBER_POSITIONS: OptionType[] = [
  {id: 1, title: 'DEV BE', value: 'DEV_BE'},
  {id: 2, title: 'DEV FE', value: 'DEV_FE'},
  {id: 3, title: 'TESTER', value: 'TESTER'},
  {id: 4, title: 'DEV FULLSTACK', value: 'DEV_FULLSTACK'},
]

export const ROWPERPAGE: number[] = [1, 5, 10, 15]
