import axios from "axios";
import { SearchObject } from "../../bao-cao-su-co-y-khoa/models/BaoCaoSCYKModels";
import { IBienBanHop } from "../model/BienBanHopModel";
const API_PATH = process.env.REACT_APP_API_URL;

export const paramsConfig = (searchObject: object) => {
    const config = { params: searchObject };
    return config;
};

export const searchByPage = (searchObject: SearchObject) => {
    const url = API_PATH + "/api/v1/bien-ban-hop/page";
    return axios.get(url, paramsConfig(searchObject));
};

export const addBienBan = (data: IBienBanHop) => {
    const url = API_PATH + "/api/v1/bien-ban-hop";
    return axios.post(url, data);
};

export const updateBienBan = (data: IBienBanHop, id: string) => {
    const url = API_PATH + `/api/v1/bien-ban-hop/${id}`;
    return axios.put(url, data);
};

export const getListNhanVien = () => {
    const url = API_PATH + "/api/v1/storage/nhan-vien";
    return axios.get(url);
};

export const getListSuCoChuaHop = () => {
    const url = API_PATH + "/api/v1/su-co/list-chua-hop";
    return axios.get(url);
};

export const getBienBanHopById = (id: string) => {
    const url = API_PATH + `/api/v1/bien-ban-hop/${id}`;
    return axios.get(url);
};

export const exportWord = (id: string) => {
    const url = API_PATH + `/api/v1/bien-ban-hop/export-word/${id}`;
    return axios({
        url: url,
        method: "GET",
        responseType: "blob",
    });
}