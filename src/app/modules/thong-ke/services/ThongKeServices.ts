import axios from "axios";
import { ISearchObject } from "../models/ThongKeModels";

const API_PATH = process.env.REACT_APP_API_URL;

export const paramsConfig = (searchObject: object) => {
    const config = { params: searchObject };
    return config;
};

export const getTongQuanBaoCao = (searchObject: ISearchObject) => {
    const url = API_PATH + "/api/v1/dashboards/tong-quan-bao-cao";
    return axios.get(url, paramsConfig(searchObject));
};

export const getLoaiDoiTuongTheoThang = (searchObject: ISearchObject) => {
    const url = API_PATH + "/api/v1/dashboards/loai_doi_tuong_theo_thang";
    return axios.get(url, paramsConfig(searchObject));
};

export const getDataThongKeHinhThucBaoCao = (searchObject: ISearchObject) => {
    const url = API_PATH + "/api/v1/dashboards/hinh-thuc-bao-cao";
    return axios.get(url, paramsConfig(searchObject));
};

export const getDataThongKeMucDoTonThuong = (searchObject: ISearchObject) => {
    const url = API_PATH + "/api/v1/dashboards/muc-do-ton-thuong";
    return axios.get(url, paramsConfig(searchObject));
};

export const getDataThongKeLoaiDoiTuong = (searchObject: ISearchObject) => {
    const url = API_PATH + "/api/v1/dashboards/loai-doi-tuong";
    return axios.get(url, paramsConfig(searchObject));
};