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