import axios from "axios";
import { paramsConfig } from "../../utils/ParamsUtils";

const API_PATH = process.env.REACT_APP_API_URL;

export const searchCollectionReport = (searchObject: any = {}) => {
  let url = API_PATH + "/thu-dung/search";
  return axios.get(url, paramsConfig(searchObject));
};

export const getByIdReport = (id: string) => {
  let url = API_PATH + `/thu-dung/${id}`;
  return axios.get(url);
};

export const exportBaoCao = (id: any) => {
  let url = `${API_PATH}/thu-dung/export/${id}`;
  return axios({
    url: url,
    method: "POST",
    responseType: "blob",
  });
};