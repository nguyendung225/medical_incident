import axios from "axios";
import { ISearchObject } from "../models/ThongKeModels";
import QueryString from "qs";

const API_PATH = process.env.REACT_APP_API_URL;

export const paramsConfig = (searchObject: ISearchObject) => {
    let config = {
        params: searchObject,
        paramsSerializer: searchObject.ListDepartmentId ? (searchObject: ISearchObject) => QueryString.stringify(searchObject) : undefined,
    };
    return config;
};

export const getTongQuanBaoCao = (searchObject: ISearchObject) => {
    const url = API_PATH + "/dashboards/tong-quan-bao-cao";
    return axios.get(url, paramsConfig(searchObject));
};

export const getLoaiDoiTuongTheoThang = (searchObject: ISearchObject) => {
    const url = API_PATH + "/dashboards/loai_doi_tuong_theo_thang";
    return axios.get(url, paramsConfig(searchObject));
};

export const getDataThongKeHinhThucBaoCao = (searchObject: ISearchObject) => {
    const url = API_PATH + "/dashboards/hinh-thuc-bao-cao";
    return axios.get(url, paramsConfig(searchObject));
};

export const getDataThongKeMucDoTonThuong = (searchObject: ISearchObject) => {
    const url = API_PATH + "/dashboards/muc-do-ton-thuong";
    return axios.get(url, paramsConfig(searchObject));
};

export const getDataThongKeLoaiDoiTuong = (searchObject: ISearchObject) => {
    const url = API_PATH + "/dashboards/loai-doi-tuong";
    return axios.get(url, paramsConfig(searchObject));
};