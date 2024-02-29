import axios, { AxiosResponse } from 'axios';
import {
  IContractInfoDto,
  IContractByEmployeeResponse
} from './models/IContract';
const API_URL = process.env.REACT_APP_API_URL;

export const getListContracts = (
  searchData?: any
): Promise<AxiosResponse<IContractByEmployeeResponse>> => {
  let config = {
    params: {
      ...searchData,
      pageSize: searchData?.pageSize || 10,
      pageIndex: searchData?.pageIndex || 1,
    },
  };
  let url = `${API_URL}/hop-dong-lao-dong/page`;
  return axios.get(url, config);
};

export const updateContract = (
  id: string,
  contract: IContractInfoDto | any
): Promise<AxiosResponse<IContractByEmployeeResponse>> => {
  let url = `${API_URL}/hop-dong-lao-dong/${id}`;
  return axios.put(url, contract);
};

export const addNewContract = (
  contract: IContractInfoDto | any
): Promise<AxiosResponse<IContractByEmployeeResponse>> => {
  let url = `${API_URL}/hop-dong-lao-dong`;
  return axios.post(url, contract);
};

export const deleteContract = (
  ids: string[]
): Promise<AxiosResponse<IContractByEmployeeResponse>> => {
  let url = `${API_URL}/hop-dong-lao-dong/laborContractIds?ids=${ids.toString()}`;
  return axios.delete(url);
};

export const searchNguoiDaiDienKy = () => {
  const url = API_URL + "/nguoi-dai-dien-ky/page";
  return axios.get(url);
}