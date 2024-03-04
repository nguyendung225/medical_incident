import { DEFAULT_PAGE_INDEX } from "../category-personnel/const/PersonnelConst";
import { APIResponse } from "../models/models";
import axios, { AxiosResponse } from "axios";
import { MAX_PAGE_SIZE } from "./PageUtils";
import { paramsConfig } from "./ParamsUtils";
const API_URL = process.env.REACT_APP_API_URL;
export const getListJobPosition = () => {

  let url = `${API_URL}/c-simple-category-attribute-value/page`;
  return axios.get(url);
};
export const getListWorkUnit = () => {
  let config = {
    params: {
      pageIndex: DEFAULT_PAGE_INDEX,
      pageSize: MAX_PAGE_SIZE,
    },
  };
  let url = `${API_URL}/c-don-vi/page`;
  return axios.get(url, config);
};

export const getAllSimpleValue = (type: number) => {
  let url = API_URL + `/c-simple-category-attribute-value/page/?type=${type}`;
  return axios.get(url);
};
export const getListEmployee = (): Promise<AxiosResponse<APIResponse>> => {
  let config = {
    params: {
      pageIndex: DEFAULT_PAGE_INDEX,
      pageSize: MAX_PAGE_SIZE,
    },
  };
  let url = `${API_URL}/employee/page`;
  return axios.get(url, config);
};

//new
export const searchAllSimpleValue = (searchObject: any) => {
  const url = API_URL + `/c-simple-category-attribute-value/page`;
  return axios.get(url, paramsConfig(searchObject));
};

export const searchAllEmployee = (searchObject: any) => {
  let url = API_URL + "/employee/page";
  return axios.get(url, paramsConfig(searchObject));
};

export const searchListWorkUnit = (searchObject: any) => {
  let url = `${API_URL}/c-don-vi/page`;
  return axios.get(url, paramsConfig(searchObject));
};