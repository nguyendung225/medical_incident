import axios, { AxiosResponse } from "axios";
import { IContractAnnexInfoDto } from "./models/IContract";

const API_URL = process.env.REACT_APP_API_URL;
export const getListAnnexByContract = (id: string): Promise<AxiosResponse> => {
  let url = `${API_URL}/phu-luc-hop-dong/get-by-hop-dong/${id}`;
  return axios.get(url);
};
export const addNewAnnex = (
  annex: IContractAnnexInfoDto
): Promise<AxiosResponse> => {
  let url = `${API_URL}/phu-luc-hop-dong`;
  return axios.post(url, annex);
};
export const updateAnnex = (id: string, annex: IContractAnnexInfoDto): Promise<AxiosResponse> => {
  let url = `${API_URL}/phu-luc-hop-dong/${id}`;
  return axios.put(url, annex);
};
export const deleteMultipleContractAnnex = (
  ids: string[]
): Promise<AxiosResponse> => {
  let url = `${API_URL}/phu-luc-hop-dong/phu-luc-ids?ids=${ids.toString()}`;
  return axios.delete(url);
};