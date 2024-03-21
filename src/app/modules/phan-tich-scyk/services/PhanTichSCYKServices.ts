import axios from "axios";
import { SearchObject } from "../../bao-cao-su-co-y-khoa/models/BaoCaoSCYKModels";

const API_PATH = process.env.REACT_APP_API_URL;

export const paramsConfig = (searchObject: object) => {
    const config = { params: searchObject };
    return config;
};

export const searchByPage = (searchObject: SearchObject) => {
    const url = API_PATH + "/api/v1/phan-tich/page";
    return axios.get(url, paramsConfig(searchObject));
};

export const exportWord = (id: string) => {
    const url = API_PATH + `/api/v1/phan-tich/export-word/${id}`;
    return axios({
        url: url,
        method: "GET",
        responseType: "blob",
    });
}
export const addPhanTich = (data: any) => {
    const url = API_PATH + "/api/v1/phan-tich";
    return axios.post(url, data);
};

export const updatePhanTich = (data: any, id: string) => {
    const url = API_PATH + `/api/v1/phan-tich/${id}`;
    return axios.put(url, data);
};

export const deleteFilePhanTich = (id: string, fileId: string) => {
    const url = API_PATH + `/api/v1/phan-tich/${id}/file-dinh-kem/${fileId}`;
    return axios.delete(url);
};

export const getListSuCoChuaPhanTich = () => {
    const url = API_PATH + "/api/v1/su-co/list-chua-phan-tich";
    return axios.get(url);
};
