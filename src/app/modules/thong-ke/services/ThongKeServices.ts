import axios from "axios";
import { ISearchObject } from "../models/ThongKeModels";

const API_PATH = process.env.REACT_APP_API_URL;

export const paramsConfig = (searchObject: object) => {
    const config = { params: searchObject };
    return config;
};

export const searchTongQuanBaoCaoByParam = (searchObject: ISearchObject) => {
    const url = API_PATH + "/api/v1/dashboards/tong-quan-bao-cao";
    return axios.get(url, paramsConfig(searchObject));
};
