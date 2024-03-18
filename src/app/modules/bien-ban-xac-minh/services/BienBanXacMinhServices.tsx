import axios from "axios";
import { SearchObject } from "../../bao-cao-su-co-y-khoa/models/BaoCaoSCYKModels";
import { IBienBanXacMinh } from "../models/BienBanXacMinhModel";

const API_PATH = process.env.REACT_APP_API_URL;

export const paramsConfig = (searchObject: object) => {
    const config = { params: searchObject };
    return config;
};

export const searchByPage = (searchObject: SearchObject) => {
    const url = API_PATH + "/api/v1/bien-ban-xac-minh/page";
    return axios.get(url, paramsConfig(searchObject));
  };

export const addBienBan = (data: IBienBanXacMinh) => {
    const url = API_PATH + "/api/v1/bien-ban-xac-minh";
    return axios.post(url, data);
};

export const updateBienBan = (data: IBienBanXacMinh, id: string) => {
    const url = API_PATH + `/api/v1/bien-ban-xac-minh/${id}`;
    return axios.put(url, data);
};

export const getBienBanById = (id: string) => {
    const url = API_PATH + `/api/v1/bien-ban-xac-minh/${id}`;
    return axios.get(url);
};

export const getListSuCoChuaXacMinh = () => {
    const url = API_PATH + "/api/v1/su-co/get-list-chua-xac-minh";
    return axios.get(url);
};

export const deleteBienBan = (id: string) => {
    const url = API_PATH + `/api/v1/bien-ban-xac-minh/${id}`;
    return axios.delete(url);
};

export const exportWord = (id: string) => {
    const url = API_PATH + `/api/v1/bien-ban-xac-minh/export-word/${id}`;
    return axios({
        url: url,
        method: "GET",
        responseType: "blob",
    });
}