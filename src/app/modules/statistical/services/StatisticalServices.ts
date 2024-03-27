import axios, { AxiosResponse } from "axios";
import moment from "moment";

export type IStatisticalParams = {
  type?: number;
  year?: string | number;
}

const API_URL = process.env.REACT_APP_API_URL;

export const getAllDataStatistical = (): Promise<AxiosResponse<any>> => {
  let currentYear = moment().year();
  let url = `${API_URL}/thong-ke?nam=${currentYear}`;
  return axios.get(url);
};

export const getItemDataStatistical = ({type, year}: IStatisticalParams): Promise<AxiosResponse<any>> => {
  let url = `${API_URL}/thong-ke/get-by-type?type=${type}&nam=${year}`;
  return axios.get(url);
};