import axios from "axios";
import { ISearchObj } from "../models/BaoCaoThongKeModels";
import QueryString from "qs";

const API_PATH = process.env.REACT_APP_API_URL;

export const paramsConfig = (searchObject: ISearchObj) => {
    let config = {
        params: searchObject,
        paramsSerializer: searchObject.listDepartmentId ? (searchObject: ISearchObj) => QueryString.stringify(searchObject) : undefined,
    };
    return config;
};

export const getTheoDoiTuongXayRaList = (searchObject: ISearchObj) => {
    const url = API_PATH + "/api/v1/bao-cao/thong-ke-doi-tuong";
    return axios.get(url, paramsConfig(searchObject));
};

export const exportThongKeDoiTuong = (searchObject: ISearchObj) => {
    const url = API_PATH + "/api/v1/bao-cao/export-thong-ke-doi-tuong";
    return axios({
        url: url,
        method: "GET",
        responseType: "blob",
        params: paramsConfig(searchObject),
    });
};

export const getSoTheoDoiScykList = (searchObject: ISearchObj) => {
    const url = API_PATH + "/api/v1/bao-cao/so-theo-doi-su-co";
    return axios.get(url, paramsConfig(searchObject));
};

export const exportSoTheoDoi = (searchObject: ISearchObj) => {
    const url = API_PATH + "/api/v1/bao-cao/export-so-theo-doi-su-co";
    return axios({
        url: url,
        method: "GET",
        responseType: "blob",
        params: paramsConfig(searchObject),
    });
};
