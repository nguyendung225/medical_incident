import {TeamData, MemberData} from '../model/PersonnelModel'
import axios from 'axios'
const API_PATH = process.env.REACT_APP_API_URL

export const getListTeam = (pageIndex: number, pageSize: number) => {
  var url = API_PATH + `/teams/page?pageIndex=${pageIndex}&pageSize=${pageSize}`
  return axios.get(url)
}
export const createTeam = (data: TeamData) => {
  var url = API_PATH + '/teams'
  return axios.post(url, data)
}
export const updateTeam = (data: TeamData, id: string | undefined) => {
  var url = API_PATH + `/teams/${id}`
  return axios.put(url, data)
}

export const updateMember = (data: MemberData, id: string | undefined) => {
  var url = API_PATH + `/members/${id}`
  return axios.put(url, data)
}
export const createMember = (data: MemberData) => {
  var url = API_PATH + '/members'
  return axios.post(url, data)
}
export const getListMember = (id: string | undefined, pageIndex: number, pageSize: number) => {
  var url =
    API_PATH + `/members/page?pageIndex=${pageIndex}&pageSize=${pageSize}&teamId=${id}`
  return axios.get(url)
}

export const transferTeamMember = (data: MemberData, id: string | undefined) => {
  var url = API_PATH + `/members/move-member-to-group/${id}`
  return axios.put(url, data)
}
export const getTeamTransferHistory = (id: string | undefined) => {
  var url = API_PATH + `/members/history/${id}`
  return axios.get(url)
}
