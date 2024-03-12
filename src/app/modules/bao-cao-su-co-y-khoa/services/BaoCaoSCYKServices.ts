import axios from "axios";
import { ITiepNhan, MedicalIncidentInfo, SearchObject } from "../models/BaoCaoSCYKModels";

const API_PATH = process.env.REACT_APP_API_URL;

export const paramsConfig = (searchObject: object) => {
  const config = { params: searchObject };
  return config;
};

export const searchByPage = (searchObject: SearchObject) => {
  const url = API_PATH + "/api/v1/su-co/page";
  return axios.get(url, paramsConfig(searchObject));
};

export const addSCYK = (data: MedicalIncidentInfo) => {
    const url = API_PATH + "/api/v1/su-co";
    return axios.post(url, data);
};

export const getSCYKById = (id: string) => {
    const url = API_PATH + `/api/v1/su-co/${id}`;
    return axios.get(url);
};

export const deleteSCYKById = (id: string) => {
    const url = API_PATH + `/api/v1/su-co/${id}`;
    return axios.delete(url);
};

export const updateSCYK = (data: MedicalIncidentInfo, id: string) => {
    const url = API_PATH + `/api/v1/su-co/${id}`;
    return axios.put(url, data);
};

export const tiepNhanSCYK = (data: ITiepNhan) => {
    const url = API_PATH + "/api/v1/tiep-nhan-su-co";
    return axios.post(url, data);
};