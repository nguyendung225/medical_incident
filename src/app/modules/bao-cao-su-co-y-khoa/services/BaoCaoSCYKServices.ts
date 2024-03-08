import axios, { AxiosResponse } from "axios";
import { SearchObject } from "../models/BaoCaoSCYKModels";

const API_PATH = process.env.REACT_APP_API_URL;

export const paramsConfig = (searchObject: object) => {
  const config = { params: searchObject };
  return config;
};

export const searchByPage = (searchObject: SearchObject) => {
  const url = API_PATH + "/api/v1/su-co/page";
  return axios.get(url, paramsConfig(searchObject));
};
